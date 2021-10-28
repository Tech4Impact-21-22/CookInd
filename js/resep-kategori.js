import { getRecipesByCategory, createRecipeCard } from "./index.js";

// Get params
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Get elements from HTML
const elCategoryTitle = document.querySelector('#category-title');
const elCategoryRecipes = document.querySelector('.category-recipes');
const elLoading = document.querySelector('#loading');
const elContent = document.querySelector('#content');

elCategoryTitle.innerText = `Resep ${params.title}`;

// Render recipes
const renderRecipes = async function(){
    try{
        let recipes = await getRecipesByCategory(params.category);
        for(let i=0; i<recipes.results.length; i++){
            let recipeCard = createRecipeCard(recipes.results[i]);
            elCategoryRecipes.appendChild(recipeCard);
        }
        elLoading.classList.add('d-none');
        elContent.classList.remove('d-none');
    } catch(error){
        console.log(error);
    }
};

renderRecipes();