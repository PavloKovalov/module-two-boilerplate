import renderers from './renderers';

const API_PROXY_URL = 'http://188.166.73.133/wg-api';

const GAME = 'wot';

export function loadUsers() {
  const username = document.querySelector('#username').value;
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`;

  // renderers.renderSpinner(renderers.resultsHolder);
  // console.log(window.fetch)
  return window.fetch(url)
         .then((response) => {
           return response.json();
         })
         .then((data) => {
           renderers.renderSearchResult(data.data);
         })
         .catch(() => {
           renderers.showError();
         });
}

export function loadUserInfo(e) {
  e.preventDefault();
  const userId = e.target.id;
  const url = `${API_PROXY_URL}/${GAME}/account/info/?application_id=demo&account_id=${userId}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      renderers.renderUserData(data.data[userId].statistics.all);
    })
    .catch(() => {
      renderers.showError();
    });
}

const loaders = {
  loadUsers,
  loadUserInfo
};

export default loaders;
