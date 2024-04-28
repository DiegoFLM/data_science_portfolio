"use strict";

function sendData(event) {
    console.log("Sending data")
    event.preventDefault();
    let name = document.getElementById('name_id').value;
    let email = document.getElementById('email_id').value;
    let message = document.getElementById('message_id').value;
    let data = {
        name: name,
        email: email,
        message: message
    };

    console.log("Data to send: ")
    console.log(data)

    // Send data to the server using fetch API
    fetch('https://data-science-portfolio-server-side.vercel.app/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json()) // Convert the response to JSON
    .then(data => {
        console.log('Success on POST:', data);

        // Show confirmation message
        let confirmationMessage = document.getElementById('confirmation-message');
        confirmationMessage.style.display = 'block';

        let commentsSection = document.getElementById('comments-section');
        commentsSection.style.display = 'block';
        
        showComments();

    }).catch((error) => {
        console.error('Error:', error);
    });
}


//Hide the form
let form = document.querySelector('form');
// clear form
form.reset();
// form.style.display = 'none';


function showComments(){
    console.log("Showing comments")
    fetch('https://data-science-portfolio-server-side.vercel.app/', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success on GET:', data);

        let commentsSection = document.getElementById('comments-section');
        commentsSection.style.display = 'block';
        
        let dataTable = document.getElementById('data_table');
        dataTable.innerHTML = 
        '<tr> \
            <th>Id</th> \
            <th>Name</th> \
            <th>Email</th> \
            <th>Message</th> \
        </tr>';
        for (let comment of data){
            let tr = document.createElement('tr');
            for (let key in comment){
                let td = document.createElement('td');
                td.textContent = comment[key];
                tr.appendChild(td);
            }
            dataTable.appendChild(tr);
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}
