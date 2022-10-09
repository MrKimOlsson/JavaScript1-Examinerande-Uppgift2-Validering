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

// --------------------- USER OBJECT ---------------------
// For storing the user information recived from the form

const user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

// --------------------- VALIDATION ---------------------

// VALIDATE TEXT
const validateText = (id) => {
    const input = document.querySelector(id)

    if(input.value.trim() === '') {
        console.log(input.id + ' is empty');
        return setError(input)
       
    } else if(input.value.length < 2) {
        console.log(input.id + ' length is less than 2');
        return setError(input)

    } else if(/\d/.test(input.value)) {
        console.log(input.id + ' contains a number');
        return setError(input)
    
    } else {
        return setSuccess(input)
    }
}

// VALIDATE EMAIL
const validateEmail = (id) => {
    const email = document.querySelector(id)

    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/

    if(email.value.trim() === '') {
        return setError(email)
        
    }
    else if(!regEx.test(email.value)) {
        return setError(email)
    }
    else {
        return setSuccess(email)
    }
} 

// VALIDATE PASSWORD
const validatePassword = (id) => {
    const input = document.querySelector(id)

    if(input.value.trim() === '') {
        return setError(input)
       
    } else if(input.value.length < 6) {
        return setError(input)

    } else if(password.value !== repeatPassword.value){
            return setError(repeatPassword)

    } else {
        return setSuccess(input)
    }        
               
}

// VALIDATE CHECKBOX
const validateCheck = (id) => {
    const checkbox = document.querySelector(id)

    // If checkbox is not checked = checkbox error
    if(!checkbox.checked) {
        return setError(checkbox)
    }
    // If checkbox is checked = checkbox success
    else {
        return setSuccess(checkbox)
    }
}

// --------------------- setSUCCESS & ERROR ---------------------

// SUCCESSFUL INPUT
const setSuccess = (input) => {
    console.log('Successful value for id: ' + input.id)
    return true;
}

// ERROR INPUT
const setError = (input) => {
    // logs where the error is located
    console.log('No valid input value for id: ' + input.id)
    return false;
}

// --------------------- ON SUBMIT ---------------------

// LISTENER FOR SUBMIT ON THE FORM
form.addEventListener('submit', e => {
    //Prevent the browser to reload
    e.preventDefault()
     
    // ARRAY FOR STOREING ERRORS
    const errors = [];

    //CHECK THE INPUTS FROM THE FORM FOR ERRORS
    for(let i = 0; i < form.length; i++) {

        // Declairs the input variable and takes each input of the form and adds a # 
        // to give the variable "input" the value of the current id to be validated
        const input = '#' + form[i].id

        // CHECK INPUT TYPES AND CALLS APPROPRIATE VALIDATION

         // if type text = validate password and return true or false to the errors array
        if(form[i].type === 'text') {
            errors[i] = validateText(input)
        } 
         // if type email = validate email and return true or false to the errors array
        else if(form[i].type === 'email') {
            errors[i] = validateEmail(input)
        }
         // if type checkbox = validate checkbox and return true or false to the errors array
        else if(form[i].type === 'checkbox') {
            errors[i] = validateCheck(input)
        }
        // if type password = validate password and return true or false to the errors array
        else if(form[i].type === 'password') {
            errors[i] = validatePassword(input)
        }
    }  

    // --------------------- HANDLING ERRORS AND SUCCESS ---------------------

    // If any errors
    // If the errors array contains any false values
    if(errors.includes(false)) {
        console.log('Error | Showing error message | false = not a valid input');
        console.log(errors);
        errorMessage.classList.remove('d-none');
    
    // If no errors
    } else {
        console.log('Success!')
        console.log('formuläret är korrekt ifyllt - lagrar informationen i user object')

        // Remove error message
        errorMessage.classList.add('d-none');

        //Add form info to the user object
        user.firstName = firstName.value;
        user.lastName = lastName.value;
        user.email = email.value;
        user.password = password.value;
        
        // Prints out the user info from the object
        console.log('The object: "user" now contains: ' + JSON.stringify(user));
        console.log('Redo att skicka till databasen')

    }      
})