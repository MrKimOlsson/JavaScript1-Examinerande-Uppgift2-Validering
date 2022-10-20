// --------------------- REFERENCES ---------------------
// DECLAIR REFERENCES TO HTML ELEMENTS
const form = document.querySelector('#validationForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const repeatPassword = document.querySelector('#repeatPassword');

// --------------------- USER CLASS ---------------------

class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }

    userInfo() {
        return `Firstname: ${this.firstName} | Lastname: ${this.lastName} | Email: ${this.email} | Password: ${this.password}`
    }
}

// --------------------- VALIDATION ---------------------

// VALIDATE TEXT
const validateText = (id) => {
    const input = document.querySelector(id)

    // Om input är tom = error
    if(input.value.trim() === '') {
        console.log(input.id + ' is empty');
        return error(input)
       
    // Om input är mindre än två = error
    } else if(input.value.length < 2) {
        console.log(input.id + ' length is less than 2 characters');
        return error(input)

    // Om input innehåller nummer = error
    } else if(/\d/.test(input.value)) {
        console.log(input.id + ' contains a number');
        return error(input)

    // Annars, inga fel = Success
    } else {
        return success(input)
    }
}

// VALIDATE EMAIL
const validateEmail = (id) => {
    const email = document.querySelector(id)
    // const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.value.trim() === '') {
        console.log(email.id + ' is empty');
        return error(email)    

    } else if(!regEx.test(email.value)){
        console.log(email.id + ' is not a valid email adress');
        return error(email)

    } else {
        return success(email)
    }
} 

// VALIDATE PASSWORD
const validatePassword = (id) => {
    const input = document.querySelector(id)
    const isContainsNumber = /^(?=.*[0-9])/;
    const isContainsUppercase = /^(?=.*[A-Z])/;
    const isContainsLowercase = /^(?=.*[a-z])/;
    const isValidLength = /^.{6,12}$/;

    if(input.value.trim() === '') {
        console.log(input.id + ' is empty');
        return error(input)
       
    } else if(!isValidLength.test(input.value)){
        console.log(input.id + ' must be 6-12 characters long');
        return error(input)

    } else if(!isContainsNumber.test(input.value)){
        console.log(input.id + ' must contain atleast one digit');
        return error(input)

    } else if(!isContainsUppercase.test(input.value)){
        console.log(input.id + ' must contain atleast one uppercase character');
        return error(input)

    } else if(!isContainsLowercase.test(input.value)){
        console.log(input.id + ' must contain atleast one lowercase character');
        return error(input)
 
    } else {
        return success(input)
    }               
}

// VALIDATE CHECKBOX
const validateCheck = (id) => {
    const checkbox = document.querySelector(id)

    // If checkbox is not checked = checkbox error
    if(!checkbox.checked) {
        console.log('The checkbox must be checked');
        return error(checkbox)
    }
    // If checkbox is checked = checkbox success
    else {
        return success(checkbox)
    }
}

// --------------------- SUCCESS & ERROR ---------------------

// SUCCESSFUL INPUT
const success = () => {
    return true;
}

// ERROR INPUT
const error = () => {
    return false;
}

// --------------------- ON SUBMIT ---------------------

// LISTENER FOR SUBMIT ON THE FORM
form.addEventListener('submit', e => {
    //Prevent the browser to reload
    e.preventDefault()
     
    // Error storage array
    const errors = [];

    // Check for errors in the form inputs
    for(let i = 0; i < form.length; i++) {

        // Declairs the input variable and takes each input of the form and adds a # 
        // to give the variable "input" the value of the current id to be validated
        const input = '#' + form[i].id

        // Check input type, call appropriate validation function and pass in the input
         // If type text = validate text function and return true or false to the errors array
        if(form[i].type === 'text') {
            errors[i] = validateText(input)
        } 
         // If type email = validate email function and return true or false to the errors array
        else if(form[i].type === 'email') {
            errors[i] = validateEmail(input)
        }
         // If type checkbox = validate checkbox function and return true or false to the errors array
        else if(form[i].type === 'checkbox') {
            errors[i] = validateCheck(input)
        }
        // If type password = validate password function and return true or false to the errors array
        else if(form[i].type === 'password') {
            errors[i] = validatePassword(input)

        // If no other errors - Check if passwords match - if error return false to the errors array
        } else if(password.value !== repeatPassword.value){
            console.log('Passwords do not match');
            errors[i] = error(repeatPassword)
         } 
        
        }

    // --------------------- HANDLING ERRORS AND SUCCESS ---------------------

    // ERROR
    // If the errors array contains any false value = error
    if(errors.includes(false)) {

        // Display error message by removing the d-none class from errorMessage
        errorMessage.classList.remove('d-none');
    
    // SUCCESS
    // If errors array contains only true values = success
    } else {
        // Console log success message
        console.log('Success!')
        console.log('formuläret är korrekt ifyllt - lagrar informationen i user object')

        // Remove error message by adding the d-none class to errorMessage
        errorMessage.classList.add('d-none');

        // Create a new instance of the User class with the values of the form input
        const user = new User(firstName.value, lastName.value, email.value, password.value);

        // Console log the user info from the user object
        console.log(user.userInfo());
        console.log('Redo att skicka till databasen')

    }      
})