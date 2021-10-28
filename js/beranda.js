// Get HTML elements
const elBtn1 = document.querySelector('.button1');
const elBtn2 = document.querySelector('.button2');

// Check logged in or not
const loggedIn = sessionStorage.getItem('loggedIn');
if(loggedIn){
    elBtn1.classList.add('d-none');
    elBtn2.classList.add('mx-0');
}
