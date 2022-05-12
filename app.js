// UI VARIABLES

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
  // DOM LOAD EVENT
  document.addEventListener("DOMContentLoaded", getTasks);
  // ADD TASK EVENT
  form.addEventListener("submit", addTask);

  // REMOVE EVENT
  taskList.addEventListener("click", removeTask);

  // CLEAR TASKS
  clearBtn.addEventListener("click", clearTasks);

  // FILTER TASK
  filter.addEventListener("keyup", filterTasks);

  // GET TASKS FROM LS
  function getTasks(e) {
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add("collection-item");
      li.appendChild(document.createTextNode(task));

      // LINK ELEMENT
      const link = document.createElement("a");
      link.classList.add("delete-item", "secondary-content");
      link.innerHTML = `<i class ="fa fa-remove"></i>`;
      li.appendChild(link);

      taskList.appendChild(li);
    });
  }
  // ADD TASK
  function addTask(e) {
    if (taskInput.value === "") {
      alert("Add a task...");
    }

    // LI ELEMENT
    const li = document.createElement("li");
    li.classList.add("collection-item");
    li.appendChild(document.createTextNode(taskInput.value));

    // LINK ELEMENT
    const link = document.createElement("a");
    link.classList.add("delete-item", "secondary-content");
    link.innerHTML = `<i class ="fa fa-remove"></i>`;
    li.appendChild(link);

    taskList.appendChild(li);

    storeInLs(taskInput.value);

    taskInput.value = "";

    e.preventDefault();
  }

  // STORE TASK
  function storeInLs(task) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // REMOVE TASKS
  function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
      if (confirm("Are you sure?")) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLs(e.target.parentElement.parentElement);
      }
    }
  }

  // REMOVE TASK FROM LS
  function removeTaskFromLs(taskItem) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index) => {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1); // CHECK
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // CLEAR TASKS
  function clearTasks(e) {
    const lis = document.querySelectorAll(".collection-item");

    if (taskList.innerHTML !== `` && confirm("Are you sure?")) {
      lis.forEach((item) => {
        item.remove();
        removeTaskFromLs(item);
      });
    } else {
      alert("You have no added task!!!");
    }
  }

  function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach((task) => {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) !== -1) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  }
}
