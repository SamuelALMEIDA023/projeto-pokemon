//Scripts do slide principal
  var slide_hero = new Swiper(".slide-hero", {
    effect: 'fade',
    pagination: {
      el: ".slide-hero .main-area .area-explore .swiper-pagination",
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


const btnSelectCustom = document.querySelector('.js-open-select-custom');

btnSelectCustom.addEventListener('click', () => {
  btnSelectCustom.parentElement.classList.toggle('active')
})

function openSelectCustom() {
  document.documentElement.classList.add('open-select')
}



