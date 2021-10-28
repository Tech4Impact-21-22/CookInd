import { getRecipesSearch, createRecipeCard } from "./index.js";

// Get params
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Get elements from HTML
const elSearchTitle = document.querySelector('#search-title');
const elSearchRecipes = document.querySelector('.search-recipes');
const elLoading = document.querySelector('#loading');
const elContent = document.querySelector('#content');

// Render recipes
const renderRecipes = async function(){
    try{
        let recipes = await getRecipesSearch(params.search_keyword);
        if(recipes.results.length !== 0){
            elSearchTitle.innerText = `Resep "${params.search_keyword}"`;
            if(recipes.results.length <= 20){
                for(let i=0; i<recipes.results.length; i++){
                    let recipeCard = createRecipeCard(recipes.results[i], true);
                    elSearchRecipes.appendChild(recipeCard);
                }
            }else{
                for(let i=0; i<20; i++){
                    let recipeCard = createRecipeCard(recipes.results[i], true);
                    elSearchRecipes.appendChild(recipeCard);
                }
            }
        } else{
            elSearchTitle.innerText = `Maaf, resep "${params.search_keyword}" tidak ditemukan.`
        }
        
        elLoading.classList.add('d-none');
        elContent.classList.remove('d-none');
        console.log(recipes.results)
    } catch(error){
        console.log(error);
    }
};

renderRecipes();