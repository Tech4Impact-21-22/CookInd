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
const elReceipeIngredientsContainer = document.querySelector('.recipe-ingredients');
const elReceipeStepsContainer = document.querySelector('.recipe-steps');
const elWishlistBtn = document.querySelector('#add-wishlist');

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
        elReceipeIngredientsContainer.classList.remove('d-none')
        elReceipeStepsContainer.classList.remove('d-none')
    } catch(error){
        console.log(error)
    }
};

renderRecipeDetail();

// Add to wishlist 
function addWishlist(event){
    event.preventDefault();
    // Check whether a user is loggedIn
    const loggedIn = sessionStorage.getItem('loggedIn');

    if(loggedIn){
        const profile = JSON.parse(localStorage.getItem(loggedIn));
        const thumb = params.thumb;
        const title = elRecipeTitle.innerText;
        const difficulty = elRecipeDifficulty.innerText;
        const time = elRecipeTime.innerText;
        const serving = elRecipeServing.innerText;
        if(!profile.wishlist || profile.wishlist.length === 0){
            const wishlist = [];
            wishlist.push({
                'key': params.food,
                'title': title, 
                'thumb': thumb,
                'dificulty': difficulty,
                'portion': serving,
                'times' : time
            });
            localStorage.setItem(loggedIn, JSON.stringify({"name": profile.name, "pass":profile.pass, "wishlist":wishlist}))
            this.setAttribute('style', 'color:#d3455b;');
        }else{
            const wishlist = profile.wishlist;
            const checkWishlist = wishlist.filter(function(recipe){
                return recipe.title === title;
            }) 
            if(checkWishlist.length === 0){
                wishlist.push({
                    'key': params.food,
                    'title': title, 
                    'thumb': thumb,
                    'dificulty': difficulty,
                    'portion': serving,
                    'times' : time
                });
                localStorage.setItem(loggedIn, JSON.stringify({"name": profile.name, "pass":profile.pass, "wishlist":wishlist}));
                this.setAttribute('style', 'color:#d3455b;');
            } else {
                localStorage.setItem(loggedIn, JSON.stringify(
                    {'key': params.food,
                    "name": profile.name, 
                    "pass":profile.pass, 
                    "wishlist":wishlist.filter(function(recipe){
                        return recipe.title !== title;
                    })}
                ))
                this.removeAttribute('style');
            }
            }
    } else {
        window.location.href = '/masuk.html';
    }
}

elWishlistBtn.addEventListener('click', addWishlist);

// Check add to wishlist button color
function checkButton(){
   // Check whether a user is loggedIn
   const loggedIn = sessionStorage.getItem('loggedIn');
   if(loggedIn){
        const profile = JSON.parse(localStorage.getItem(loggedIn));
        const wishlist = profile.wishlist;
        if(wishlist){
            const checkWishlist = wishlist.filter(function(recipe){
                return recipe.key === params.food;
            })
            if(checkWishlist.length !== 0){
                elWishlistBtn.setAttribute('style', 'color:#d3455b;');
            } 
        }
   }
}

checkButton();