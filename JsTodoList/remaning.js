
const todoItemsList = document.querySelector('.todo-items');
const completed = JSON.parse(localStorage.getItem('todos'));
  
console.log(completed);

const result = completed.filter((value) => {
    return value.completed == false;

});




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

rendertodos(result)
console.log(result)