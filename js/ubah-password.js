// Get HTML elements
const elEmail = document.querySelector('#email');
const elPassword = document.querySelector('#password');
const elConfirmPassword = document.querySelector('#conf-password');
const elBtn = document.querySelector('#submit');
const elInvalidEmail = document.querySelector('#email-invalid');
const elInvalidPassword = document.querySelector('#pass-invalid');
const elInvalidConfirmPassword = document.querySelector('#conf-pass-invalid');
const elForm = document.querySelector('form');

let loggedIn = sessionStorage.getItem('loggedIn');

let passValidation = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);


function checkLoggedIn(){
    if(loggedIn){
        elBtn.addEventListener('click', function(e){
            e.preventDefault();
            if(elInvalidEmail.classList[1] !== 'd-none'){
                elInvalidEmail.classList.add('d-none');
            }
            if(elInvalidPassword.classList[1] !== 'd-none'){
                elInvalidPassword.classList.add('d-none');
            }
            if(elInvalidConfirmPassword.classList[1] !== 'd-none'){
                elInvalidConfirmPassword.classList.add('d-none')
            }
            let email = elEmail.value;
            let password = elPassword.value;
            let confirmPassword = elConfirmPassword.value;
            let signedUp = JSON.parse(localStorage.getItem(email));
            if(email!==''){
                if(password !=='' && passValidation.test(password)){
                    if(confirmPassword !=='' && password===confirmPassword){
                        if(loggedIn === email){
                            localStorage.setItem(email, JSON.stringify({'name':signedUp.name, 'pass': password}));
                            alert('Password berhasil diubah!');
                            window.setTimeout(function(){
                                sessionStorage.removeItem('loggedIn');
                                window.location.href = '/masuk.html';
                            }, 200)
                        }else{
                            alert('Mohon masukkan e-mail yang anda daftarkan.');
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
            
        })
    }else{
        window.location.href = "/index.html"
    }
}

checkLoggedIn();
