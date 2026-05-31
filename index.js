import{a as S,S as v,i as s}from"./assets/vendor-DcHCnVjq.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const P="https://pixabay.com/api/",R="43589665-ada793faa4b6dfc005fe9b149",h=15;async function m(t,e=1){return(await S.get(P,{params:{key:R,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h,page:e}})).data}function q(){return h}const p=document.querySelector(".gallery"),E=new v(".gallery a");function g(t){const e=t.map(r=>`
      <li class="gallery-item">
        <a href="${r.largeImageURL}">
          <img
            class="gallery-image"
            src="${r.webformatURL}"
            alt="${r.tags}"
          />
        </a>

        <div class="info">
          <p><b>Likes</b> ${r.likes}</p>
          <p><b>Views</b> ${r.views}</p>
          <p><b>Comments</b> ${r.comments}</p>
          <p><b>Downloads</b> ${r.downloads}</p>
        </div>
      </li>
    `).join("");p.insertAdjacentHTML("beforeend",e),E.refresh()}function M(){p.innerHTML=""}function y(){document.querySelector(".loader").classList.remove("hidden")}function L(){document.querySelector(".loader").classList.add("hidden")}const b=document.querySelector(".form"),u=document.querySelector(".load-more");let l="",c=1,a=0;b.addEventListener("submit",x);u.addEventListener("click",B);async function x(t){t.preventDefault();const e=t.target.elements["search-text"].value.trim();if(!e){s.error({message:"Please enter search text!",position:"topRight"});return}l=e,c=1,a=0,M(),f(),y();try{const r=await m(l,c),i=r.hits;if(a=r.totalHits,i.length===0){s.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(i),w()}catch(r){s.error({message:"Something went wrong!",position:"topRight"}),console.error(r)}finally{L()}b.reset()}async function B(){if(l){c+=1,f(),y();try{const e=(await m(l,c)).hits;if(e.length===0){s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}g(e),$(),w()}catch(t){s.error({message:"Something went wrong!",position:"topRight"}),console.error(t)}finally{L()}}}function f(){u.classList.add("hidden")}function O(){u.classList.remove("hidden")}function w(){const t=q(),e=c*t>=a;if(a>0&&!e){O();return}f(),a>0&&e&&s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}function $(){const t=document.querySelector(".gallery .gallery-item");if(!t)return;const{height:e}=t.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
