import{a as S,S as v,i}from"./assets/vendor-DcHCnVjq.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();const P="https://pixabay.com/api/",R="43589665-ada793faa4b6dfc005fe9b149",h=15;async function m(r,e=1){return(await S.get(P,{params:{key:R,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h,page:e}})).data}function q(){return h}const p=document.querySelector(".gallery"),a=document.querySelector(".load-more"),E=new v(".gallery a");function g(r){const e=r.map(t=>`
      <li class="gallery-item">
        <a href="${t.largeImageURL}">
          <img
            class="gallery-image"
            src="${t.webformatURL}"
            alt="${t.tags}"
          />
        </a>

        <div class="info">
          <p><b>Likes</b> ${t.likes}</p>
          <p><b>Views</b> ${t.views}</p>
          <p><b>Comments</b> ${t.comments}</p>
          <p><b>Downloads</b> ${t.downloads}</p>
        </div>
      </li>
    `).join("");p.insertAdjacentHTML("beforeend",e),E.refresh()}function x(){p.innerHTML=""}function y(){document.querySelector(".loader").classList.remove("hidden")}function L(){document.querySelector(".loader").classList.add("hidden")}function M(){a==null||a.classList.remove("hidden")}function O(){a==null||a.classList.add("hidden")}const A=M,f=O;function b(r,e){const t=q(),s=r*t>=e;if(e>0&&!s){A();return}f(),e>0&&s&&i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}const w=document.querySelector(".form"),_=document.querySelector(".load-more");let d="",c=1,l=0;w.addEventListener("submit",B);_.addEventListener("click",I);async function B(r){r.preventDefault();const e=r.target.elements["search-text"].value.trim();if(!e){i.error({message:"Please enter search text!",position:"topRight"});return}d=e,c=1,l=0,x(),f(),y();try{const t=await m(d,c),s=t.hits;if(l=t.totalHits,s.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(s),b(c,l)}catch(t){i.error({message:"Something went wrong!",position:"topRight"}),console.error(t)}finally{L()}w.reset()}async function I(){if(d){c+=1,f(),y();try{const e=(await m(d,c)).hits;if(e.length===0){i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}g(e),T(),b(c,l)}catch(r){i.error({message:"Something went wrong!",position:"topRight"}),console.error(r)}finally{L()}}}function T(){const r=document.querySelector(".gallery .gallery-item");if(!r)return;const{height:e}=r.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
