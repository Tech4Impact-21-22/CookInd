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

//Error
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

//Error
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
    const elCardTextFirstRow = document.createElement('div');
    const elCardTextFFirstCol = document.createElement('div');
    const elCardTextFFirstFContent = document.createElement('i');
    const elCardTextFFirstSContent = document.createElement('small');
    const elCardTextFSecondCol = document.createElement('div');
    const elCardTextFSecondFContent = document.createElement('i');
    const elCardTextFSecondSContent = document.createElement('small');
    const elCardTextSecondRow = document.createElement('div');
    const elCardTextSFirstCol = document.createElement('div');
    const elCardTextSFirstFContent = document.createElement('i');
    const elCardTextSFirstSContent = document.createElement('small');
    const elCardTextSSecondCol = document.createElement('div');
    const elCardTextSSecondFContent = document.createElement('i');
    const elCardTextSSecondSContent = document.createElement('small');
    const elBtn = document.createElement('a');

    elCol.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'my-3');
    elCard.classList.add('card', 'text-center', 'h-100', 'w-100');
    elCardImg.classList.add('card-img-top');
    elCardBody.classList.add('card-body');
    elCardTitle.classList.add('card-title');
    elCardTextFirstRow.classList.add('row', 'card-text');
    elCardTextFFirstCol.classList.add('col');
    elCardTextFFirstFContent.classList.add('fas', 'fa-star');
    elCardTextFSecondCol.classList.add('col')
    elCardTextFSecondFContent.classList.add('far', 'fa-heart');
    elCardTextSecondRow.classList.add('row', 'card-text', 'pb-3');
    elCardTextSFirstCol.classList.add('col');
    elCardTextSFirstFContent.classList.add('fas', 'fa-hourglass-half');
    elCardTextSSecondCol.classList.add('col');
    elCardTextSSecondFContent.classList.add('fas', 'fa-concierge-bell');
    elBtn.classList.add('btn');
    
    elCardImg.src = recipe.thumb;
    elCardTitle.innerText = recipe.title;
    elCardTextFSecondSContent.innerText = " Wishlist";
    if(search===false){
        elCardTextFFirstSContent.innerText = ` ${recipe.dificulty}`;
        elCardTextSSecondSContent.innerText = ` ${recipe.portion}`;
    } else{
        elCardTextFFirstSContent.innerText = ` ${recipe.difficulty}`;
        elCardTextSSecondSContent.innerText = ` ${recipe.serving}`;
    }
    elCardTextSFirstSContent.innerText = ` ${recipe.times}`;
    elBtn.href = `/resep-detail.html?food=${recipe.key}&thumb=${recipe.thumb}`;
    elBtn.innerText = 'Dapatkan Resep';

    elCardTextFFirstCol.appendChild(elCardTextFFirstFContent);
    elCardTextFFirstCol.appendChild(elCardTextFFirstSContent);
    elCardTextFSecondCol.appendChild(elCardTextFSecondFContent);
    elCardTextFSecondCol.appendChild(elCardTextFSecondSContent);
    elCardTextFirstRow.appendChild(elCardTextFFirstCol);
    elCardTextFirstRow.appendChild(elCardTextFSecondCol);
    
    elCardTextSFirstCol.appendChild(elCardTextSFirstFContent);
    elCardTextSFirstCol.appendChild(elCardTextSFirstSContent);
    elCardTextSSecondCol.appendChild(elCardTextSSecondFContent);
    elCardTextSSecondCol.appendChild(elCardTextSSecondSContent);
    elCardTextSecondRow.appendChild(elCardTextSFirstCol);
    elCardTextSecondRow.appendChild(elCardTextSSecondCol);
    
    elCardBody.appendChild(elCardTitle);
    elCardBody.appendChild(elCardTextFirstRow);
    elCardBody.appendChild(elCardTextSecondRow);
    elCardBody.appendChild(elBtn);

    elCard.appendChild(elCardImg);
    elCard.appendChild(elCardBody);

    elCol.appendChild(elCard);
    
    return elCol;
};
