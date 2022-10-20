import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    div: document.querySelector('.country-info')
};

refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function onInputValue(e) {
    let inputValue = e.target.value.trim();

    cleanHtml();  

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
        const img = country
          .map(
            elem =>
              `<li><img class="img" src = ${elem.flags.svg} alt = ${elem.name} width = 50> <span class="text-title">${elem.name}</span> </li>`
          )
          .join('');
        refs.list.innerHTML = img;
    }

    if (country.length === 1) {
        let leng = country.map(el => {
           return el.languages.map(element => element.name).join(', ')
        })

        const img = country
            .map(elem =>
            `<img class="img" src = ${elem.flags.svg} alt = ${elem.name} width = 50> 
            <span class="text-title">${elem.name}</span><br>
            <span class="title">capital:</span> <span class="text">${elem.capital}</span><br>
            <span class="title">population:</span> <span class="text">${elem.population}</span><br>
            <span class="title">languages:</span> <span class="text">${leng}</span>
            `
            )
            .join('');
    refs.div.innerHTML = img;
    }
}
function cleanHtml() {
  refs.list.innerHTML = '';
  refs.div.innerHTML = '';
}