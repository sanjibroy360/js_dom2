let input = document.querySelector(".todo_input");
let downArrow = document.querySelector(".down_arrow");
let ul = document.querySelector('.todo_list');
let database = JSON.parse(localStorage.getItem('todos')) || [];
let page;
let footerCreated = false;
let flag = 0;


function displayItem(event, database) {
    
    localStorage.setItem('todos',JSON.stringify(database));
   
    if(database.length === 0) {
        page = "all";
    }
    if (event.keyCode === 13 && event.target.value.trim() !== "") {
        database.push({
            text: event.target.value.trim(),
            isDone: false
        });
        event.target.value = "";
        

        ul.innerHTML = "";
        
        if(page === "active" && database.length !== 0) {
            displayActive(database,database.filter(el => !el.isDone));
          
        } else if(page === "completed" && database.length !== 0) {
            displayCompleted(database,database.filter(el => el.isDone));
           
        } else {
            database.forEach((data, index) => structMade(data, index));
        }
        
        if (database.length === 1) {
            ul.after(createFooter());
            downArrow.style.visibility = "visible";
            localStorage.setItem('todos',JSON.stringify(database));
            
        } else {
            
            updateFooter(database);
            localStorage.setItem('todos',JSON.stringify(database));
        }
    }
}

function updateFooter(database) {
    localStorage.setItem('todos',JSON.stringify(database));
    if (database.length === 0) {
        document.querySelector('footer').innerHTML = "";
        downArrow.style.visibility = "hidden";
    } else {
        createFooter();
        downArrow.style.visibility = "visible";
        let currentLeftItem = database.filter(el => !el.isDone).length;
        if (currentLeftItem === 1 || currentLeftItem === 0 ) {
            document.querySelector('.item_left').innerHTML = `${currentLeftItem} item left`;
        } else {
            document.querySelector('.item_left').innerHTML = `${currentLeftItem} items left`;
        }
    }
}

function displayDelBtn(event) {
    let id = event.target.parentNode.dataset.id;
    let allDelBtn = document.querySelectorAll(".delete");

    allDelBtn.forEach(el => {
        el.style.zIndex = "-1";
        if (el.parentNode.dataset.id === id) {
            el.style.zIndex = "2";
        }
    })
}

function hideDelBtn(event) {
    let id = event.target.parentNode.dataset.id;
    let allDelBtn = document.querySelectorAll(".delete");

    allDelBtn.forEach(el => {
        if (el.parentNode.dataset.id === id) {
            el.style.zIndex = "-1";
        }
    })
}

function deleteItem(arr) {
    let id = event.target.parentNode.dataset.id;
    arr.splice(id, 1);
    localStorage.setItem('todos',JSON.stringify(database));
    updateFooter(arr)
    ul.innerHTML = "";
    
    if(page === "all") {
        database.forEach((data, index) => structMade(data, index));
    } else if(page === "completed") {
        displayCompleted(database,database.filter(el => el.isDone));
    } else {
        displayActive(database,database.filter(el => !el.isDone));
    }
}

function takeInput(arr, event) {
    
    if(flag == 0) {

        flag = 1;
        let p = event.target;
        let parent = event.target.parentNode;
        let inputEdit = document.createElement('input');

        let parentLi = Array.from(event.target.parentNode.children);
        parentLi.forEach(el => {
            if(el!== event.target) {
                el.classList.contains("delete") ? el.style.display = "none" : el.style.visibility = "hidden";
            }
        })

        inputEdit.classList.add("todo_input");
        inputEdit.classList.add("edit");
        parent.replaceChild(inputEdit, p);
        inputEdit.innerText = event.target.innerText;

        inputEdit.value = event.target.innerText;

        inputEdit.addEventListener('keyup', editedValue);
    } 
}

function editedValue(event) {
    
    let id = event.target.parentNode.dataset.id;
    let parent = event.target.parentNode;
    let input = event.target;
    let p = document.createElement('p');
    p.innerHTML = event.target.value;
    p.classList.add("todo_show")
    
    if (event.keyCode === 13 && event.target.value.trim() !== "") {

        flag = 0;
        
        database[id].text = event.target.value;
        parent.replaceChild(p, input);

        ul.innerHTML = "";
        localStorage.setItem('todos',JSON.stringify(database));

        database.forEach((data, index) => structMade(data, index));
    }
}

function strikeItem(arr) {

    let checkbox = event.target;
    let id = checkbox.parentNode.dataset.id;
    arr[id].isDone = !arr[id].isDone;
    localStorage.setItem('todos',JSON.stringify(arr));
    
    if (arr[id].isDone) {

        checkbox.parentNode.children[1].classList.add("strike");
        document.querySelector('.clear_completed').classList.add("visible");

        updateFooter(arr);
        updateCompleted(arr);
        updateActive(arr);
        ul.innerHTML = "";
        arr.forEach((el, i) => structMade(el, i));

    } else {
        checkbox.parentNode.children[1].classList.remove("strike");
        document.querySelector('.clear_completed').classList.remove("visible");
        
        updateFooter(arr);
        updateCompleted(arr);
        updateActive(arr);
        ul.innerHTML = "";
        arr.forEach((el, i) => structMade(el, i));
    }
}

function updateCompleted(database) {

    let completedData = database.filter(el => el.isDone);
    
    if (completedData.length === 0 && page === "completed") {
        ul.innerHTML = "";
    }

    if (event.target.className === "completed") {
        page = "completed"
        displayCompleted(database, completedData);
    }
}

function displayCompleted(mainDatabase, filteredDatabase) {

    ul.innerHTML = "";
    updateFooter(mainDatabase);

    page = "completed";
    
    let allButtons = document.querySelectorAll("button");

    Array.from(allButtons).forEach(btn => {

        if (btn.classList.contains("selected")) {
            btn.classList.remove("selected");
        }
        document.querySelector(".completed").classList.add("selected");   
    })

    filteredDatabase.forEach((data, index) => structMade(data, mainDatabase.indexOf(data)));

    let all = ul.querySelectorAll('.check');
    all.forEach(el => el.addEventListener('click', (event) => removeFromList(event, mainDatabase)));
}

function removeFromList(event, database) {

    let parent = event.target.parentNode;
    let id = event.target.parentNode.dataset.id;
    database[id].isDone = event.target.checked;
    
    parent.innerHTML = "";

    filterCompleted = database.filter(el => el.isDone);
    filterActive = database.filter(el => !el.isDone);

    if(page === "completed") {
        displayCompleted(database, filterCompleted);
    } else {
        displayActive(database, filterActive);
    }
}

function updateActive(database) {

    let activeData = database.filter(el => !el.isDone);

    if (activeData.length === 0 && page === "active") {
        ul.innerHTML = "";
    }
    
    if (event.target.className === "active") {
        page = "active"
        displayActive(database, activeData);
    }
}

function displayActive(mainDatabase, filteredDatabase) {

    ul.innerHTML = "";
    page = "active";

    let allButtons = document.querySelectorAll("button");

    Array.from(allButtons).forEach(btn => {

        if (btn.classList.contains("selected")) {
            btn.classList.remove("selected");
        }
        document.querySelector(".active").classList.add("selected");    
    })

    filteredDatabase.forEach((data, index) => structMade(data, mainDatabase.indexOf(data)));

    let all = ul.querySelectorAll('.check');
    all.forEach(el => el.addEventListener('click', (event)=>removeFromList(event,mainDatabase)));
    updateFooter(database);
}

function displayAll(database) {

    page = "all";

    ul.innerHTML = "";
    database.forEach((data, index) => structMade(data, index));
    if(!footerCreated) {
        ul.after(createFooter());
        footerCreated = true;
    } else {
        updateFooter(database);
    }

    let allButtons = document.querySelectorAll("button");

    Array.from(allButtons).forEach(btn => {

        if (btn.classList.contains("selected")) {
            btn.classList.remove("selected");
        }
        document.querySelector(".all").classList.add("selected");   
    })
    updateFooter(database);
}

function toggle(database) {
    ul.innerHTML = "";

    if (database.filter(el => el.isDone).length === database.length) {
        database.forEach((el, index) => {

            el.isDone = false;

            structMade(el, index);
            updateFooter(database);
        });
        updateCompleted(database);
        updateActive(database);

    } else if (database.filter(el => el.isDone === false).length === database.length) {
        database.forEach((el, index) => {

            el.isDone = true;

            structMade(el, index);
            updateFooter(database);

        });
        updateCompleted(database);
        updateActive(database);

    } else {
        database.forEach((el, index) => {

            el.isDone = true;

            structMade(el, index);
            updateFooter(database);
        });
        updateCompleted(database);
        updateActive(database);

    }

    if (database.filter(el => el.isDone).length) {
        document.querySelector('.clear_completed').classList.add("visible");
    } else {
        document.querySelector('.clear_completed').classList.remove("visible");
    }
}

function clearAllCompleted(database) {

    let tempDatabase = database.map(el => el);

    let filterCompleted = tempDatabase.filter(el => el.isDone == true);
    ul.innerHTML = "";
    for (let i = 0; i < filterCompleted.length; i++) {
        let pos = database.indexOf(filterCompleted[i]);
        database.splice(pos, 1);
    }

    if (database.length) {
        database.forEach((el, index) => structMade(el, index));

    }
    updateFooter(database);
}

function structMade(data, id) {
    
    let li = document.createElement('li');
    li.classList.add("flex");
    li.classList.add("list_item");
    li.setAttribute("data-id", id);

    let checkTodo = document.createElement('input');
    checkTodo.type = "checkbox";
    checkTodo.checked = data.isDone;  

    checkboxId = `toggle${id}`
    checkTodo.setAttribute("id",checkboxId);  
    checkTodo.classList.add("check");
    
    checkTodo.style.display = "none";

    let label = document.createElement('label');
    label.setAttribute("for", checkboxId);

    let tickWrapper = document.createElement('div');
    tickWrapper.classList.add("tick_wrapper");

    let tickImage = document.createElement('img');
    tickImage.src = "";
    tickImage.classList.add('tick_mark');

    tickWrapper.appendChild(tickImage);

    label.appendChild(tickWrapper);

    let todoText = document.createElement('p');
    todoText.innerText = data.text;

    todoText.classList.add("todo_show");

    let delBtn = document.createElement('span');
    delBtn.innerHTML = "&#10005;";
    delBtn.classList.add("delete");

    if (checkTodo.checked) {
        todoText.classList.add("strike");
    }

    if(data.isDone) {
        tickImage.src = "./assets/media/tick.png";
    }

    li.appendChild(checkTodo);
    li.appendChild(label);
    li.appendChild(todoText);
    li.appendChild(delBtn);
    ul.appendChild(li);

    li.addEventListener("mouseover", displayDelBtn);
    li.addEventListener("mouseout", hideDelBtn);
    
    todoText.addEventListener('dblclick', () => takeInput(database, event));
    
    delBtn.addEventListener('click', () => deleteItem(database));
    checkTodo.addEventListener('click', () => strikeItem(database));
  
}

function createFooter() {

    let footerSec = document.createElement('footer'); 

    let footerDiv = document.createElement('div'); 
    footerDiv.classList.add('footer');
    footerDiv.classList.add('footer_flex2');

    let footerItemLeft = document.createElement('span');
    footerItemLeft.classList.add("item_left");
    footerItemLeft.innerHTML = `1 item left`;
    footerDiv.appendChild(footerItemLeft);

    let footerUl = document.createElement('ul');
    footerUl.classList.add('footer_list');
    footerUl.classList.add('footer_flex');

    let footerLiAll = document.createElement('button');
    footerLiAll.classList.add("all");
    footerLiAll.innerHTML = 'All';
    footerLiAll.classList.add("selected");

    let footerLiActive = document.createElement('button');
    footerLiActive.classList.add("active");
    footerLiActive.innerHTML = `Active`;

    let footerLiCompleted = document.createElement('button');
    footerLiCompleted.classList.add("completed");
    footerLiCompleted.innerHTML = `Completed`

    footerUl.appendChild(footerLiAll);
    footerUl.appendChild(footerLiActive);
    footerUl.appendChild(footerLiCompleted);

    footerDiv.appendChild(footerUl); 

    let footerClearCompleted = document.createElement('span');
    footerClearCompleted.classList.add('clear_completed');
    footerClearCompleted.innerHTML = 'Clear completed';

    footerDiv.appendChild(footerClearCompleted);

    footerSec.appendChild(footerDiv);

    footerClearCompleted.addEventListener("click", () => clearAllCompleted(database));

    footerLiCompleted.addEventListener('click', () => updateCompleted(database));
    footerLiActive.addEventListener('click', () => updateActive(database));
    footerLiAll.addEventListener('click', () => displayAll(database));

    return footerSec;
}

downArrow.addEventListener("click", () => toggle(database));
input.addEventListener('keyup', () => displayItem(event, database));
