
let save = document.querySelector('#Save');
let form = document.querySelector('form');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let telInput = document.getElementById('tel');//********************** Grab the Classes , Id and Elements */
let todoList = document.querySelector('.todoList');
let dataInput = document.querySelector('#data');
let alerts = document.querySelector('.contOne')




nameInput.focus();// Focus on name input;
if (todoList.children.length === 0) {  //if there is no todo this h3 will show
    todoList.innerHTML = `<h3 class="notodo">There are no to-dos.</h3>`;
}


let maxlength = () => {  // This function give for the maxLength of number input 
    if (telInput.value.length > telInput.maxLength) {
        telInput.value = telInput.value.slice(0, telInput.maxLength);
    }
}
//This Function add an item to delete and warning alert
let alertFunc = (text, className) => {
    alerts.innerHTML = `<div class="alert  alert-${className} my-1" data-aos="fade-down" data-aos-duration="800" >
    ${text}
    </div>`
    setTimeout(function () {//After three second the alert was display none
        alerts.innerHTML = "";
    }, 2600)
}

let text;
let className;




save.addEventListener('click', (e) => {// This function is run when the the todo will stored with the name , email and number
    if (nameInput.value.length >= nameInput.minLength &&
        emailInput.value.length >= emailInput.minLength) {//Check  the input value of name eamil is done or not 
        if (telInput.value.length >= 1 && telInput.value.length <= 9) { //Check the number's are more than ten or not 
            e.preventDefault();
            text = 'warning ! please enter a valid Number!'
            className = 'warning'
            alertFunc(text, className);
        }
    }
    if (nameInput.value.length >= nameInput.minLength &&
        emailInput.value.length >= emailInput.minLength &&
        telInput.value.length >= telInput.minLength) {//If all the input value are done than this condition start
        e.preventDefault();//This line help's in not to load page when save a todo 

        let capital = nameInput.value.charAt(0);//This code convert the first letter of name in capital letter
        capital = capital.toUpperCase();
        nameInput.value = capital + nameInput.value.slice(1);

        let deleItems = todoList.children;//To remove the element containing the text "There are no to-dos" when a new to-do item is added
        for (let i = 0; i < deleItems.length; i++) {
            if (deleItems[i].classList.contains('notodo')) {
                deleItems[i].remove();
            }
        }


        let todoItem = document.createElement('div'); //"Creating a <div> to store to-dos."
        todoItem.className = 'todoItem';//**"Updating the data and creating a card for the to-do." */
        todoItem.innerHTML = `
            <p>Name: ${nameInput.value}</p>
            <p>Email: ${emailInput.value}</p
            <p>Number: ${telInput.value}
            <button class="buttn" title="call"><a href='tel:91${telInput.value}' target=_blank"><img src="call.jpg" alt="call image" /></a></button>
            <button class="buttn"><a href='//api.whatsapp.com/send?phone=91${telInput.value}&text=Hii ${nameInput.value}'target="_blank"title="Share on whatsapp"><img src="whatsapp.png" alt="whatsapp image" /></a></button>
            </p>

            <button type="button" style="float:right" class="btn btn-danger">Danger</button>
        `;

        todoList.appendChild(todoItem);//todo data append here
        text = 'Success ! Todo add successfully!'
        className = 'success'
        alertFunc(text, className); //Call the alertFunction with text and classname 
        dataInput.reset();//Reset the form
        nameInput.focus();// After reset focus on the first input 
    }

});

todoList.addEventListener('click', (e) => { //delete the todo
    if (e.target.classList.contains('btn')) {
        let todoItem = e.target.parentNode;//target the element
        todoItem.parentNode.removeChild(todoItem);//remove the element
        let text = 'Todo deleted successfully!';
        let className = 'danger';
        alertFunc(text, className);//Call the alertFunction with text and classname 
    }
    if (todoList.children.length === 0) {//when there are no to-dos available, the specified text "There are no to-dos" will be shown.
        let notodo = document.createElement('h3');
        notodo.className = "notodo";
        notodo.innerText = "There are no to-dos."
        todoList.append(notodo);//"Append the <h3> element containing the text 'There are no to-dos'."
    }

});
