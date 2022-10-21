import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    div: document.querySelector('.country-info')
};

const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function onInputValue(e) {
    let inputValue = e.target.value.trim();

    cleanInnerHTML();  

    if (inputValue === '') {
      return;
    }

    fetchCountries(inputValue)
      .then(renderCountryCard)
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
}

function renderCountryCard(country) {
    if (country.length >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.'
    );
    return;
    }

    if (country.length >= 2 && country.length < 10) {
        const cards = country.map(elem =>
            `<li><img class="img" src = ${elem.flags.svg} alt = ${elem.name} width = 50> <span class="text">${elem.name}</span> </li>`
        )
        refs.list.innerHTML = cards;
    }

    if (country.length === 1) {
        let leng = country.map(el => el.languages.map(element => element.name).join(', '))

        const card = country.map( elem =>
            `<div class="card">
            <img class="img" src = ${elem.flags.svg} alt = ${elem.name} width = 50> 
            <span class="text-title">${elem.name}</span>
            <ul>
            <li class="item"> capital: <span class="text">${elem.capital}</span></li>
            <li class="item"> population: <span class="text">${elem.population}</span></li>
            <li class="item"> languages: <span class="text">${leng}</span></li>
            </ul>
            </div>`
        )
        refs.div.innerHTML = card;
    }
}

function cleanInnerHTML() {
  refs.list.innerHTML = '';
  refs.div.innerHTML = '';
}