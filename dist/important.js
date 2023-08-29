const tasks = [];
const importantTasksContainer = document.querySelector(".tasks-item");
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
export function addTaskToImportant(taskItem, taskDetails) {
    tasks.push(taskDetails);
    importantTasksContainer.appendChild(taskItem);
    attachClickHandlersToImportantTasks();
}
export function attachClickHandlersToImportantTasks() {
    const importantTasks = document.querySelectorAll(".task-item");
    importantTasks.forEach((taskItem, index) => {
        taskItem.addEventListener("click", () => {
            const taskDetails = tasks[index];
            openModalWithTaskDetails(taskDetails);
        });
    });
}
export function attachClickHandlersToTaskItems() {
    const taskItems = document.querySelectorAll(".task-item");
    taskItems.forEach((taskItem, index) => {
        taskItem.addEventListener("click", (event) => {
            const clickedTaskItem = event.currentTarget;
            const clickedIndex = parseInt(clickedTaskItem.getAttribute("data-index") || "0");
            const taskDetails = tasks[clickedIndex];
            openModalWithTaskDetails(taskDetails);
        });
    });
}
export function showImportantTaskDetails(taskDetails, modal) {
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
    modal.style.display = "block";
}
const taskItems = document.querySelectorAll(".task-item");
taskItems.forEach((taskItem, index) => {
    taskItem.addEventListener("click", () => {
        openModalWithTaskDetails(tasks[index]);
    });
});
