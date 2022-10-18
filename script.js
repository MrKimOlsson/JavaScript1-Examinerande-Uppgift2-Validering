// --------------------- REFERENCES ---------------------
// DECLAIR REFERENCES TO HTML ELEMENTS
const form = document.querySelector('#validationForm');
const errorMessage = document.querySelector('#errorMessage');
const btn = document.querySelector('#btn');
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
        console.log(input.id + ' length is less than 2');
        return error(input)

    // Om input innehåller nummer = error
    } else if(/\d/.test(input.value)) {
        console.log(input.id + ' contains a number');
        return error(input)
    }

    // Annars, inga fel = Success
    else {
        return success(input)
    }
}

// VALIDATE EMAIL
const validateEmail = (id) => {
    const email = document.querySelector(id)

    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/

    if(email.value.trim() === '') {
        console.log(email.id + ' is empty');
        return error(email)    

    } else if(!regEx.test(email.value)) {
        return error(email)

    } else {
        return success(email)
    }
} 

// VALIDATE PASSWORD
const validatePassword = (id) => {
    const input = document.querySelector(id)

    if(input.value.trim() === '') {
        console.log(input.id + ' is empty');
        return error(input)
       
    } else if(input.value.length < 6) {
        console.log(input.id + ' is less than 6');
        return error(input)

    } else if(password.value !== repeatPassword.value){
        console.log('Passwords do not match');
        return error(repeatPassword)

    } else {
        return success(input)
    }               
}

// VALIDATE CHECKBOX
const validateCheck = (id) => {
    const checkbox = document.querySelector(id)

    // If checkbox is not checked = checkbox error
    if(!checkbox.checked) {
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
    // Return true value
    return true;
}

// ERROR INPUT
const error = (input) => {
    // Console.log error location + return false value
    console.log('No valid input value for id: ' + input.id)
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
         // if type text = validate password function and return true or false to the errors array
        if(form[i].type === 'text') {
            errors[i] = validateText(input)
        } 
         // if type email = validate email function and return true or false to the errors array
        else if(form[i].type === 'email') {
            errors[i] = validateEmail(input)
        }
         // if type checkbox = validate checkbox function and return true or false to the errors array
        else if(form[i].type === 'checkbox') {
            errors[i] = validateCheck(input)
        }
        // if type password = validate password function and return true or false to the errors array
        else if(form[i].type === 'password') {
            errors[i] = validatePassword(input)
        }
    }  

    // --------------------- HANDLING ERRORS AND SUCCESS ---------------------

    // ERROR
    // If the errors array contains any false value = error
    if(errors.includes(false)) {
        console.log('Error array contains false | false = not a valid input');
        // Console log the errors array, false value = error
        console.log(errors);
        // Display error message by removing the d-none class from errorMessage
        errorMessage.classList.remove('d-none');
    
    // SUCCESS
    // If errors array contains only true values = success
    } else {
        // Console success message
        console.log('Success!')
        console.log('formuläret är korrekt ifyllt - lagrar informationen i user object')

        // Remove error message by adding the d-none class to errorMessage
        errorMessage.classList.add('d-none');

        // Create a new instance of the User class with the values of the form input
        const user = new User(firstName.value, lastName.value, email.value, password.value);

        // Prints out the user info from the user object
        console.log(user.userInfo());
        console.log('Redo att skicka till databasen')

    }      
})