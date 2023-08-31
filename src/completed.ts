interface TaskDetails {
    title: string;
    description: string;
    completed: boolean;
    important: boolean;
    customListIndex: string;
    taskColorIndex: string;
}

const tasks: TaskDetails[] = JSON.parse(localStorage.getItem("tasks") || "[]");
const completedTasksContainer = document.getElementById("completed-tasks-container") as HTMLElement;
const importantTasksContainer = document.getElementById("important-tasks-container") as HTMLElement;

export function addTaskToCompleted(taskItem: HTMLElement, taskDetails: TaskDetails) {
    const index = tasks.length; 
    taskItem.setAttribute("data-index", index.toString());
    completedTasksContainer.appendChild(taskItem);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function addTaskToImportant(taskItem: HTMLElement, taskDetails: TaskDetails) {
    const index = tasks.length;
    taskItem.setAttribute("data-index", index.toString());
    importantTasksContainer.appendChild(taskItem);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function attachClickHandlersToCompletedTasks():void {
    const completedTasks = document.querySelectorAll(".completed-task-item");

    completedTasks.forEach((taskItem) => {
        taskItem.addEventListener("click", () => {
            const index = parseInt(taskItem.getAttribute("data-index") || "0");
            const taskDetails = tasks[index];
            openModalWithTaskDetails(taskDetails);
        });
    });
}

export function openModalWithTaskDetails(taskDetails: TaskDetails) {
    const modal = document.querySelector(".modal") as HTMLElement;
    modal.style.display = "block";

    const titleModal = document.getElementById("titleNewTask") as HTMLInputElement;
    const descriptionModal = document.getElementById("descriptionText") as HTMLTextAreaElement;
    const completedModal = document.getElementById("inlineCheckboxCompleted") as HTMLInputElement;
    const importantModal = document.getElementById("inlineCheckboxImportant") as HTMLInputElement;
    const customListSelectModal = document.getElementById("customListSelect") as HTMLSelectElement;
    const taskColorSelectModal = document.getElementById("taskColorSelect") as HTMLSelectElement;

    titleModal.value = taskDetails.title;
    descriptionModal.value = taskDetails.description;
    completedModal.checked = taskDetails.completed;
    importantModal.checked = taskDetails.important;
    customListSelectModal.value = taskDetails.customListIndex;
    taskColorSelectModal.value = taskDetails.taskColorIndex;
}

export function showImportantTaskDetails(taskDetails: TaskDetails, modal: HTMLElement) {
    const titleModal = document.getElementById("titleNewTask") as HTMLInputElement;
    const descriptionModal = document.getElementById("descriptionText") as HTMLTextAreaElement;
    const completedModal = document.getElementById("inlineCheckboxCompleted") as HTMLInputElement;
    const importantModal = document.getElementById("inlineCheckboxImportant") as HTMLInputElement;
    const customListSelectModal = document.getElementById("customListSelect") as HTMLSelectElement;
    const taskColorSelectModal = document.getElementById("taskColorSelect") as HTMLSelectElement;

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
