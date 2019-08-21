'use strict';

const rootApi = "https://api.github.com";

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for(let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li><h3><a href="${responseJson[i].url}">${responseJson[i].name}</a></h3></li>`
        )
    }
}

function getResults(query) {
    const url = rootApi + "/users/" + query + "/repos";
    console.log(url);
    fetch(url) 
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(err => $('#js-error-message').text(`Something went wrong: ${err.message}`))
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getResults(searchTerm);
    })
}

$(watchForm);