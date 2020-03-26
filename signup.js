//Get sign up details
document.querySelector('#signupBtn').addEventListener('click', (e) => {

    const email = document.querySelector('#userEmail').value;
    const password = document.querySelector('#userPassword').value;
    const password2 = document.querySelector('#userPassword2').value;

    if(checkPassword(password, password2)){
    auth.createUserWithEmailAndPassword(email, password).then(cred =>
        {
            return db.collection('users').doc(cred.user.uid).collection('employees').add({});
        }).catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        showAlert(errorMessage, 'danger')
        // ...
      }).then(() =>{
        $('#signUpModal').modal('toggle');
    })
    }
    })



function checkPassword(password1, password2) {  

    // If password not entered 
    if (password1 == '') 
        showAlert ("Please enter Password", 'danger'); 
          
    // If confirm password not entered 
    else if (password2 == '') 
    showAlert ("Please enter confirm Password", 'danger'); 
          
    // If Not same return False.     
    else if (password1 != password2) { 
        showAlert ("Passwords did not match, please try again", 'danger'); 
        return false; 
    } 

    // If same return True. 
    else{ 
        return true; 
    } 
} 


function showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.modal-body');
    const form = document.querySelector('#signUpForm');
    container.insertBefore(div, form);

    //Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}