const taskInput = document.getElementById("task-input");
let input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let loading = document.getElementById("loading");
let error = document.getElementById("error");
const url = "https://jsonplaceholder.typicode.com/todos";
// const counter = document.getElementById("counter");
let list = document.getElementById("task-list");

const postTasks = () => {
  let newTaskInputValue = document.getElementById("task-input").value;
  if (newTaskInputValue == "") {
    alert("Task is empty,Please write any else Tasks");
    return;
  }
  document.getElementById("task-input").value = "";
  //   console.log("add:" + taskInput.value);
  //   console.log(taskList.children);

  let newTask = document.createElement("li");
  newTask.innerHTML = `
   <span> ${newTaskInputValue}</span>
    <div>
      <button class="btn btn-success">
        <i class="fas fa-pencil"></i>
      </button>
      <button class="btn btn-danger" onclick="deleteTask(event)">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
  newTask.className = `list-group-item
    d-flex
    justify-content-between
    align-items-center`;
  //   newTask.innerHTML = `${taskInput.value}
  //   <button class="btn btn-danger"  onclick="deleteTask(event)">
  //     <i class="fas fa-trash"></i>
  //   </button>`;
  taskList.appendChild(newTask);

  // qoshish appenchild;
  counter.innerHTML = taskList.children.length;
  clearInput();
  axios
    .post(url, {
      title: newTaskInputValue,
      completed: false,
      userId: 1,
    })
    .then((res) => {
      console.log(res);
      document.getElementById("task-input").value = "";
      alert("Muvafaqayatli qoshildi Gap yo");
      setTodos();
    })
    .catch((error) => {
      console.log(error);
      alert("Chota Nmadur neto");
    });
};

function deleteTask(e) {
  let child = e.target.parentNode;

  if (child.nodeName === "DIV") {
    child = child.parentNode;
    console.log(child.nodeName);
    taskList.removeChild(child);
    counter.innerHTML = taskList.children.length;
  } else if (child.nodeName === "BUTTON") child = child.parentNode;
  console.log(child.nodeName);
  taskList.removeChild(child);
  counter.innerHTML = taskList.children.length;
}
function clearAllTasks() {
  taskList.innerHTML = "";
  counter.innerHTML = 0;
}
// function clearInput() {
//   location.reload();
// }
const getTodos = async () => {
  try {
    const res = await axios.get(url + "?_limit=12");
    return { success: true, data: res.data };
  } catch (error) {
    console.log("Xatolik Sodir boldi " + error);
    return { success: false };
  }
};

const setTodos = async () => {
  //   getTodos().then((res) => {});
  //   loading.classlist.remove("d-none");
  const res = await getTodos();
  loading.classList.add("d-none");

  if (res.success) {
    list.innerHTML = "";
    res.data.map((value, index) => {
      let newTask = document.createElement("li");
      newTask.innerHTML = `
 <span style = "flex:1;" class = "${(value.completed && "didnt") || ""}"> ${
        value.title
      }</span>
  <div>
      ${
        (value.completed &&
          `  <span class="me-3 text-primary"
      ><i class="fas fa-check-circle"></i
    ></span>`) ||
        ""
      }
    <button class="btn btn-success" onclick = "editTask(${value.id})">
      <i class="fas fa-pencil"></i>
    </button>
    <button class="btn btn-danger" onclick="deleteTask(event)">
      <i class="fas fa-trash"></i>
    </button>
  </div>
`;
      newTask.className = `list-group-item
  d-flex
  justify-content-between
  align-items-center`;
      //   newTask.innerHTML = `${taskInput.value}
      //   <button class="btn btn-danger"  onclick="deleteTask(event)">
      //     <i class="fas fa-trash"></i>
      //   </button>`;
      taskList.appendChild(newTask);
    });
  } else {
    error.classList.remove("d-none");
  }
};
setTodos();

// edit
let editingTask;
const editTask = async (id) => {
  try {
    const res = await axios.get(url + "/" + id);
    editingTask = res.data;
    console.log(res.data);
    input.value = res.data.title;
  } catch (error) {
    console.log("Xatolik Sodir boldi " + error);
  }
};

const putTask = async () => {
  console.log("EditingTask" + JSON.stringify(editingTask));
  axios.put(url + "/" + editingTask.id, {
    title: input.value,
    completed: editingTask.completed,
  });
};
