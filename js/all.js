"use strict";var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .main-area .area-explore .swiper-pagination"}}),cardPokemon=document.querySelectorAll(".js-open-details-pokemon"),closeModal=document.querySelector(".js-close-details-modal");function openDetailsModal(){document.documentElement.classList.add("open-modal")}function closeDetailsModal(){document.documentElement.classList.remove("open-modal")}cardPokemon.forEach(function(e){e.addEventListener("click",openDetailsModal)}),closeModal.addEventListener("click",closeDetailsModal);var btnSelectCustom=document.querySelector(".js-open-select-custom");function openSelectCustom(){document.documentElement.classList.add("open-select")}btnSelectCustom.addEventListener("click",function(){btnSelectCustom.parentElement.classList.toggle("active")});