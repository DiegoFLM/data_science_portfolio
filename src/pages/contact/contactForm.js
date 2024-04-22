function sendData(event){
    event.preventDefault(); // Prevents the page from refreshing
    let name = document.getElementById('name_id').value;
    let email = document.getElementById('email_id').value;
    let message = document.getElementById('message_id').value;

    let data = {
        name: name,
        email: email,
        message: message
    }

    let confirmationMessage = document.getElementById('confirmation_message');
    confirmationMessage.style.display = 'block';
    
    let dataTable = document.getElementById('data_table');

    let tr = document.createElement('tr');
    for (let key in data){
        let td = document.createElement('td');
        td.textContent = data[key];
        tr.appendChild(td);
    }
    dataTable.appendChild(tr);


    // hide the form
    let form = document.querySelector('form');
    form.style.display = 'none';
}