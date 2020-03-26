document.querySelector('#loginBtn').addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        $('#LoginModal').modal('toggle');
    }).catch(function(error) {
        var errorMessage = error.message;
        showAlert(errorMessage, "danger");
      });  
    
})


function showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('#loginModalCont');
    const form = document.querySelector('#LoginForm');
    container.insertBefore(div, form);

    //Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 5000);
}

