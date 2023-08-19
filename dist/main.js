"use strict";
const buttonNewTask = document.getElementById("buttonNewTask");
const modal = document.querySelector(".modal");
const saveChangesButton = document.querySelector(".modal-footer .btn-primary");
const importantSidebarLink = document.getElementById("important-list");
const taskSidebarLink = document.getElementById("task-list");
const mainImportantList = document.getElementById("main-important-list");
const mainTaskList = document.getElementById("main-task-list");
const importantTasksContainer = document.getElementById("important-tasks-container");
const cancelButton = document.querySelector(".modal-footer .btn-secondary");
buttonNewTask.addEventListener("click", () => {
    modal.style.display = "block";
});
const closeModalButton = document.querySelector(".btn-close");
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});
saveChangesButton.addEventListener("click", () => {
    modal.style.display = "none";
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
    taskItem.appendChild(taskLabel);
    const importantCheckbox = document.createElement("input");
    importantCheckbox.type = "checkbox";
    taskItem.appendChild(importantCheckbox);
    const importantLabel = document.createElement("label");
    importantLabel.textContent = "Important";
    taskItem.appendChild(importantLabel);
    if (completed.checked) {
        const completedList = document.getElementById("completed-list");
        completedList.appendChild(taskItem);
    }
    else if (important.checked) {
        const taskItemCopy = taskItem.cloneNode(true);
        importantTasksContainer.appendChild(taskItemCopy);
    }
    else {
        const taskList = document.getElementById("task-list");
        taskList.appendChild(taskItem);
    }
    if (customListSelect.selectedIndex !== 0) {
        const customListName = customListSelect.options[customListSelect.selectedIndex].text;
        const customListContainer = document.getElementById("custom-list");
        customListContainer.innerHTML = `Custom List: ${customListName}`;
    }
    if (important.checked) {
        const taskItemCopy = taskItem.cloneNode(true);
        const taskItemImportantCheckbox = taskItemCopy.querySelector(".checkbox-important");
        taskItemImportantCheckbox.checked = true;
        importantTasksContainer.appendChild(taskItemCopy);
    }
});
cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
});
importantSidebarLink.addEventListener("click", () => {
    mainImportantList.style.display = "block";
    mainTaskList.style.display = "none";
});
taskSidebarLink.addEventListener("click", () => {
    mainImportantList.style.display = "none";
    mainTaskList.style.display = "block";
});
