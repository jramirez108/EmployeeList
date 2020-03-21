console.log(document.querySelector('#signOutBtn'));
document.querySelector('#signOutBtn').addEventListener('click', (e) => {
    
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    
})