// var add = document.getElementById('add_contain');
// var button = document.getElementById('btn');
// var input = document.getElementById('input');
// // console.log(input.value);
// var checkBox = document.getElementsByClassName('my-class');


const todoForm = document.querySelector('.todo-form');

const todoInput = document.querySelector('.todo-input');


const todoItemsList = document.querySelector('.todo-items');





var todos = [];


todoForm.addEventListener('submit', (e) => {

    e.preventDefault();
    addTodo(todoInput.value);

     
});


function addTodo(item) {
    if (item.trim() !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

       
        todos.push(todo);
         addToLocalStrg(todos)
       
    } else {
        alert("you have not enter any TODOs Item")
    }

    todoInput.value = '';

}


function rendertodos(todos) {
    todoItemsList.innerHTML = '';

    todos.forEach(function (item) {
        const checked = item.completed ? 'checked' : null;

        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);

        if (item.completed == true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked} >
        ${item.name}
        <button class="delete-button"> X </button>
        
        `;

        todoItemsList.append(li);
       
        // addToLocalStrg(todos);

    })
};


function addToLocalStrg(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    rendertodos(todos);
    
}

function getFormLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        rendertodos(todos);
    }

}



function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStrg(todos);

}


function deleteTodo(id) {
    todos = todos.filter(function (item) {

        
        return item.id != id;
    });

    addToLocalStrg(todos);
}


getFormLocalStorage();


todoItemsList.addEventListener('click', function (event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    // check if that is a delete -button

    if (event.target.classList.contains('delete-button')) {

        deleteTodo(event.target.parentElement.getAttribute('data-key'));
        
    }
    
});



// search......
var ref = JSON.parse(localStorage.getItem('todos'));

var search = document.getElementById("search-box");


document.getElementById('search-button').addEventListener('click', () => {


    var  searchValue= ref.filter((val) => {
    return val.name === search.value;
    })
    
    if (searchValue.length == 0) {

        rendertodos(todos);
    }
    else {
        rendertodos(searchValue);
    }

    
})









// var file_list = document.querySelector(".file-list");
// var file_list1 = document.querySelector(".file-list1");
// var file_list2 = document.querySelector(".file-list2");
// console.log(file_list)
// var home = document.querySelector(".home");

// var complete = document.querySelector(".complete");

// var remaning = document.querySelector(".remaning");




// complete.addEventListener('click', () => {
//     file_list.style.display = 'none';
//       file_list1.style.display = 'block';
    
// })



// function addfn(data) {

//     console.log(add.innerHTML)
//     add.innerHTML = '';
//     addToLocalStorage(data);



    // data.forEach((value) => {
    //     console.log(value);
      
    //     para = document.createElement('div');
    //     para.className = 'my-class';

    //     para.innerHTML = `
    //         <p> ${value.input}</p>
    //             <input type="checkbox" id="data-${value.id}"  name="myCheckbox">
    //             `
    //       add.appendChild(para); 

    //   })
    
// }









