// Employee Class
class Employee {
    constructor(name, email, id){
        this.name = name;
        this.email = email;
        this.id = id;
    }
}
//UI Class
class UI{
    static displayEmployees(){
        const StoredEmp = Store.getEmps();
            

        const employees = StoredEmp;

        employees.forEach((emp) => UI.addEmployeeToList(emp));
    }

    static addEmployeeToList(emp){
        const list = document.querySelector('#employee-list');

        const row = document.createElement('tr');
        row.innerHTML= `
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.id}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteEmployee(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static clearFields(){
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#EmpID').value = '';
    }

    static showAlert(message, className){
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


//Local Storage
class Store {
    static getEmps(){
        let emps;
        if(localStorage.getItem('emps') === null){
            emps = [];
        }else{
            emps = JSON.parse(localStorage.getItem('emps'));  
        }

        return emps;
    }

    static addEmp(emp){
        const emps = Store.getEmps();
        emps.push(emp);

        localStorage.setItem('emps', JSON.stringify(emps));
    }

    static removeEmp(id){
        const emps = Store.getEmps();

        emps.forEach((emp, index) => {
            if(emp.id === id){
                emps.splice(index, 1);
            }
        });

        localStorage.setItem('emps', JSON.stringify(emps));
    }
}


//Event: display employees
document.addEventListener('DOMContentLoaded', UI.displayEmployees);

//Event: add employee
document.querySelector('#employee-form').addEventListener('submit', (e)=> {
    
    e.preventDefault();

    //get for mvalues
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const id = document.querySelector('#EmpID').value;
    
    //Validate
    if(name === '' || email === '' || id === ''){
        UI.showAlert('Please fill in all fields', 'danger');
    }
    else{
        const emp = new Employee(name, email, id);
    
        UI.addEmployeeToList(emp);

        Store.addEmp(emp);

        UI.showAlert('Employee added successfully!' , 'success');
    
        UI.clearFields();
    }  
})


//Evenet: remove employee
document.querySelector('#employee-list').addEventListener('click', (e) => {
    UI.deleteEmployee(e.target);

    Store.removeEmp(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Employee removed successfully!' , 'success');
});

