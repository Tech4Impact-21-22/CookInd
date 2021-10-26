// Get HTML elements
const elEmail = document.querySelector('#email');
const elPassword = document.querySelector('#password');
const elBtn = document.querySelector('#submit');
const elInvalidEmail = document.querySelector('#email-invalid');
const elInvalidPassword = document.querySelector('#pass-invalid');
const elForm = document.querySelector('form');

elBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(elInvalidEmail.classList[1] !== 'd-none'){
        elInvalidEmail.classList.add('d-none');
    }
    if(elInvalidPassword.classList[1] !== 'd-none'){
        elInvalidPassword.classList.add('d-none');
    }
    let email = elEmail.value;
    let password = elPassword.value;
    let signedUp = JSON.parse(localStorage.getItem(email));
    if(email!==''){
        if(signedUp){
            if(signedUp.pass===password){
                sessionStorage.setItem('loggedIn', email);
                window.location.href = '/beranda.html';
                elForm.reset();
            }else{
                elPassword.value = '';
                elInvalidPassword.classList.remove('d-none');
            }
        }else{
            alert('Email yang anda masukkan belum terdaftar.');
            elForm.reset();
        }
    }else{
        elEmail.value = '';
        elPassword.value = '';
        elInvalidEmail.classList.remove('d-none');
    }
    
})