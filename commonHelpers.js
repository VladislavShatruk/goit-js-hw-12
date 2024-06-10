import{a as b,i as E,s as S}from"./assets/vendor-da73009b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();const q="43967749-ce2f7a1bd8d115ad659da346f",v="https://pixabay.com/api/";async function y(t,r=1,s=15){const o={key:q,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:s};try{const e=await b.get(v,{params:o});return{hits:e.data.hits,totalHits:e.data.totalHits}}catch(e){throw console.error("Error fetching images:",e),e}}let a;const f=document.getElementById("loader"),h=document.querySelector(".gallery"),g=document.querySelector(".load-more");function p(t,r=!1){const s=t.map(o=>`<li class="gallery-item">
      <a class="gallery-link" href="${o.webformatURL}">
        <img 
          class="gallery-image" 
          width="360"
          src="${o.largeImageURL}" 
          alt="${o.tags}" 
          />
          
      </a>
      <ul class='description'>
      <li><strong>Likes</strong> ${o.likes}</li>
      <li><strong>Views</strong> ${o.views}</li>
      <li><strong>Comments</strong> ${o.comments}</li>
      <li><strong>Downloads</strong> ${o.downloads}</li>
      </ul>
    </li>`).join("");r?h.insertAdjacentHTML("beforeend",s):h.innerHTML=s,H()}function l(t){E.error({title:"Error",message:t})}function L(){f.style.display="block",g.insertAdjacentElement("afterend",f)}function d(){f.style.display="none"}function B(){h.innerHTML=""}function H(){a&&a.destroy(),a=new S(".gallery a",{captionsData:"alt",captionDelay:250})}function I(){a&&a.refresh()}function $(){g.style.display="block"}function m(){g.style.display="none"}function x(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}const A=document.querySelector(".form"),M=document.querySelector(".search-img-input"),P=document.querySelector(".load-more");let c="",i=1,w=0;A.addEventListener("submit",O);P.addEventListener("click",T);async function O(t){if(t.preventDefault(),c=M.value.trim(),i=1,!c){l("Please enter a search term");return}B(),m(),L();try{const{hits:r,totalHits:s}=await y(c,i);d(),w=s,r.length===0?l("Sorry, there are no images matching your search query. Please try again!"):(p(r),r.length<15||s<=i*15?(m(),showEndMessage()):$())}catch(r){d(),l("An error occured while fetching images"),console.error(r)}}async function T(){i+=1,L();try{const{hits:t}=await y(c,i);d(),p(t,!0),I(),x(),(t.length<15||w<=i*15)&&(m(),l("We're sorry, but you've reached the end of search results."))}catch(t){d(),l("An error occured while fetching more images"),console.error(t)}}
//# sourceMappingURL=commonHelpers.js.map
