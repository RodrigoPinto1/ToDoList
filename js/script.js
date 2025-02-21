addBtn = document.getElementById('addBtn');
task = document.getElementById('input');
taskList = document.getElementById('list');
notification = document.getElementById('notification'); // Obter o elemento de notificação
searchInput = document.getElementById('search');
searchBtn = document.getElementById('searchBtn');

function showNotification(message, type) {
    notification.textContent = message;
    notification.className = 'notification ' + type; // Adicionar a classe de tipo (success ou error)
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function deleteTask() {
    this.parentNode.parentNode.remove();
    showNotification('Task deleted successfully', 'success'); // Mostrar notificação de sucesso
}

function editTask() {
    var li = this.parentNode.parentNode;
    var span = li.querySelector('span');
    var text = span.textContent;

    // Criar um campo de entrada para edição
    var input = document.createElement('input');
    input.type = 'text';
    input.value = text;
    input.className = 'editInput';

    // Substituir o texto da tarefa pelo campo de entrada
    li.insertBefore(input, span);
    li.removeChild(span);

    // Criar um botão de salvar
    var saveBtn = document.createElement('button');
    saveBtn.className = 'saveBtn';
    saveBtn.textContent = 'Save';

    // Adicionar evento de clique ao botão de salvar
    saveBtn.addEventListener('click', function () {
        var newText = input.value;
        if (newText) {
            span.textContent = newText;
            li.insertBefore(span, input);
            li.removeChild(input);
            saveBtn.remove(); // Remover o botão de salvar após salvar a edição
            showNotification('Task edited successfully', 'success'); // Mostrar notificação de sucesso
        }
    });

    // Adicionar o botão de salvar ao contêiner de botões
    var btnContainer = this.parentNode;
    btnContainer.appendChild(saveBtn);
}

function toggleTaskCompletion() {
    var li = this.parentNode.parentNode;
    var btnComplete = this;
    li.classList.toggle('completed');
    if (li.classList.contains('completed')) {
        btnComplete.classList.add('completed');
        btnComplete.innerHTML = '<i class="fa-solid fa-check"></i>';
        showNotification('Task marked as completed', 'success');
    } else {
        btnComplete.classList.remove('completed');
        btnComplete.innerHTML = '<i class="fa-solid fa-times"></i>';
        showNotification('Task marked as not completed', 'success');
    }
}

addBtn.addEventListener('click', function addTask() {
    if (task.value === '') {
        showNotification('Please enter a task', 'error'); // Mostrar notificação de erro
    } else {
        var li = document.createElement('li');
        var span = document.createElement('span');
        span.textContent = task.value;

        var btnContainer = document.createElement('div'); // Criar um contêiner para os botões
        btnContainer.className = 'btnContainer'; // Adicionar uma classe ao contêiner

        var btnEdit = document.createElement('button'); // Criar o botão de edição
        btnEdit.className = 'editBtn'; // Adicionar a classe editBtn ao botão de edição
        var pencil = document.createElement('i');
        pencil.className = 'fa-solid fa-pencil';
        btnEdit.appendChild(pencil);

        var btnDelete = document.createElement('button');
        btnDelete.className = 'deleteBtn';
        var iconDelete = document.createElement('i');
        iconDelete.className = 'fa-solid fa-trash';
        btnDelete.appendChild(iconDelete);

        var btnComplete = document.createElement('button'); // Criar o botão de completar
        btnComplete.className = 'completeBtn'; // Adicionar a classe completeBtn ao botão de completar
        var iconComplete = document.createElement('i');
        iconComplete.className = 'fa-solid fa-times'; // Ícone inicial como "X"
        btnComplete.appendChild(iconComplete);

        btnDelete.addEventListener('click', deleteTask); // Adicionar evento de clique ao botão de delete
        btnEdit.addEventListener('click', editTask); // Adicionar evento de clique ao botão de edição
        btnComplete.addEventListener('click', toggleTaskCompletion); // Adicionar evento de clique ao botão de completar

        btnContainer.appendChild(btnEdit);
        btnContainer.appendChild(btnDelete);
        btnContainer.appendChild(btnComplete);

        li.appendChild(span);
        li.appendChild(btnContainer); // Adicionar o contêiner ao item da lista
        taskList.appendChild(li);
        task.value = '';
        showNotification('Task added successfully', 'success'); // Mostrar notificação de sucesso
    }
});

searchInput.addEventListener('input', function searchTask() {
    var filter = searchInput.value.toLowerCase();
    var tasks = taskList.getElementsByTagName('li');

    Array.from(tasks).forEach(function (task) {
        var taskText = task.querySelector('span').textContent;
        if (taskText.toLowerCase().indexOf(filter) > -1) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
});