export { fetchCountries };

const MAIN_URL = 'https://restcountries.com/v2/name'

function fetchCountries(name) {
    return fetch(`${MAIN_URL}/${name}?fields=name,capital,population,flags,languages`
    ).then(r => {
      if (!r.ok || r.status === 404) {
        throw Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
      return r.json();
    });
}
  
