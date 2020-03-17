
let msgName;

function createForm() {
    let main = document.createElement('main');

    let div = document.createElement('div');
    div.classList.add("form_wrapper");

    let form = document.createElement('form');
    form.classList.add("form");

    let inputName = document.createElement('input');
    inputName.type = "text";
    inputName.placeholder = "Name";
    inputName.classList.add("name");

    let inputEmail = document.createElement('input');
    inputEmail.type = "email";
    inputEmail.placeholder = "Email";
    inputEmail.classList.add("email");

    let inputPassword = document.createElement('input');
    inputPassword.type = "password";
    inputPassword.placeholder = "Password";
    inputPassword.classList.add("password");

    let inputSubmit = document.createElement('input');
    inputSubmit.type = "submit";
    inputSubmit.textContent = "Sign Up";
    inputSubmit.classList.add("btn");


    form.appendChild(inputName);
    form.appendChild(inputEmail);
    form.appendChild(inputPassword);
    form.appendChild(inputSubmit);

    div.appendChild(form);
    main.appendChild(div);

    document.body.appendChild(main);

    document.querySelector(".btn").addEventListener("click", showResult);
}

function showResult(event) {
  
    let form = document.querySelector(".form");


    let name = document.querySelector(".name");
    let email = document.querySelector(".email");
    let password = document.querySelector(".password");
    let nameError = "";
    let emailError = "";
    let passwordError = ""; 

    if(name.value.trim() === "") {

        console.log(name);
        nameError = document.createElement("p");
        nameError.textContent = "Name can't be empty!";
        name.after(nameError);

    }
    
    if(email.value.trim() === "") {
        emailError = document.createElement("p");
        emailError.textContent = "Email can't be empty!";
        email.after(emailError);


    } 
    
    if(password.value.toString().trim() === "") {
        passwordError = document.createElement("p");
        passwordError.textContent = "Password can't be empty!";
        password.after(passwordError);

    } 

    if(name.value.trim()!=="" && email.value.trim()!=="" && password.value.trim()!==""){
        let result = styleResultBox(name.value, email.value, password.value);
        event.target.parentNode.remove();
        document.body.appendChild(result);
        
    }
    
}


function styleResultBox(name, email, password) {

    let div = document.createElement('div');
    div.classList.add("result_wrapper");

    let divResult = document.createElement('div');
    divResult.classList.add("results");

    let preName = document.createElement('pre');
    preName.style.display = "block";
    preName.innerHTML = `<b>Your Name : ${name}</b>`;

    let preEmail = document.createElement('pre');
    preEmail.style.display = "block";
    preEmail.innerHTML = `<b>Your Email : ${email}</b>`;

    let prePassword = document.createElement('pre');
    prePassword.style.display = "block";
    prePassword.innerHTML = `<b>Your Password : ${password}</b>`;
    
    divResult.appendChild(preName);
    divResult.appendChild(preEmail);
    divResult.appendChild(prePassword);

    div.appendChild(divResult);

    return div;
}


document.querySelector('body').addEventListener('submit' , (event)=>{
    event.preventDefault();
})

