// Get HTML elements
const elName = document.querySelector('#name');
const elEmail = document.querySelector('#email');
const elBtn = document.querySelector('#submit');
const elInvalidName = document.querySelector('#name-invalid');
const elInvalidEmail = document.querySelector('#email-invalid');
const elForm = document.querySelector('form');

const loggedIn = sessionStorage.getItem('loggedIn');

function checkLoggedIn(){
    if(loggedIn){
        const profile = JSON.parse(localStorage.getItem(sessionStorage.getItem('loggedIn')));
        elName.value = profile.name;
        elEmail.value = sessionStorage.getItem('loggedIn');

        elBtn.addEventListener('click', function(e){
            e.preventDefault();

            if(elInvalidName.classList[1] !== 'd-none'){
                elInvalidName.classList.add('d-none')
            }
            if(elInvalidEmail.classList[1] !== 'd-none'){
                elInvalidEmail.classList.add('d-none')
            }

            let newName = elName.value;
            let newEmail = elEmail.value;
            let signedUp = localStorage.getItem(newEmail);
            let emailValidation = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

            if(newName !== ''){
                if(email !== '' && emailValidation.test(newEmail)){
                    if(newEmail === sessionStorage.getItem('loggedIn')){
                        localStorage.setItem(newEmail, JSON.stringify({'name': newName, 'pass': profile.pass}));
                        window.location.href = '/profil.html';
                    }else if(newEmail !== sessionStorage.getItem('loggedIn') && signedUp){
                        alert('Email yang anda masukkan sudah terdaftar.')
                    }else {
                        localStorage.setItem(newEmail, JSON.stringify({'name': newName, 'pass': profile.pass}));
                        localStorage.removeItem(sessionStorage.getItem('loggedIn'));
                        sessionStorage.setItem('loggedIn', newEmail);
                        window.location.href = '/profil.html';
                    }
                }else{
                    elInvalidEmail.classList.remove('d-none');
                }
            }else{
                elInvalidName.classList.remove('d-none');
            }   
        })
    } else{
        window.location.href = "/index.html";
    }
}

checkLoggedIn();

