import { createRecipeCard } from "./index.js";

// Get HTML elements
const elName = document.querySelector('#name');
const elEmail = document.querySelector('#email');
const elLogOutBtn = document.querySelector('#submit');
const elWishlist = document.querySelector('.recipes-wishlist');
let loggedIn = sessionStorage.getItem('loggedIn');

// Checked loggedIn
function checkLoggedIn(){
    if(loggedIn){
        // Get data from local storage
        let profile = JSON.parse(localStorage.getItem(loggedIn));
        let wishlist = profile.wishlist;
        elName.innerText = profile.name;
        elEmail.innerText = loggedIn;

        // Log out
        elLogOutBtn.addEventListener('click', function(e){
            e.preventDefault();
            sessionStorage.removeItem('loggedIn');
            window.location.href='/index.html'
        })

        // Wishlist
        if(!wishlist || wishlist.length === 0){
            const noWishlist = document.createElement('h5');
            noWishlist.innerText = "Belum ada resep yang dimasukkan ke dalam Wishlist.";
            elWishlist.appendChild(noWishlist);
        } else {
            for(let i = 0; i < wishlist.length; i++){
                let recipeCard = createRecipeCard(wishlist[i]);
                elWishlist.appendChild(recipeCard);
            }
        }
    }else{
        window.location.href="/index.html";
    }
}
checkLoggedIn();

