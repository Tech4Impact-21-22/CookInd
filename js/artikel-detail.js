import { getDetailArticle } from "./index.js";

// Get params
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Take elements from HTML
const elArticleTitle = document.querySelector('#article-title');
const elArticleAuthorDate = document.querySelector('#author-date');
const elArticleThumb = document.querySelector('#article-thumb');
const elDetailArticle = document.querySelector('#detail');
const elLoading = document.querySelector('#loading');
const elContent = document.querySelector('#content');

// Render elements
const renderArticleDetail = async function(){
    try{
        let articleDetail = await getDetailArticle(params.category, params.key);
        elArticleTitle.innerText = articleDetail.results.title;
        elArticleAuthorDate.innerText =`${articleDetail.results.author} | ${articleDetail.results.date_published}`
        elArticleThumb.src = articleDetail.results.thumb;       
        let regex = /<.+>/i
        elDetailArticle.innerText = articleDetail.results.description.replace(regex, '');;        
        elLoading.classList.add('d-none')
        elContent.classList.remove('d-none')
    } catch(error){
        console.log(error)
    }
};

renderArticleDetail();