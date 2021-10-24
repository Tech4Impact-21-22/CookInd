import { getDetailRecipe } from "./index.js";

// Get params
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Take elements from HTML
const elRecipeTitle = document.querySelector('#recipe-title');
const elRecipeAuthorDate = document.querySelector('#author-date');
const elRecipeDifficulty = document.querySelector('#difficulty');
const elRecipeTime = document.querySelector('#times');
const elRecipeServing = document.querySelector('#serving');
const elRecipeThumb = document.querySelector('#recipe-thumb');
const elRecipeIngredientsFCol = document.querySelector('#ingredients-col1');
const elRecipeIngredientsSCol = document.querySelector('#ingredients-col2')
const elRecipeSteps = document.querySelector('#steps');
const elLoading = document.querySelector('#loading');
const elContent = document.querySelector('#content');

// Render elements
const renderRecipeDetail = async function(){
    try{
        let recipeDetail = await getDetailRecipe(params.food);
        elRecipeTitle.innerText = recipeDetail.results.title;
        elRecipeAuthorDate.innerText =`${recipeDetail.results.author.user} | ${recipeDetail.results.author.datePublished}`
        elRecipeDifficulty.innerText = recipeDetail.results.dificulty;
        elRecipeTime.innerText = recipeDetail.results.times;
        elRecipeServing.innerText = recipeDetail.results.servings;
        elRecipeThumb.src = params.thumb;
        for(let i=0; i< Math.ceil(recipeDetail.results.ingredient.length/2); i++){
            let elLi = document.createElement('li');
            elLi.innerText = recipeDetail.results.ingredient[i];
            elRecipeIngredientsFCol.appendChild(elLi);
        }
        for(let i=Math.ceil(recipeDetail.results.ingredient.length/2); i < recipeDetail.results.ingredient.length; i++){
            let elLi = document.createElement('li');
            elLi.innerText = recipeDetail.results.ingredient[i];
            elRecipeIngredientsSCol.appendChild(elLi);
        }
        for(let i=0; i< recipeDetail.results.step.length; i++){
            let elLi = document.createElement('li');
            let regex = /^[0-9]+\s/i;
            elLi.innerText = recipeDetail.results.step[i].replace(regex, '');
            elRecipeSteps.appendChild(elLi);
        }
        elLoading.classList.add('d-none')
        elContent.classList.remove('d-none')
    } catch(error){
        console.log(error)
    }
};

renderRecipeDetail();