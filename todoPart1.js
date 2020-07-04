// Part 1
// For this assignment you will be combining your knowledge of DOM access
// and events to build a todo app!
// As a user, you should be able to:
// Add a new todo (by submitting a form)
// Mark a todo as completed (cross out the text of the todo)
// Remove a todo

// Createing and returning the HTML from Scratch with JavaScript
function creatingHTMLBased() {
        const bodyElement = document.querySelector('body');
        // Create an h1 Element For The Todo List Title:
        const h1Element = document.createElement('h1');
        h1Element.innerText = 'Todo List 2020';
        bodyElement.appendChild(h1Element);
        // Create a section that will host a ul
        const sectionElement = document.createElement('section');
        const ulElementList = document.createElement('ul');
        sectionElement.appendChild(ulElementList);
        bodyElement.appendChild(sectionElement);

        // Create a form
        const formElement = document.createElement('form');
        sectionElement.prepend(formElement);

        // ///////////////Input Build UP With Button/////////////////////
        const inputLabel = document.createElement('label');
        inputLabel.setAttribute('for', 'newTask');
        inputLabel.innerText = 'Create A New Task: ';
        const inputNewTask = document.createElement('input');
        inputNewTask.setAttribute('type', 'text');
        inputNewTask.setAttribute('id', 'newTask');
        inputNewTask.setAttribute('name', 'newTask');
        inputNewTask.autofocus = true;
        formElement.appendChild(inputLabel);
        inputLabel.appendChild(inputNewTask);
        const addTask = document.createElement('button');
        addTask.innerText = 'Add Task';
        formElement.appendChild(addTask);
        return {
                formElement,
                ulElementList,
                inputNewTask,
        };
}
const { formElement, ulElementList, inputNewTask } = creatingHTMLBased();

// Create funnction that creates li
function createAndAppendLI(innerTXT) {
        // Creates LI element
        const newTask = document.createElement('li');
        // Adds innnerText to the LI
        newTask.innerText = innerTXT;
        // Creates a DeleteButto and Appends it into the new create LI
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        newTask.appendChild(deleteBtn);
        // Append the new task to the list
        ulElementList.appendChild(newTask);
}
formElement.addEventListener('submit', function(event) {
        event.preventDefault();
        // Retrive the value of the summited text and pass it to the inner text
        const lilText = `${inputNewTask.value.toLocaleUpperCase()} `;
        // Call the create LI function
        createAndAppendLI(lilText);
        // Set the input value to zero to prevent manually erazed items.
        inputNewTask.value = '';
});

ulElementList.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.innerText === 'Delete') {
                event.target.parentElement.remove();
        } else if (event.target.tagName === 'LI' && event.target.style.textDecoration === 'line-through') {
                event.target.style.textDecoration = '';
        } else if (event.target.tagName === 'LI' && event.target.style.textDecoration !== 'line-through') {
                event.target.style.textDecoration = 'line-through';
        }
});
