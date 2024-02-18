"use strict";var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .main-area .area-explore .swiper-pagination"}}),cardPokemon=document.querySelectorAll(".js-open-details-pokemon"),closeModal=document.querySelector(".js-close-details-modal");function openDetailsModal(){document.documentElement.classList.add("open-modal")}function closeDetailsModal(){document.documentElement.classList.remove("open-modal")}cardPokemon.forEach(function(e){e.addEventListener("click",openDetailsModal)}),closeModal.addEventListener("click",closeDetailsModal);var btnSelectCustom=document.querySelector(".js-open-select-custom");function openSelectCustom(){document.documentElement.classList.add("open-select")}btnSelectCustom.addEventListener("click",function(){btnSelectCustom.parentElement.classList.toggle("active")});var areaPokemon=document.getElementById("js-card");function firstLetterUppercase(e){return e.charAt(0).toUpperCase()+e.slice(1)}function createCardPokemon(e,t,n,o){var a=document.createElement("button"),c=(a.classList="card-pokemon js-open-details-pokemon ".concat(o),areaPokemon.appendChild(a),document.createElement("div")),i=(c.classList="image",a.appendChild(c),document.createElement("img")),n=(i.classList="thumb-img",i.setAttribute("src",n),c.appendChild(i),document.createElement("div")),c=(n.classList="info",a.appendChild(n),document.createElement("div")),i=(c.classList="txt",n.appendChild(c),document.createElement("span")),a=(i.textContent=(t<10?"#00":t<100?"#0":"#").concat(t),c.appendChild(i),document.createElement("h3")),t=(a.textContent=firstLetterUppercase(e),c.appendChild(a),document.createElement("div")),i=(t.classList="icon",n.appendChild(t),document.createElement("img"));i.setAttribute("src","assets/icon-types/".concat(o,".svg")),n.appendChild(i)}function listaPokemons(e){axios({method:"GET",url:e}).then(function(e){var t=document.getElementById("js-count-pokemons"),e=e.data,n=e.results,e=(e.next,e.count);t.innerText=e,n.forEach(function(e){e=e.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var e=e.data,t=e.name,n=e.id,o=e.sprites,e=e.types,t={nome:t,code:n,image:o.other.dream_world.front_default,type:e[0].type.name};createCardPokemon(t.nome,t.code,t.image,t.type),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})})})})}function openDetailsPokemon(){document.documentElement.classList.add("open-modal")}listaPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset");var searchInput=document.getElementById("searchInput"),searchButton=document.getElementById("searchButton"),areaList=(searchInput.addEventListener("input",function(){searchButton.disabled=!searchInput.value.trim()}),document.getElementById("js-type-area")),areaListMobile=document.querySelector(".dropdown-select"),btnLoadMore=(axios({method:"GET",url:"https://pokeapi.co/api/v2/type"}).then(function(e){e.data.results.forEach(function(e,t){var n,o;t<18&&(o=document.createElement("li"),areaList.appendChild(o),(n=document.createElement("button")).classList="type-filter ".concat(e.name),n.setAttribute("code-type",t+1),o.appendChild(n),(t=document.createElement("div")).classList="icon",n.appendChild(t),(o=document.createElement("img")).setAttribute("src","assets/icon-types/".concat(e.name,".svg")),t.appendChild(o),(t=document.createElement("span")).textContent=firstLetterUppercase(e.name),n.appendChild(t),o=document.createElement("li"),areaListMobile.appendChild(o),(n=document.createElement("button")).classList="type-filter ".concat(e.name),o.appendChild(n),(t=document.createElement("div")).classList="icon",n.appendChild(t),(o=document.createElement("img")).setAttribute("src","assets/icon-types/".concat(e.name,".svg")),t.appendChild(o),(t=document.createElement("span")).textContent=firstLetterUppercase(e.name),n.appendChild(t),document.querySelectorAll(".type-filter").forEach(function(e){e.addEventListener("click",filterByTypes)}))})}),document.getElementById("js-btn-load-more")),countPagination=10;function showMorePagination(){listaPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=".concat(countPagination)),countPagination+=9}function filterByTypes(){var e=this.getAttribute("code-type"),t=document.getElementById("js-card"),n=document.getElementById("js-btn-load-more"),o=document.getElementById("js-count-pokemons"),a=document.querySelectorAll(".type-filter");t.innerHTML="",n.style.display="none";var c=document.querySelector(".s-all-pokemon").offsetTop;window.scrollTo({top:c+288,behavior:"smooth"}),a.forEach(function(e){e.classList.remove("active")}),this.classList.add("active"),e?axios({method:"GET",url:"https://pokeapi.co/api/v2/type/".concat(e)}).then(function(e){e=e.data.pokemon;o.textContent=e.length,e.forEach(function(e){e=e.pokemon.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var e=e.data,t=e.name,n=e.id,o=e.sprites,e=e.types,t={nome:t,code:n,image:o.other.dream_world.front_default,type:e[0].type.name};t.image&&createCardPokemon(t.nome,t.code,t.image,t.type),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})})})}):(t.innerHTML="",listaPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset"),n.style.display="block")}btnLoadMore.addEventListener("click",showMorePagination);var btnSearch=document.querySelector(".js-btn-search"),inputSearch=document.querySelector(".js-input-search");function searchPokemon(){var e=inputSearch.value.toLowerCase();axios({method:"GET",url:"https://pokeapi.co/api/v2/pokemon/".concat(e)}).then(function(e){console.log(e.data)})}btnSearch.addEventListener("click",searchPokemon),inputSearch.addEventListener("keyup",function(e){"Enter"===e.code&&searchPokemon()});