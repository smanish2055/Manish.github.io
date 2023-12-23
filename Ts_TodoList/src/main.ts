
import './style.css'
const textSearch: HTMLInputElement = document.querySelector(
  "#search"
) as HTMLInputElement;
const addItems: HTMLInputElement = document.querySelector(
  "#add-item"
) as HTMLInputElement;
const addButton: HTMLElement = document.querySelector(
  "#add-button"
) as HTMLElement;

const taskList: HTMLInputElement = document.querySelector(
  ".task-list"
) as HTMLInputElement;
const home = document.querySelector("#home")!;
const completedDisplay = document.querySelector("#completed")!;
const remainingDisplay = document.querySelector("#remaining")!;

/* ------------------------ type of data todos has ----------------------- */
type Task = { Items: string; status: boolean };

let todos: Task[] = [];

/* -------------------------------- add task -------------------------------- */
addButton.addEventListener("click", () => {
  const todo: Task = {
    Items: addItems.value,
    status: false,
  };

  if (addItems.value) {
    todos.push(todo);
    localStorage.setItem("itemsList", JSON.stringify(todos));
    displayTask(todos);
    addItems.value = "";
  } else {
    alert("please add task !");
  }
});

/* ---------------------- function call when page load ---------------------- */
function getDataFromLocStrg() {
  const storedItems = localStorage.getItem("itemsList");
  todos = storedItems ? JSON.parse(storedItems) : [];
  displayTask(todos);
}
getDataFromLocStrg();

/* -------------------------- display list of todos ------------------------- */
function displayTask(todos: Task[]) {
  taskList.innerHTML = "";
  todos.forEach((data, index) => {
    const checked = data.status ? "checked" : "";

    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.innerHTML = `<div class="data-items ${data.status ? "completed" : ""}">${
      data.Items
    }</div>  <div class="checkbox"><input type="checkbox" ${checked} data-index="${index}"> </div>`;

    taskList.appendChild(li);

    // Add a click event listener to each checkbox
    const checkbox = li.querySelector(".checkbox input");
    if (checkbox) {
      checkbox.addEventListener("click", () => {
        toggleStatus(index);
      });
    }
  });
}

/* ----------------- Function to toggle the status of a task ---------------- */
function toggleStatus(index: number) {
  todos[index].status = !todos[index].status;
  localStorage.setItem("itemsList", JSON.stringify(todos));
  displayTask(todos);
}

/* --------------------------------- search --------------------------------- */
textSearch.addEventListener("input", (event) => {
  let inputValue: string = (event.target as HTMLInputElement).value;
  inputValue = inputValue.trim();

  // Filter the tasks based on the input value
  const filteredTasks = todos.filter((task) => task.Items.includes(inputValue));

  // Display the filtered tasks
  displayTask(filteredTasks);
});

/* ------------------------------- navigation ------------------------------- */
home.addEventListener("click", () => {
  displayTask(todos);
});

completedDisplay.addEventListener("click", () => {
  let completedDisplay: Task[] = todos.filter((data) => data.status === true);

  displayTask(completedDisplay);
});

remainingDisplay.addEventListener("click", () => {
  let remainingDisplay: Task[] = todos.filter((data) => data.status === false);

  displayTask(remainingDisplay);
});
