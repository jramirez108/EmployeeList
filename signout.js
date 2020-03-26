document.querySelector('#LogoutBtn').addEventListener('click', (e) => {
    firebase.auth().signOut().then(function() {
        
      }).catch(function(error) {
        // An error happened.
      });
    
})