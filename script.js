const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.cursor = "pointer";
    span.onclick = () => toggleComplete(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(text) {
  tasks.push({ text, completed: false });
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    addTask(text);
    taskInput.value = "";
  }
});

renderTasks();

  