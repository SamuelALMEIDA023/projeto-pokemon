//Scripts do slide principal
var slide_hero = new Swiper(".slide-hero", {
    pagination: {
      el: "",
    },
  });


const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
const closeModal = document.querySelector('.js-close-details-modal');

function openDetailsModal() {
    document.documentElement.classList.add('open-modal')
}

function closeDetailsModal() {
    document.documentElement.classList.remove('open-modal')
}

cardPokemon.forEach(card => {
    card.addEventListener('click', openDetailsModal)
}) 

closeModal.addEventListener('click', closeDetailsModal);




