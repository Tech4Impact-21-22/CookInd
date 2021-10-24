import { getLatestRecipes, createRecipeCard } from "./index.js";

// Get HTML elements
const elLatestRecipes = document.querySelector('.latest-recipes');
const elSearchInput = document.querySelector('#search-input');
const elSearchBtn = document.querySelector('#search-btn');
const elLoading = document.querySelector('#loading');
const elContent = document.querySelector('#content');

// Search bar
elSearchBtn.addEventListener('click', function(event){
    event.preventDefault();
    document.location.href=`/resep-pencarian.html?search_keyword=${elSearchInput.value}`;
})

// Render recipes
const renderRecipes = async function(){
    try{
        let recipes = await getLatestRecipes();
        for(let i=0; i<8; i++){
            let recipeCard = createRecipeCard(recipes.results[i]);
            elLatestRecipes.appendChild(recipeCard);
        }
        elLoading.classList.add('d-none');
        elContent.classList.remove('d-none');
    } catch(error){
        console.log(error)
    }
};

renderRecipes();