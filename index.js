import{i as a,S as d}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function h(n){return n.map(({webformatURL:o,largeImageURL:i,tags:r,likes:e,views:t,comments:s,downloads:f})=>`
        <li class="photo-card">
      <a href="${i}">
        <img src="${o}" alt="${r}" loading="lazy" />
      </a>

      <div class="info">
        <p><b>Likes</b> ${e}</p>
        <p><b>Views</b> ${t}</p>
        <p><b>Comments</b> ${s}</p>
        <p><b>Downloads</b> ${f}</p>
      </div>
        </li>
      `).join("")}const m="https://pixabay.com/api/",p="46866610-7fa4fac7b73adfddfb088af07";function g(n){const o=new URLSearchParams({key:p,q:n,image_type:"photo",orientation:"horizontal",safesearch:"true"}),i=`${m}?${o.toString()}`;return fetch(i).then(r=>{if(!r.ok)throw new Error(`Error: ${r.status}`);return r.json()}).then(r=>(r.hits.length===0&&a.error({position:"topRight",title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),r.hits)).catch(r=>{throw a.error({position:"topRight",title:"Error",message:"Error fetching images. Try again!"}),r})}const l=document.querySelector(".search-form"),c=document.querySelector(".gallery"),u=document.querySelector(".loader");let y=new d(".gallery a",{captionsData:"alt",captionDelay:250});l.addEventListener("submit",b);function b(n){n.preventDefault(),c.innerHTML="";const o=n.currentTarget.elements.query.value.trim();o.length!==0&&(L(),g(o).then(i=>{i.length>0&&(c.insertAdjacentHTML("beforeend",h(i)),y.refresh())}).catch(i=>{console.error("Error fetching images:",i),a.error({position:"topRight",title:"Error",message:"Something went wrong while fetching images. Please try again later!"})}).finally(()=>{w(),l.reset()}))}function L(){u.classList.remove("hidden")}function w(){u.classList.add("hidden")}
//# sourceMappingURL=index.js.map
