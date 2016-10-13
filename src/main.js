import loaders from 'js/loaders'
import renderers from 'js/renderers'

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import 'main.css'


/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/


document.addEventListener('DOMContentLoaded', () => {
    renderers.resultsHolder = document.querySelector('.search-results')
    document.querySelector('#search').onclick = loaders.loadUsers
})
