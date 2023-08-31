interface TaskDetails {
    title: string;
    description: string;
    completed: boolean;
    important: boolean;
    customListIndex: string;
    taskColorIndex: string;
}

const tasks: TaskDetails[] = JSON.parse(localStorage.getItem("tasks") || "[]");
const importantTasksContainer = document.querySelector(".tasks-item") as HTMLElement;




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

export function addTaskToImportant(taskItem: HTMLElement, taskDetails: TaskDetails) {
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
            const clickedTaskItem = event.currentTarget as HTMLElement;
            const clickedIndex = parseInt(clickedTaskItem.getAttribute("data-index") || "0");
            const taskDetails = tasks[clickedIndex];
            openModalWithTaskDetails(taskDetails);
        });
    });
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