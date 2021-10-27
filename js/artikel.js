import { getArticlesByCategory, createArticleCard} from "./index.js";

// Get params
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Get elements from HTML
const elInspirasi = document.querySelector('#cardSatu');
const elGayaHidup = document.querySelector('#cardDua');
const elTips = document.querySelector('#cardTiga');
const elLoading = document.querySelector('#loading');
const elContent = document.querySelector('#content');


var kategori = document.querySelectorAll('.button-categories'); 
kategori.forEach(button => {
button.onclick = function() {
    let buttonCategory=this.dataset.category;
    renderArtikel(buttonCategory);
        }
    }
)

// Render article
const renderArtikel = async function(category= 'inspirasi-dapur'){
    try{
        let articles = await getArticlesByCategory(category);   
        for(let i=0; i<16; i++){
             let articleCard = createArticleCard(articles.results[i], category);
           if (category === 'tips-masak') {
               elTips.appendChild(articleCard);             
           } else if (category === 'makanan-gaya-hidup') { 
               elGayaHidup.appendChild(articleCard);
            } else {
                elInspirasi.appendChild(articleCard);
            }
        }        
        elLoading.classList.add('d-none');
        elContent.classList.remove('d-none');
         
    } catch(error){
        console.log(error);
    }
    };

renderArtikel();