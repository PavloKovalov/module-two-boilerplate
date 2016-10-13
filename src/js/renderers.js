import loaders from './loaders';

const renderers = {
  resultsHolder: '',

  renderSpinner(domNode) {
    const node = domNode;
    node.innerHTML = 'Loading...';
  },

  renderSearchResult(accounts) {
    this.resultsHolder.innerHTML = '';

    for (const a of accounts) {
      const el = document.createElement('a');
      el.className = 'search-results_item';
      el.id = a.account_id;
      el.href = a.account_id;
      el.onclick = loaders.loadUserInfo;
      el.innerHTML = a.nickname;
      this.resultsHolder.appendChild(el);
    }
  },

  showError() {
    this.resultsHolder.innerHTML = 'Ooops. We can\'t find user';
  },

  renderUserData(data) {
    const dataHolder = document.querySelector('.user-info');

    Object.keys(data).forEach((d) => {
      if (d) {
        const el = document.createElement('div');
        el.className = 'user-info_item';
        el.innerHTML = `${d}: ${data[d]}`;
        dataHolder.appendChild(el);
      }
    });
  },
};

export default renderers;
