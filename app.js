
//UI Class
class UI {
    static displayEmployees() {
        const tableContent = document.querySelector('.employee-list');
        var user = auth.currentUser;
        console.log(user);
        db.collection('users').doc(user.uid).collection('employees').onSnapshot({includeMetadataChanges: false}, snapshot => {
            setupList(snapshot.docs);
            console.log(snapshot.docs);
        })

    function setupList(data) {
            let html = '';
            data.forEach(doc => {
                const emp = doc.data();
                const tr = `<tr>
        <td>${emp.First}</td>
        <td>${emp.Last}</td>
        <td>${emp.ID}</td>
        <td>${emp.Gender}</td>
        <td>${emp.Effective.toDate()}</td>
        <td><button type="button" class="btn btn-danger btn-sm">X</button></td>
        </tr>
        `
        tableContent.innerHTML += tr;
            })
            
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#employee-form');
        container.insertBefore(div, form);

        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

const addEmployeeBtn = document.querySelector("#employee-form");
console.log(addEmployeeBtn);

addEmployeeBtn.addEventListener('submit', (e) =>{
    
    e.preventDefault();
    db.collection('users').doc(auth.currentUser.uid).collection('employees').add({
        First: addEmployeeBtn['firstName'].value,
        Last: addEmployeeBtn['lastName'].value,
        Gender: addEmployeeBtn['EmpID'].value,
        ID: addEmployeeBtn['EmpGender'].value, 
        Effective: firebase.firestore.Timestamp.now()
    }).then(() => {
    addEmployeeBtn.reset();
    $('#addEmpModal').modal('toggle');
    })
    
});


auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log('User is currently logged in');
        console.log(user.email);
        var list = document.querySelector('.navbar-nav');
        showNavbarItems(user);
        showContent(user);
        UI.displayEmployees();
    } else {
        console.log('User not logged in');
        showNavbarItems();
        showContent();
    }
})

function showContent(user) {
    if (user) {
        var x = document.querySelector('.hidden-content');
        x.style.display = "block";
    } else {
        var x = document.querySelector('.hidden-content');
        x.style.display = "none";

    }
}

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

function showNavbarItems(user) {
    if (user) {
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}