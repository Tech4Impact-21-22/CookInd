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
        const fetchRecipes = await fetch(`https://masakapahariini-api.eddypermana.com/api/search/?q=${search_keyword}`)
        const recipes = await fetchRecipes.json();
        return recipes;       
    } catch(error){
        console.log('getRecipesSearch', error);
    }
};

// Recipes by Category
export const getRecipesByCategory = async function(category){
    try{
        const fetchRecipes = await fetch(`https://masakapahariini-api.eddypermana.com/api/categorys/recipes/${category}`)
        const recipes = await fetchRecipes.json();
        return recipes;       
    } catch(error){
        console.log('getRecipesByCategory', error);
    }
};

// Latest Recipes
export const getLatestRecipes = async function(){
    try{
        const fetchRecipes = await fetch('https://masakapahariini-api.eddypermana.com/api/recipes')
        const recipes = await fetchRecipes.json();
        return recipes;       
    } catch(error){
        console.log('getLatestRecipes', error);
    }
};

// Detail Recipe
export const getDetailRecipe = async function(food){
    try{
        const fetchRecipe = await fetch(`https://masakapahariini-api.eddypermana.com/api/recipe/${food}`)
        const recipe = await fetchRecipe.json();
        return recipe;       
    } catch(error){
        console.log('getDetailRecipe', error);
    }
};

// Articles by Category
export const getArticlesByCategory = async function(category){
    try{
        const fetchArticles = await fetch(`https://masakapahariini-api.eddypermana.com/api/categorys/article/${category}`)
        const articles = await fetchArticles.json();
        
        return articles;       
    } catch(error){
        console.log('getArticlesByCategory', error);
    }
};

// Article Detail
export const getDetailArticle = async function(category, key){
    try{
        const fetchArticle = await fetch(`https://masakapahariini-api.eddypermana.com/api/article/${category}/${key}`)
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
    const elCardTextFirstRow = document.createElement('div');
    const elCardTextFFirstCol = document.createElement('div');
    const elCardTextFFirstContent = document.createElement('i');
    const elCardTextFSecondCol = document.createElement('div');
    const elCardTextFSecondContent = document.createElement('i');
    const elCardTextFThirdCol = document.createElement('div');
    const elCardTextFThirdContent = document.createElement('i');
    
    const elCardTextSecondRow = document.createElement('div');
    const elCardTextSFirstCol = document.createElement('div');
    const elCardTextSFirstContent = document.createElement('small');
    const elCardTextSSecondCol = document.createElement('div');
    const elCardTextSSecondContent = document.createElement('small');
    const elCardTextSThirdCol = document.createElement('div');
    const elCardTextSThirdContent = document.createElement('small');


    elCol.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'my-3');
    elCard.classList.add('card', 'text-center', 'h-100', 'w-100');
    elCardImg.classList.add('card-img-top');
    elCardBody.classList.add('card-body');
    elCardTitle.classList.add('card-title');
    elCardTextFirstRow.classList.add('row', 'card-text');
    elCardTextFFirstCol.classList.add('col');
    elCardTextFFirstContent.classList.add('fas', 'fa-star');
    elCardTextFSecondCol.classList.add('col');
    elCardTextFSecondContent.classList.add('fas', 'fa-hourglass-half');
    elCardTextFThirdCol.classList.add('col');
    elCardTextFThirdContent.classList.add('fas', 'fa-concierge-bell');
    
    elCardTextSecondRow.classList.add('row', 'card-text');
    elCardTextSFirstCol.classList.add('col');
    elCardTextSSecondCol.classList.add('col');
    elCardTextSThirdCol.classList.add('col');
    
    elCardImg.src = recipe.thumb;
    elCardTitle.innerText = recipe.title;
    if(search===false){
        elCardTextSFirstContent.innerText = ` ${recipe.dificulty}`;
        elCardTextSThirdContent.innerText = ` ${recipe.portion}`;
    } else{
        elCardTextSFirstContent.innerText = ` ${recipe.difficulty}`;
        elCardTextSThirdContent.innerText = ` ${recipe.serving}`;
    }
    elCardTextSSecondContent.innerText = ` ${recipe.times}`;
    

    elCardTextFFirstCol.appendChild(elCardTextFFirstContent);
    elCardTextFSecondCol.appendChild(elCardTextFSecondContent);    
    elCardTextFThirdCol.appendChild(elCardTextFThirdContent);
    elCardTextSFirstCol.appendChild(elCardTextSFirstContent);
    elCardTextSSecondCol.appendChild(elCardTextSSecondContent);    
    elCardTextSThirdCol.appendChild(elCardTextSThirdContent);

    elCardTextFirstRow.appendChild(elCardTextFFirstCol);
    elCardTextFirstRow.appendChild(elCardTextFSecondCol);
    elCardTextFirstRow.appendChild(elCardTextFThirdCol);
    elCardTextSecondRow.appendChild(elCardTextSFirstCol);
    elCardTextSecondRow.appendChild(elCardTextSSecondCol);
    elCardTextSecondRow.appendChild(elCardTextSThirdCol);
    
    elCardBody.appendChild(elCardTitle);
    elCardBody.appendChild(elCardTextFirstRow);
    elCardBody.appendChild(elCardTextSecondRow);

    elCard.appendChild(elCardImg);
    elCard.appendChild(elCardBody);

    elCol.appendChild(elCard);

    elCol.addEventListener('click', function(e){
        e.preventDefault();
        window.location.href = `/resep-detail.html?food=${recipe.key}&thumb=${recipe.thumb}`;
    })
    return elCol;
};

//create article card
export function createArticleCard(article, category){

    const elBody = document.createElement('div');
    const elCol = document.createElement('div');
    const elCard = document.createElement('div');
    const elCardImg = document.createElement('img');
    const elCardBody = document.createElement('small');
    const elCardTitle = document.createElement('h6');

    elBody.classList.add('row', 'pt-3' , 'container')
    elCol.classList.add('col');
    elCard.classList.add('card' ,'text-center', 'h-100', 'w-100' , 'article-card');
    elCardImg.classList.add('card-img-rounded');
    elCardBody.classList.add('card-body', 'text-capitalize');
    elCardTitle.classList.add('card-title');

    elCardImg.src = article.thumb;
    elCardTitle.innerText = article.title;
    elCardBody.innerText = article.tags;

    elCardBody.appendChild(elCardTitle);
    elCard.appendChild(elCardImg);
    elCard.appendChild(elBody);
    elCol.appendChild(elCard);
    elBody.appendChild(elCardTitle);
    elBody.appendChild(elCardBody);

    elCol.addEventListener('click', function(e){
        e.preventDefault();
        window.location.href=`/artikel-detail.html?category=${category}&key=${article.key}`
    })
    return elCol;
}
