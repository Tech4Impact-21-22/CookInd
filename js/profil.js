// Get HTML elements
const elName = document.querySelector('#name');
const elEmail = document.querySelector('#email');
const elLogOutBtn = document.querySelector('#submit');

// Get data from local storage
let profile = JSON.parse(localStorage.getItem(sessionStorage.getItem('loggedIn')));
elName.innerText = profile.name;
elEmail.innerText = sessionStorage.getItem('loggedIn');

// Log out
elLogOutBtn.addEventListener('click', function(e){
    e.preventDefault();
    sessionStorage.removeItem('loggedIn');
    window.location.href='/beranda.html'
})