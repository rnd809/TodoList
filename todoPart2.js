// Part 2
// Now that you have a functioning todo app, save your todos in localStorage!
// Make sure that when the page refreshes, the todos on the page remain there.
function creatingHTMLBased() {
        const bodyElement = document.querySelector('body');
        // Create an h1 Element For The Todo List Title:
        const h1Element = document.createElement('h1');
        h1Element.innerText = 'Todo List 2020';
        bodyElement.appendChild(h1Element);
        // Create a section that will host a ul
        const sectionElement = document.createElement('section');
        const ulElementListOrig = document.createElement('ul');
        sectionElement.appendChild(ulElementListOrig);
        bodyElement.appendChild(sectionElement);

        // Create a form
        const formElementOrig = document.createElement('form');
        sectionElement.prepend(formElementOrig);

        // ///////////////Input Build UP With Button/////////////////////
        const inputLabel = document.createElement('label');
        inputLabel.setAttribute('for', 'newTask');
        inputLabel.innerText = 'Create A New Task: ';
        const inputNewTaskOrig = document.createElement('input');
        inputNewTaskOrig.setAttribute('type', 'text');
        inputNewTaskOrig.setAttribute('id', 'newTask');
        inputNewTaskOrig.setAttribute('name', 'newTask');
        inputNewTaskOrig.autofocus = true;
        formElementOrig.appendChild(inputLabel);
        inputLabel.appendChild(inputNewTaskOrig);
        const addTask = document.createElement('button');
        addTask.innerText = 'Add Task';
        formElementOrig.appendChild(addTask);
        return [formElementOrig, ulElementListOrig, inputNewTaskOrig];
}
const htmlElements = creatingHTMLBased();
const formElement = htmlElements[0];
const ulElementList = htmlElements[1];
const inputNewTask = htmlElements[2];
//
// We are checking if localStorage has an array and if it does we return the values and asssign it to the itemsArray variable.
// If localStorage is empty then we give the itemsArray an emthy array to start storaging the values.
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
let count = 0;
function resetIDofItemsArray() {
        itemsArray.forEach(object => {
                object.id = count;
                count += 1;
        });
}
if (itemsArray) {
        itemsArray.forEach(object => {
                object.id = count;
                count += 1;
        });
        for (const objectTask of itemsArray) {
                // Creates LI element
                const newTask = document.createElement('li');

                for (const item of Object.keys(objectTask)) {
                        if (item === 'innerText') {
                                newTask.innerText = objectTask[item];
                        } else if (item === 'taskCompleted' && objectTask[item] === true) {
                                newTask.style.textDecoration = 'line-through';
                        } else if (item === 'id') {
                                newTask.id = objectTask[item];
                        }
                }
                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'Delete';
                newTask.appendChild(deleteBtn);
                ulElementList.appendChild(newTask);
        }
}

// Create funnction that creates li on the event listerne call
function createAndAppendLI(innerTXT) {
        // Creates LI element
        const newTask = document.createElement('li');
        // Adds innnerText to the LI
        newTask.innerText = innerTXT;
        // Add Id to li
        // Give it a task is completed property
        newTask.taskCompleted = false;
        newTask.id = itemsArray.length;
        itemsArray.push({
                innerText: newTask.innerText,
                id: newTask.id,
                taskCompleted: false,
        });
        // Creates a DeleteButto and Appends it into the new create LI
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        newTask.appendChild(deleteBtn);
        // Append the new task to the UL
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
        localStorage.setItem('items', JSON.stringify(itemsArray));
});
// Check for completed task
ulElementList.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.innerText === 'Delete') {
                // console.log(event.target.parentElement);
                const indexInArray = parseInt(event.target.parentElement.id);
                // console.log(indexInArray);
                itemsArray.splice(indexInArray, 1);
                localStorage.setItem('items', JSON.stringify(itemsArray));
                itemsArray = JSON.parse(localStorage.getItem('items'));
                resetIDofItemsArray();
                event.target.parentElement.remove();
                // for (const item of ulElementList.children) {
                //         console.log(item);
                // }
                // const taskItemInnearText = event.target.parentElement.innerText.split(' Delete').join(' ');
                // removeTaskFromLocaStorage(taskItemInnearText);
        } else if (event.target.tagName === 'LI' && event.target.style.textDecoration === 'line-through') {
                event.target.style.textDecoration = '';
                const indexInArray = parseInt(event.target.id);
                itemsArray[indexInArray].taskCompleted = false;
                localStorage.setItem('items', JSON.stringify(itemsArray));
        } else if (event.target.tagName === 'LI' && event.target.style.textDecoration !== 'line-through') {
                event.target.style.textDecoration = 'line-through';
                const indexInArray = parseInt(event.target.id);
                itemsArray[indexInArray].taskCompleted = true;
                localStorage.setItem('items', JSON.stringify(itemsArray));
        }
});
