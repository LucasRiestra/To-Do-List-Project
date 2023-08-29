const tasks = [];
const completedTasksContainer = document.getElementById("completed-tasks-container");
const importantTasksContainer = document.getElementById("important-tasks-container");
export function addTaskToCompleted(taskItem, taskDetails) {
    const index = tasks.length;
    taskItem.setAttribute("data-index", index.toString());
    completedTasksContainer.appendChild(taskItem);
}
export function addTaskToImportant(taskItem, taskDetails) {
    const index = tasks.length;
    taskItem.setAttribute("data-index", index.toString());
    importantTasksContainer.appendChild(taskItem);
}
export function attachClickHandlersToCompletedTasks() {
    const completedTasks = document.querySelectorAll(".completed-task-item");
    completedTasks.forEach((taskItem) => {
        taskItem.addEventListener("click", () => {
            const index = parseInt(taskItem.getAttribute("data-index") || "0");
            const taskDetails = tasks[index];
            openModalWithTaskDetails(taskDetails);
        });
    });
}
export function openModalWithTaskDetails(taskDetails) {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
    const titleModal = document.getElementById("titleNewTask");
    const descriptionModal = document.getElementById("descriptionText");
    const completedModal = document.getElementById("inlineCheckboxCompleted");
    const importantModal = document.getElementById("inlineCheckboxImportant");
    const customListSelectModal = document.getElementById("customListSelect");
    const taskColorSelectModal = document.getElementById("taskColorSelect");
    titleModal.value = taskDetails.title;
    descriptionModal.value = taskDetails.description;
    completedModal.checked = taskDetails.completed;
    importantModal.checked = taskDetails.important;
    customListSelectModal.value = taskDetails.customListIndex;
    taskColorSelectModal.value = taskDetails.taskColorIndex;
}
