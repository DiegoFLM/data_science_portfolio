"use strict"

function fetchComments(){
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const comment = data[0];
        document.getElementById('name-card-header').textContent = comment.name;
        document.getElementById('email-card-header').textContent = comment.email;
        document.querySelector('.comment-card-body').innerHTML 
            = `<p>${comment.body}</p>`;
    })
    .catch(error => console.log(error));
}


function equalizeHeights(){
    var cards = document.querySelectorAll('.project-card');
    var maxHeight = 0;

    // Reset all heights to auto to get the natural height
    cards.forEach(function(card) {
        card.style.height = 'auto';
    });

    // Determine the maximum height
    cards.forEach(function(card) {
        if (card.offsetHeight > maxHeight) {
            maxHeight = card.offsetHeight;
        }
    });

    // Set all card heights to the maximum height
    cards.forEach(function(card) {
        card.style.height = maxHeight + 'px';
    });
}

// Execute the equalizeHeights function after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', equalizeHeights);