// Get HTML elements
const elSignup = document.querySelector('#signup');
const elLogin = document.querySelector('#login');
const elProfile = document.querySelector('#profile');

// Check logged in or not
const loggedIn = sessionStorage.getItem('loggedIn');
if(loggedIn){
    elSignup.classList.add('d-none');
    elLogin.classList.add('d-none');
    elProfile.classList.remove('d-none');
}

// Search Recipes
export const getRecipesSearch = async function(search_keyword){
    try{
        const fetchRecipes = await fetch(`http://3.1.13.186:3030/api/search/?q=${search_keyword}`)
        const recipes = await fetchRecipes.json();
        return recipes;       
    } catch(error){
        console.log('getRecipesSearch', error);
    }
};

// Recipes by Category
export const getRecipesByCategory = async function(category){
    try{
        const fetchRecipes = await fetch(`http://3.1.13.186:3030/api/categorys/recipes/${category}`)
        const recipes = await fetchRecipes.json();
        return recipes;       
    } catch(error){
        console.log('getRecipesByCategory', error);
    }
};

// Latest Recipes
export const getLatestRecipes = async function(){
    try{
        const fetchRecipes = await fetch('http://3.1.13.186:3030/api/recipes')
        const recipes = await fetchRecipes.json();
        return recipes;       
    } catch(error){
        console.log('getLatestRecipes', error);
    }
};

// Detail Recipe
export const getDetailRecipe = async function(food){
    try{
        const fetchRecipe = await fetch(`http://3.1.13.186:3030/api/recipe/${food}`)
        const recipe = await fetchRecipe.json();
        return recipe;       
    } catch(error){
        console.log('getDetailRecipe', error);
    }
};

// Articles by Category
export const getArticlesByCategory = async function(category){
    try{
        const fetchArticles = await fetch(`http://3.1.13.186:3030/api/categorys/article/${category}`)
        const articles = await fetchArticles.json();
        return articles;       
    } catch(error){
        console.log('getArticlesByCategory', error);
    }
};


// Article Detail
export const getDetailArticle = async function(category, title){
    try{
        const fetchArticle = await fetch(`http://3.1.13.186:3030/api/article/${category}/${title}`)
        const article = await fetchArticle.json();
        return article;       
    } catch(error){
        console.log('getDetailArticle', error);
    }
};

// Create recipes cards
export function createRecipeCard(recipe, search=false){
    const elCol = document.createElement('div');
    const elCard = document.createElement('div');
    const elCardImg = document.createElement('img');
    const elCardBody = document.createElement('div');
    const elCardTitle = document.createElement('h5');
    const elCardTextRow = document.createElement('div');
    const elCardTextFirstCol = document.createElement('div');
    const elCardTextFirstFContent = document.createElement('i');
    const elCardTextFirstSContent = document.createElement('small');
    const elCardTextSecondCol = document.createElement('div');
    const elCardTextSecondFContent = document.createElement('i');
    const elCardTextSecondSContent = document.createElement('small');
    const elCardTextThirdCol = document.createElement('div');
    const elCardTextThirdFContent = document.createElement('i');
    const elCardTextThirdSContent = document.createElement('small');
    const elBtn = document.createElement('a');

    elCol.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'my-3');
    elCard.classList.add('card', 'text-center', 'h-100', 'w-100');
    elCardImg.classList.add('card-img-top');
    elCardBody.classList.add('card-body');
    elCardTitle.classList.add('card-title');
    elCardTextRow.classList.add('row', 'card-text');
    elCardTextFirstCol.classList.add('col');
    elCardTextFirstFContent.classList.add('fas', 'fa-star');
    elCardTextSecondCol.classList.add('col');
    elCardTextSecondFContent.classList.add('fas', 'fa-hourglass-half');
    elCardTextThirdCol.classList.add('col');
    elCardTextThirdFContent.classList.add('fas', 'fa-concierge-bell');
    elBtn.classList.add('btn');
    
    elCardImg.src = recipe.thumb;
    elCardTitle.innerText = recipe.title;
    if(search===false){
        elCardTextFirstSContent.innerText = ` ${recipe.dificulty}`;
        elCardTextThirdSContent.innerText = ` ${recipe.portion}`;
    } else{
        elCardTextFirstSContent.innerText = ` ${recipe.difficulty}`;
        elCardTextThirdSContent.innerText = ` ${recipe.serving}`;
    }
    elCardTextSecondSContent.innerText = ` ${recipe.times}`;
    elBtn.href = `/resep-detail.html?food=${recipe.key}&thumb=${recipe.thumb}`;
    elBtn.innerText = 'Dapatkan Resep';

    elCardTextFirstCol.appendChild(elCardTextFirstFContent);
    elCardTextFirstCol.appendChild(elCardTextFirstSContent);    
    elCardTextSecondCol.appendChild(elCardTextSecondFContent);
    elCardTextSecondCol.appendChild(elCardTextSecondSContent);
    elCardTextThirdCol.appendChild(elCardTextThirdFContent);
    elCardTextThirdCol.appendChild(elCardTextThirdSContent);
    elCardTextRow.appendChild(elCardTextFirstCol);
    elCardTextRow.appendChild(elCardTextSecondCol);
    elCardTextRow.appendChild(elCardTextThirdCol);
    
    elCardBody.appendChild(elCardTitle);
    elCardBody.appendChild(elCardTextRow);
    elCardBody.appendChild(elBtn);

    elCard.appendChild(elCardImg);
    elCard.appendChild(elCardBody);

    elCol.appendChild(elCard);
    
    return elCol;
};
