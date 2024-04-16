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

    let dataList = document.getElementById('data_list');
    dataList.innerHTML = '';

    for (let key in data){
        let li = document.createElement('li');
        li.textContent = key + ': ' + data[key];
        dataList.appendChild(li);
    }

    // hide the form
    let form = document.querySelector('form');
    form.style.display = 'none';

}