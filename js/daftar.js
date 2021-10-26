// Get HTML elements
const elName = document.querySelector('#name');
const elEmail = document.querySelector('#email');
const elPassword = document.querySelector('#password');
const elConfirmPassword = document.querySelector('#conf-password');
const elBtn = document.querySelector('#submit');
const elInvalidName = document.querySelector('#name-invalid');
const elInvalidEmail = document.querySelector('#email-invalid');
const elInvalidPassword = document.querySelector('#pass-invalid');
const elInvalidConfirmPassword = document.querySelector('#conf-pass-invalid');
const elForm = document.querySelector('form');

let emailValidation = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
let passValidation = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

elBtn.addEventListener('click', function (e){
    e.preventDefault();
    if(elInvalidName.classList[1] !== 'd-none'){
        elInvalidName.classList.add('d-none')
    }
    if(elInvalidEmail.classList[1] !== 'd-none'){
        elInvalidEmail.classList.add('d-none')
    }
    if(elInvalidPassword.classList[1] !== 'd-none'){
        elInvalidPassword.classList.add('d-none')
    }
    if(elInvalidConfirmPassword.classList[1] !== 'd-none'){
        elInvalidConfirmPassword.classList.add('d-none')
    }
    let name = elName.value;
    let email = elEmail.value;
    let password = elPassword.value;
    let confirmPassword = elConfirmPassword.value;
    let signedUp = localStorage.getItem(email);
    if(name !== ''){
        if(email !== '' && emailValidation.test(email)){
            if(password !== '' && passValidation.test(password)){
                if(confirmPassword !== '' && password === confirmPassword){
                    if(signedUp){
                        alert('Email yang anda masukkan sudah terdaftar.')
                        elForm.reset();
                    }else{
                        window.location.href = "/masuk.html"
                        localStorage.setItem(email, JSON.stringify({'name':name, 'pass': password}))
                        elForm.reset();
                    }
                }else{
                    elConfirmPassword.value = '';
                    elInvalidConfirmPassword.classList.remove('d-none');
                }
            }else{
                elPassword.value = '';
                elConfirmPassword.value = '';
                elInvalidPassword.classList.remove('d-none');
            }
        }else{
            elEmail.value = '';
            elPassword.value = '';
            elConfirmPassword.value = '';
            elInvalidEmail.classList.remove('d-none');
        }
    }else{
        elName.value = '';
        elEmail.value = '';
        elPassword.value = '';
        elConfirmPassword.value = '';
        elInvalidName.classList.remove('d-none');
    }
});

