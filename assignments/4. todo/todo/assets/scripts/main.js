let input = document.querySelector(".todo_input");
let downArrow = document.querySelector(".down_arrow");
let ul = document.querySelector('.todo_list');
document.querySelector('.todo_wrapper').appendChild(ul);
let database = [];
let page;
let flag = 0;




function displayItem(event, database) {
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
            // createFooter();
            
        } else if(page === "completed" && database.length !== 0) {
            displayCompleted(database,database.filter(el => el.isDone));
            // createFooter();
        } else {
            database.forEach((data, index) => structMade(data, index));
            // createFooter();
        }
        
        console.log("0",downArrow);
        
        if (database.length === 1) {
            ul.after(createFooter());
            downArrow.style.visibility = "visible";
            console.log("1",downArrow);
            
        } else {
            createFooter();
            updateFooter(database);
            console.log("page",page)
        }
        
    }
}


//     <li class="flex list_item">
//         <span class="check">
//             <input type="checkbox" class="completed">
//         </span>

//         <input type="text" class="todo_show">

//         <span class="delete">
//             X
//         </span>

//     </li>
// </ul> -->

function updateFooter(database) {
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

    // console.log(id);
    console.log(database);
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



        // input.innerText = event.target.innerText;

        inputEdit.classList.add("todo_input");
        inputEdit.classList.add("edit");
        parent.replaceChild(inputEdit, p);
        inputEdit.innerText = event.target.innerText;

        inputEdit.value = event.target.innerText;

        inputEdit.addEventListener('keyup', editedValue);
        console.log(event.target);
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

        database.forEach((data, index) => structMade(data, index));
    }
    //  

}


function strikeItem(arr) {

    let checkbox = event.target;
    
    
    
    let id = checkbox.parentNode.dataset.id;
    

    arr[id].isDone = !arr[id].isDone;
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
        // console.log(arr[id].isDone);
        updateCompleted(arr);
        updateActive(arr);
        ul.innerHTML = "";
        arr.forEach((el, i) => structMade(el, i));
        // updateActive(arr);
    }

}


function updateCompleted(database) {


    let completedData = database.filter(el => el.isDone);
    // ul.children[0].addEventListener( click, structMade())
    // console.log(checkValue, event.target.className);

    if (completedData.length === 0 && page === "completed") {
        ul.innerHTML = "";
    }



    if (event.target.className === "completed") {
        // if(checkValue){
        // debugger;
        page = "completed"
        displayCompleted(database, completedData);

    }

    // }
}




function displayCompleted(mainDatabase, filteredDatabase) {

    
    ul.innerHTML = "";
    // console.log(event);
    updateFooter(mainDatabase);
    console.log(event.target)

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

    
    // document.querySelector(".completed").classList.add('selected');
    // console.log("completed",document.querySelector(".completed"))
    // updateCompleted(mainDatabase);
}

function removeFromList(event, database) {

    let parent = event.target.parentNode;
    let id = event.target.parentNode.dataset.id;
    console.log(event.target.checked);
    database[id].isDone = event.target.checked;
    
    parent.innerHTML = "";

    filterCompleted = database.filter(el => el.isDone);
    filterActive = database.filter(el => !el.isDone);

    if(page === "completed") {
        displayCompleted(database, filterCompleted);
    } else {
        displayActive(database, filterActive);
    }
    
    console.log(database);

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
    // debugger;
    

    ul.innerHTML = "";

    // database.forEach( (data, index) => {
    console.log("isDone true toggle", database.filter(el => el.isDone).length);
    console.log("isDone false toggle", database.filter(el => el.isDone === false).length);
    console.log("database length toggle", database.length);
    if (database.filter(el => el.isDone).length === database.length) {
        database.forEach((el, index) => {

            el.isDone = false;

            structMade(el, index);
            updateFooter(database);
            console.log("toggle true", database);

        });
        updateCompleted(database);
        updateActive(database);


        // strikeItem(database);

    } else if (database.filter(el => el.isDone === false).length === database.length) {
        database.forEach((el, index) => {

            el.isDone = true;

            structMade(el, index);
            updateFooter(database);
            console.log("toggle false", database);


        });
        updateCompleted(database);
        updateActive(database);

    } else {
        database.forEach((el, index) => {

            el.isDone = true;

            structMade(el, index);
            updateFooter(database);
            console.log("toggle not equal", database);
        });
        updateCompleted(database);
        updateActive(database);


        // strikeItem(database);
    }

    // database.forEach((data, index) => structMade(data, index));

    // displayAll(database);
    // console.log("inner toggle", database);
    // });





    // let all = document.querySelectorAll('.check');
    // all.forEach(el => el.addEventListener('click', () => strikeItem(database)));
    // console.log(database);
    // console.log("outer toggle", database);
    // clearAllCompleted(database);


    if (database.filter(el => el.isDone).length) {
        document.querySelector('.clear_completed').classList.add("visible");

    } else {
        document.querySelector('.clear_completed').classList.remove("visible");

    }
    // debugger;
    
}

function clearAllCompleted(database) {


    let tempDatabase = database.map(el => el);

    let filterCompleted = tempDatabase.filter(el => el.isDone == true);
    ul.innerHTML = "";
    // filterCompleted.forEach(el => database.splice(tempDatabase.indexOf(el), 1));

    for (let i = 0; i < filterCompleted.length; i++) {
        let pos = database.indexOf(filterCompleted[i]);
        database.splice(pos, 1);
    }

    if (database.length) {
        database.forEach((el, index) => structMade(el, index));

    }

    updateFooter(database);




    // console.log(database);
}


function structMade(data, id) {
    let li = document.createElement('li');
    li.classList.add("flex");
    li.classList.add("list_item");
    li.setAttribute("data-id", id);

    let checkTodo = document.createElement('input');
    checkTodo.type = "checkbox";
    checkTodo.checked = data.isDone;
    

    // <label for="toggle" class="check">
    //                         <span><img src="./assets/media/tick.png" alt="" class="tick_mark"></span>
    //                     </label>
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


    

    // console.log(data);
    // <span class="item_left">1 item left</span>
    //                     <ul class="footer_list footer_flex">

    //                         <li class="all">All</li>
    //                         <li class="active">Active</li>
    //                         <li class="completed">Completed</li>
    //                     </ul>
    //                     <span class="clear_completed">Clear completed</span>


    // console.log(data);




    li.addEventListener("mouseover", displayDelBtn);
    li.addEventListener("mouseout", hideDelBtn);
    
    todoText.addEventListener('dblclick', () => takeInput(database, event));
    
    
    delBtn.addEventListener('click', () => deleteItem(database));
    checkTodo.addEventListener('click', () => strikeItem(database));
    // console.log("database li", database);

}




function createFooter() {



    let footerSec = document.createElement('footer'); //footer section

    let footerDiv = document.createElement('div'); //footer div
    footerDiv.classList.add('footer');
    footerDiv.classList.add('footer_flex2');

    // items left

    let footerItemLeft = document.createElement('span');
    footerItemLeft.classList.add("item_left");
    footerItemLeft.innerHTML = `1 item left`;

    // if(left > 1) {
    //     footerItemLeft.innerHTML = `${left} items left`;
    // } else {
    //     footerItemLeft.innerHTML = `${left} item left`;
    // }

    footerDiv.appendChild(footerItemLeft);


    // footer ul

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

    footerDiv.appendChild(footerUl); //Append ul

    

    // All buttons

    



    // clear completed

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
