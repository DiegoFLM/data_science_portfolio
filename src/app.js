"use strict"

function fetchComments(){
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const comment = data[0];
        document.getElementById('name-card-header').textContent = comment.name;
        document.getElementById('email-card-header').textContent = comment.email;
        document.querySelector('.card-body').innerHTML 
            = `<p>${comment.body}</p>`;
    })
    .catch(error => console.log(error));
}