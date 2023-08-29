
import { addTaskToCompleted, addTaskToImportant, attachClickHandlersToCompletedTasks } from "./completed.js";
import { attachClickHandlersToImportantTasks, showImportantTaskDetails } from "./important.js";

const buttonNewTask = document.getElementById("buttonNewTask") as HTMLButtonElement;
const modal = document.querySelector(".modal") as HTMLElement;
const saveChangesButton = document.querySelector(".modal-footer .btn-primary") as HTMLButtonElement;

const importantTasksContainer = document.getElementById("important-tasks-container") as HTMLElement;
const tasks: TaskDetails[] = [];

interface TaskDetails {
    title: string;
    description: string;
    completed: boolean;
    important: boolean;
    customListIndex: string;
    taskColorIndex: string;
}
 
window.addEventListener("load", init); 

function init() {

    interface TaskDetails {
        title: string;
        description: string;
        completed: boolean;
        important: boolean;
        customListIndex: string;
        taskColorIndex: string;
    }

 const tasks: TaskDetails[] = [];

    const importantSidebarLink = document.getElementById("important-list") as HTMLElement;
    const taskSidebarLink = document.getElementById("task-list") as HTMLElement;
    const mainImportantList = document.getElementById("mainImportantList") as HTMLElement;
    const mainTaskList = document.getElementById("main-task-list") as HTMLElement;
    const importantTasksContainer = document.getElementById("important-tasks-container") as HTMLElement;
    const cancelButton = document.querySelector(".modal-footer .btn-secondary") as HTMLButtonElement;
    const taskList = document.getElementById("task-list") as HTMLElement;



    buttonNewTask.addEventListener("click", () => {
        modal.style.display = "block";

        const title = document.getElementById("titleNewTask") as HTMLInputElement;
        const description = document.getElementById("descriptionText") as HTMLTextAreaElement;
        const completed = document.getElementById("inlineCheckboxCompleted") as HTMLInputElement;
        const important = document.getElementById("inlineCheckboxImportant") as HTMLInputElement;
        const customListSelect = document.getElementById("customListSelect") as HTMLSelectElement;
        const taskColorSelect = document.getElementById("taskColorSelect") as HTMLSelectElement;

        title.value = "";  
        description.value = "";  
        completed.checked = false;  
        important.checked = false;  
        customListSelect.selectedIndex = 0;  
        taskColorSelect.selectedIndex = 0; 
    });

    const closeModalButton = document.querySelector(".btn-close") as HTMLButtonElement;
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
        const title = document.getElementById("titleNewTask") as HTMLInputElement;
        const description = document.getElementById("descriptionText") as HTMLTextAreaElement;
        const completed = document.getElementById("inlineCheckboxCompleted") as HTMLInputElement;
        const important = document.getElementById("inlineCheckboxImportant") as HTMLInputElement;
        const customListSelect = document.getElementById("customListSelect") as HTMLSelectElement;
        const taskColorSelect = document.getElementById("taskColorSelect") as HTMLSelectElement;
    
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
    
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        taskItem.appendChild(checkbox);
    
        const taskLabel = document.createElement("label");
        taskLabel.textContent = title.value;
        taskLabel.className = "task-label"
        taskItem.appendChild(taskLabel);
    
        const importantCheckbox = document.createElement("input");
        importantCheckbox.type = "checkbox";
        importantCheckbox.className = "important-checkbox"
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
            const completedList = document.getElementById("completed-tasks-container") as HTMLElement;
            addTaskToCompleted(taskItem, newTaskDetails);

            if (important.checked) {
                importantTasksContainer.removeChild(taskItem);
            } else {
                taskList.removeChild(taskItem);
            }
            
        } else if (important.checked) {
            const taskItemCopy = taskItem.cloneNode(true) as HTMLElement;
            addTaskToImportant(taskItemCopy, newTaskDetails);
            importantCheckbox.checked = true;

            const deleteButtonCopy = taskItemCopy.querySelector(".icon-delete");
            if (deleteButtonCopy) {
                deleteButtonCopy.addEventListener("click", () => {
                    taskItemCopy.remove();
                });
            }
        } else {
            const taskList = document.getElementById("task-list") as HTMLElement;
            taskList.appendChild(taskItem);
        

        taskItem.addEventListener("click", () => {
            const titleModal = document.getElementById("titleNewTask") as HTMLInputElement;
            const descriptionModal = document.getElementById("descriptionText") as HTMLTextAreaElement;
            const completedModal = document.getElementById("inlineCheckboxCompleted") as HTMLInputElement;
            const importantModal = document.getElementById("inlineCheckboxImportant") as HTMLInputElement;
            const customListSelectModal = document.getElementById("customListSelect") as HTMLSelectElement;
            const taskColorSelectModal = document.getElementById("taskColorSelect") as HTMLSelectElement;

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
            const customListContainer = document.getElementById("custom-list") as HTMLElement;
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

    const taskHeader = document.getElementById("header-task-list") as HTMLElement;
    const taskSection = document.getElementById("main-task-list") as HTMLElement;
    
    taskHeader.addEventListener("click", () => {
        mainSections.forEach(section => {
            (section as HTMLElement).style.display = "none";
        });
        taskSection.style.display = "block";
    });

sidebarItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        mainSections.forEach(section => {
            (section as HTMLElement).style.display = "none";
        });

        const clickedSection = mainSections[index] as HTMLElement;
        clickedSection.style.display = "block";
    });
})};



attachClickHandlersToImportantTasks();

attachClickHandlersToCompletedTasks();
importantTasksContainer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement; 

    if (target) {
        const taskItem = target.closest(".task-item");
        if (taskItem) {
            const index = parseInt(taskItem.getAttribute("data-index") || "0");
            const taskDetails = tasks[index];
            showImportantTaskDetails(taskDetails, modal);
        }
    }
});
