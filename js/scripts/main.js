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

const areaPokemon = document.getElementById('js-card')

function firstLetterUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createCardPokemon(nome, code, imagePok, type) {
  let card = document.createElement('button');
  card.classList = `card-pokemon js-open-details-pokemon ${type}`;
  areaPokemon.appendChild(card);

  let image = document.createElement('div');
  image.classList = 'image';
  card.appendChild(image);

  let imageSrc = document.createElement('img');
  imageSrc.classList = 'thumb-img'
  imageSrc.setAttribute('src', imagePok);
  image.appendChild(imageSrc);

  let infoCard = document.createElement('div');
  infoCard.classList = 'info';
  card.appendChild(infoCard);

  let txtCard = document.createElement('div');
  txtCard.classList = 'txt';
  infoCard.appendChild(txtCard);

  let span = document.createElement('span');
  span.textContent = (code < 10) ? `#00${code}` :  (code < 100) ?  `#0${code}` : `#${code}`;
  txtCard.appendChild (span);

  let name = document.createElement('h3');
  name.textContent = firstLetterUppercase(nome);
  txtCard.appendChild((name));

  let areaIcon = document.createElement('div');
  areaIcon.classList = 'icon';
  infoCard.appendChild(areaIcon);

  let imgIcon = document.createElement('img');
  imgIcon.setAttribute('src', `assets/icon-types/${type}.svg`)
  infoCard.appendChild(imgIcon);
}

function listaPokemons(urlApi) {
  axios({
    method:'GET',
    url: urlApi
  })
  .then((Response) => {
    const contador = document.getElementById('js-count-pokemons');
    const { results, next, count } = Response.data;
    
    contador.innerText = count;

    console.log(results)

    results.forEach(pokemon => {
      let apiDetails = pokemon.url;

      axios({
        method:'GET',
        url: `${apiDetails}`
      })
      .then(Response => {
        const { name, id, sprites, types } = Response.data;

        const infoCard = {
          nome: name, 
          code: id, 
          image: sprites.other.dream_world.front_default,
          type: types[0].type.name
        }

        createCardPokemon(infoCard.nome, infoCard.code, infoCard.image, infoCard.type);

        const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');

        cardPokemon.forEach(card => {
          card.addEventListener('click', openDetailsPokemon)
        })
      })
    })
  })
}

listaPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset`)

function openDetailsPokemon() {
  document.documentElement.classList.add('open-modal');
}

// Aqui é onde desativa e habilita a área pesquisa 

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');


searchInput.addEventListener('input', function() {
  searchButton.disabled = !searchInput.value.trim();
});

// Script para listar todos os tipos de Pokemon

const areaList = document.getElementById('js-type-area');
const areaListMobile = document.querySelector('.dropdown-select');

axios({
  method:"GET",
  url:`https://pokeapi.co/api/v2/type`
})
.then(Response => {
  const { results } = Response.data;

  results.forEach((type, index) => {

    if(index < 18) {
     let itemType = document.createElement('li');
     areaList.appendChild(itemType);

     let buttonType = document.createElement('button');
     buttonType.classList = `type-filter ${type.name}`
     itemType.appendChild(buttonType)

     let iconType = document.createElement('div');
     iconType.classList ='icon'
     buttonType.appendChild(iconType);

     let srcType = document.createElement('img');
     srcType.setAttribute('src', `assets/icon-types/${type.name}.svg`);
     iconType.appendChild(srcType)

     let nameType = document.createElement('span');
     nameType.textContent = firstLetterUppercase(type.name);
     buttonType.appendChild(nameType)

     // Area do select mobile lista de pokemons

     let itemTypeMobile = document.createElement('li');
     areaListMobile.appendChild(itemTypeMobile);

     let buttonTypeMobile = document.createElement('button');
     buttonTypeMobile.classList = `type-filter ${type.name}`
     itemTypeMobile.appendChild(buttonTypeMobile)

     let iconTypeMobile = document.createElement('div');
     iconTypeMobile.classList ='icon'
     buttonTypeMobile.appendChild(iconTypeMobile);

     let srcTypeMobile = document.createElement('img');
     srcTypeMobile.setAttribute('src', `assets/icon-types/${type.name}.svg`);
     iconTypeMobile.appendChild(srcTypeMobile)

     let nameTypeMobile = document.createElement('span');
     nameTypeMobile.textContent = firstLetterUppercase(type.name);
     buttonTypeMobile.appendChild(nameTypeMobile)
    }
  })
})

// Aqui é a funcionalidade Load More

const btnLoadMore = document.getElementById('js-btn-load-more')

let countPagination = 10;

function showMorePagination () {
  listaPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`);

  countPagination = countPagination + 9;
}

btnLoadMore.addEventListener('click', showMorePagination);
 






