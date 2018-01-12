console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJoke);

    $('#outputDiv').on('click', '.btn-delete', function() {
        const id = $(this).parents('.joke').data().id;
        deleteJoke(id);
    });

    $('#outputDiv').on('click', '.btn-laugh', function(){
        const joke = $(this).parents('.joke').data();
        if (joke.funniness < 8){
            updateFunniness(joke.id, joke.funniness+1);
        } else {
            console.log('Funniness can\'t go higher!');
        }
    });

    $('#outputDiv').on('click', '.btn-cry', function(){
        const joke = $(this).parents('.joke').data();
        if (joke.funniness > 1){    
            updateFunniness(joke.id, joke.funniness-1);
        } else {
            console.log('Funniness can\'t go lower!');
        }
    });
    $('#outputDiv').on ('click', '.btn-seeAll', getSingleAuthor);
    $('#seeAllJokes').on('click', getJokes);


    getJokes();

    //getJoke(1);
    //getJokesFrom('Millie');
    //updateFunniness(3, 5);
    //deleteJoke(6);
}

function addJoke() {
    // get joke data from DOM
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#question').val(),
        punchLine: $('#punchlineIn').val(),
        funniness: new Number( $('#funninessIn').val() )
    };

    console.log('add joke', newJoke);

    // ajax request
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke,
        success: function(response) {
            console.log('post response: ', response);
            // refresh joke list
            getJokes();
            // clear input after success
            resetInputFields();
        }
    })
}

function resetInputFields() {
    $('#whoseJokeIn').val('')
    $('#question').val('');
    $('#punchlineIn').val('');
    $('#funninessIn').val('');
}

function getJokes() {
    $.ajax({
        method: 'GET',
        url: '/jokes',
        success: displayAllJokes         
    });
}

function getJoke(jokeId) {
    $.ajax({
        method: 'GET',
        url: '/jokes/' + jokeId,
        success: function(response) {
            console.log('joke: ', response);            
        }
    });
}

function getJokesFrom(name) {
    $.ajax({
        method: 'GET',
        url: '/jokes/whose/' + name,
        success: function(response) {
            console.log('jokes from '+name+': ', response);            
        }
    });
}

function updateFunniness(id, newFunniness){
    $.ajax({
        method: 'PUT',
        url: '/jokes/' + id,
        data: { funniness: newFunniness },
        success: function(response) {
            console.log('update funniness response: ', response); 
            getJokes();            
        }
    });
}


function deleteJoke(id){
    $.ajax({
        method: 'DELETE',
        url: '/jokes/' + id,
        success: function(response) {
            console.log('update funniness response: ', response); 
            getJokes();           
        }
    });
}

function displayAllJokes(jokes) {
    $('#outputDiv').empty();
    for (let i=0; i < jokes.length; i++) {
        displayJoke(jokes[i]);
    
    }
    console.log(jokes);
}

function displayJoke(joke) {
    $('#outputDiv').append(`
        <div class="joke">
            <button class="btn-delete">Delete Joke</button>
            <button class="btn-seeAll">See all From Author</button>
            <h3>A Joke from ${joke.whosejoke}</h3>
            <p class="question">${joke.jokequestion}</p>
            <p class="punchline">${joke.punchline}</p>
            <div class="funniness">Funniness Rating: <span>${joke.funniness}</span>
                <button class="btn-laugh">Laugh</button>
                <button class="btn-cry">Cry</button>
            </div>
        </div>
    `);

    $('.joke:last').data(joke);
}
function getSingleAuthor() {
    var author = $(this).parents('div').data().whosejoke;
    $.ajax({
        method: 'GET',
        url: '/jokes/singleauthor/' + author,
        success: function(response){
            // console.log('get + author', response);
            displayAllJokes(response);
        }
    })
}