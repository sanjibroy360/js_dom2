
var btn = document.querySelector("#add-book button");
var ul = document.querySelector("#book-list ul");
let addBookInput = document.querySelector(".inputBookName");
let searchBookInput = document.querySelector(".searchBookName");
let hideBookLabel = document.querySelector(".hide_label");
let hideBookCheckbox = document.querySelector("#hide");

hideBookCheckbox.checked = false
// console.log(localStorage.getItem("bookName"))
// let arr = [];

let arr = JSON.parse(localStorage.getItem("bookName")) || [] ;
createBookLi(arr);
let lib = {};

function searchBook(event) {
        
    event.preventDefault();
    let str = event.target.value.toLowerCase();

    let filteredArr = arr.filter(book => book.bookName.toLowerCase().includes(str));
    ul.innerHTML = "";
    createBookLi(filteredArr);
}

function hideBook(event) {
    // event.preventDefault();
    event.preventDefault();
    // console.log(event.target.checked);
    
    // hideBookCheckbox.checked = event.target.checked;
    
    console.log(hideBookCheckbox.checked);
    hideBookCheckbox.checked = !hideBookCheckbox.checked;
    if(hideBookCheckbox.checked) {
        for(key of ul.children) {
            key.style.display = "none";
        }
        // hideBookCheckbox.checked = event.target.checked;
         
     } else {
         for(key of ul.children) {
             key.style.display = "block";
         }
     }
     
    // document.querySelector("#hide").addEventListener('click',hideBook);

}

function deleteBook(event) {
    event.preventDefault();
    let liId = event.target.parentNode.dataset.id;
    console.log(liId);
    ul.children[liId].remove();
    arr.splice(liId, 1);
    localStorage.setItem("bookName", JSON.stringify(arr));
    ul.innerHTML = "";
    createBookLi(arr);
}

function addBook(event) {
    event.preventDefault();
    
    if(!hideBookCheckbox.checked && addBookInput.value.trim() !== "") {
    
        lib = {
            bookName : addBookInput.value,
        }
        console.log(lib);
        arr.push(lib);
        addBookInput.value = "";
        console.log(arr);
        ul.innerHTML = "";
        createBookLi(arr);
        localStorage.clear();
        localStorage.setItem("bookName",JSON.stringify(arr));
        console.log(arr);
        
    }
    // event.preventDefault();
    
}

function createBookLi(book) {

    if(!hideBookCheckbox.checked) {

        book.forEach((eachBook, id) => {
            li = document.createElement('li');
            li.innerHTML = eachBook.bookName;
            li.setAttribute("data-id",id);
        
            let delBtn = document.createElement('button');
            delBtn.classList.add('delete');
            delBtn.textContent = 'DELETE';
        
            li.appendChild(delBtn);
            ul.appendChild(li);
            document.body.querySelector("#book-list");
    
            delBtn.addEventListener('click', deleteBook);
    
        });
    }
    

   
    
}

btn.addEventListener("click",addBook);
hideBookLabel.addEventListener('click',hideBook);
searchBookInput.addEventListener("keyup", searchBook);
// searchInput.addEventListener("keyup", searchBook);

// document.querySelector('#add-book').addEventListener('click' , (event)=>{
    
// })

document.querySelector('#add-book').addEventListener('click' , (event)=>{
    event.preventDefault();
})