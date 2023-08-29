import { addTaskToCompleted, addTaskToImportant, attachClickHandlersToCompletedTasks } from "./completed.js";
import { attachClickHandlersToImportantTasks, showImportantTaskDetails } from "./important.js";
const buttonNewTask = document.getElementById("buttonNewTask");
const modal = document.querySelector(".modal");
const saveChangesButton = document.querySelector(".modal-footer .btn-primary");
const importantTasksContainer = document.getElementById("important-tasks-container");
const tasks = [];
window.addEventListener("load", init);
function init() {
    const tasks = [];
    const importantSidebarLink = document.getElementById("important-list");
    const taskSidebarLink = document.getElementById("task-list");
    const mainImportantList = document.getElementById("mainImportantList");
    const mainTaskList = document.getElementById("main-task-list");
    const importantTasksContainer = document.getElementById("important-tasks-container");
    const cancelButton = document.querySelector(".modal-footer .btn-secondary");
    const taskList = document.getElementById("task-list");
    buttonNewTask.addEventListener("click", () => {
        modal.style.display = "block";
        const title = document.getElementById("titleNewTask");
        const description = document.getElementById("descriptionText");
        const completed = document.getElementById("inlineCheckboxCompleted");
        const important = document.getElementById("inlineCheckboxImportant");
        const customListSelect = document.getElementById("customListSelect");
        const taskColorSelect = document.getElementById("taskColorSelect");
        title.value = "";
        description.value = "";
        completed.checked = false;
        important.checked = false;
        customListSelect.selectedIndex = 0;
        taskColorSelect.selectedIndex = 0;
    });
    const closeModalButton = document.querySelector(".btn-close");
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
    const deleteButtons = document.querySelectorAll(".icon-delete");
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {
            const taskItem = deleteButton.closest(".task-item");
            if (taskItem) {
                taskItem.remove();
            }
        });
    });
    saveChangesButton.addEventListener("click", () => {
        const title = document.getElementById("titleNewTask");
        const description = document.getElementById("descriptionText");
        const completed = document.getElementById("inlineCheckboxCompleted");
        const important = document.getElementById("inlineCheckboxImportant");
        const customListSelect = document.getElementById("customListSelect");
        const taskColorSelect = document.getElementById("taskColorSelect");
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        taskItem.appendChild(checkbox);
        const taskLabel = document.createElement("label");
        taskLabel.textContent = title.value;
        taskLabel.className = "task-label";
        taskItem.appendChild(taskLabel);
        const importantCheckbox = document.createElement("input");
        importantCheckbox.type = "checkbox";
        importantCheckbox.className = "important-checkbox";
        taskItem.appendChild(importantCheckbox);
        const importantLabel = document.createElement("label");
        importantLabel.textContent = "Important";
        taskItem.appendChild(importantLabel);
        const deleteButton = document.createElement("button");
        deleteButton.className = "icon-delete";
        deleteButton.id = "iconDelete";
        deleteButton.addEventListener("click", () => {
            taskItem.remove();
        });
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "icons/borrar.png";
        deleteIcon.alt = "Delete Icon";
        deleteButton.appendChild(deleteIcon);
        taskItem.appendChild(deleteButton);
        const newTaskDetails = {
            title: title.value,
            description: description.value,
            completed: completed.checked,
            important: important.checked,
            customListIndex: customListSelect.value,
            taskColorIndex: taskColorSelect.value
        };
        if (completed.checked) {
            const completedList = document.getElementById("completed-tasks-container");
            addTaskToCompleted(taskItem, newTaskDetails);
            if (important.checked) {
                importantTasksContainer.removeChild(taskItem);
            }
            else {
                taskList.removeChild(taskItem);
            }
        }
        else if (important.checked) {
            const taskItemCopy = taskItem.cloneNode(true);
            addTaskToImportant(taskItemCopy, newTaskDetails);
            importantCheckbox.checked = true;
            const deleteButtonCopy = taskItemCopy.querySelector(".icon-delete");
            if (deleteButtonCopy) {
                deleteButtonCopy.addEventListener("click", () => {
                    taskItemCopy.remove();
                });
            }
        }
        else {
            const taskList = document.getElementById("task-list");
            taskList.appendChild(taskItem);
            taskItem.addEventListener("click", () => {
                const titleModal = document.getElementById("titleNewTask");
                const descriptionModal = document.getElementById("descriptionText");
                const completedModal = document.getElementById("inlineCheckboxCompleted");
                const importantModal = document.getElementById("inlineCheckboxImportant");
                const customListSelectModal = document.getElementById("customListSelect");
                const taskColorSelectModal = document.getElementById("taskColorSelect");
                titleModal.value = newTaskDetails.title;
                descriptionModal.value = newTaskDetails.description;
                completedModal.checked = newTaskDetails.completed;
                importantModal.checked = newTaskDetails.important;
                customListSelectModal.value = newTaskDetails.customListIndex;
                taskColorSelectModal.value = newTaskDetails.taskColorIndex;
                modal.style.display = "block";
            });
        }
        if (customListSelect.selectedIndex !== 0) {
            const customListName = customListSelect.options[customListSelect.selectedIndex].text;
            const customListContainer = document.getElementById("custom-list");
            customListContainer.innerHTML = `Custom List: ${customListName}`;
        }
        tasks.push({
            title: title.value,
            description: description.value,
            completed: completed.checked,
            important: important.checked,
            customListIndex: customListSelect.value,
            taskColorIndex: taskColorSelect.value
        });
        modal.style.display = "none";
    });
    cancelButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
    importantSidebarLink.addEventListener("click", () => {
        mainImportantList.style.display = "block";
        mainTaskList.style.display = "none";
        attachClickHandlersToImportantTasks();
    });
    taskSidebarLink.addEventListener("click", () => {
        mainImportantList.style.display = "none";
        mainTaskList.style.display = "block";
        attachClickHandlersToImportantTasks();
    });
    const sidebarItems = document.querySelectorAll(".sidebar li");
    const mainSections = document.querySelectorAll(".main-content section");
    const taskHeader = document.getElementById("header-task-list");
    const taskSection = document.getElementById("main-task-list");
    taskHeader.addEventListener("click", () => {
        mainSections.forEach(section => {
            section.style.display = "none";
        });
        taskSection.style.display = "block";
    });
    sidebarItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            mainSections.forEach(section => {
                section.style.display = "none";
            });
            const clickedSection = mainSections[index];
            clickedSection.style.display = "block";
        });
    });
}
;
attachClickHandlersToImportantTasks();
attachClickHandlersToCompletedTasks();
importantTasksContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target) {
        const taskItem = target.closest(".task-item");
        if (taskItem) {
            const index = parseInt(taskItem.getAttribute("data-index") || "0");
            const taskDetails = tasks[index];
            showImportantTaskDetails(taskDetails, modal);
        }
    }
});
