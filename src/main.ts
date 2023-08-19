
    const buttonNewTask = document.getElementById("buttonNewTask") as HTMLButtonElement;
    const modal = document.querySelector(".modal") as HTMLElement;
    const saveChangesButton = document.querySelector(".modal-footer .btn-primary") as HTMLButtonElement;
    const importantSidebarLink = document.getElementById("important-list") as HTMLElement;
    const taskSidebarLink = document.getElementById("task-list") as HTMLElement;
    const mainImportantList = document.getElementById("main-important-list") as HTMLElement;
    const mainTaskList = document.getElementById("main-task-list") as HTMLElement;
    const importantTasksContainer = document.getElementById("important-tasks-container") as HTMLElement;
    const cancelButton = document.querySelector(".modal-footer .btn-secondary") as HTMLButtonElement;

    buttonNewTask.addEventListener("click", () => {
        modal.style.display = "block";
    });

    const closeModalButton = document.querySelector(".btn-close") as HTMLButtonElement;
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
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
        taskItem.appendChild(taskLabel);

        const importantCheckbox = document.createElement("input");
        importantCheckbox.type = "checkbox";
        taskItem.appendChild(importantCheckbox);

        const importantLabel = document.createElement("label");
        importantLabel.textContent = "Important";
        taskItem.appendChild(importantLabel);

        if (completed.checked) {
            const completedList = document.getElementById("completed-list") as HTMLElement;
            completedList.appendChild(taskItem);
        } else if (important.checked) {
            const taskItemCopy = taskItem.cloneNode(true) as HTMLElement;
            importantTasksContainer.appendChild(taskItemCopy);
        } else {
            const taskList = document.getElementById("task-list") as HTMLElement;
            taskList.appendChild(taskItem);
        }

        if (customListSelect.selectedIndex !== 0) {
            const customListName = customListSelect.options[customListSelect.selectedIndex].text;
            const customListContainer = document.getElementById("custom-list") as HTMLElement;
            customListContainer.innerHTML = `Custom List: ${customListName}`;
        }

        if (important.checked) {
            const taskItemCopy = taskItem.cloneNode(true) as HTMLElement;
            const taskItemImportantCheckbox = taskItemCopy.querySelector(".checkbox-important") as HTMLInputElement;
            taskItemImportantCheckbox.checked = true;
            importantTasksContainer.appendChild(taskItemCopy);
        }

        modal.style.display = "none";
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
