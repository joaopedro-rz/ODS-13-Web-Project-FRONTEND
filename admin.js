document.addEventListener('DOMContentLoaded', (event) => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const searchInput = document.getElementById('search');
    const clearFormButton = document.getElementById('clearForm');
    const clearAllButton = document.getElementById('clearAll');

    let userIdCounter = 0;

    function saveUser(username, email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = {
            id: userIdCounter++,
            username,
            email,
            date: new Date().toLocaleString()
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers(users);
    }

    function renderUsers(users) {
        userList.innerHTML = '';
        users.forEach((user) => {
            const li = document.createElement('li');
            li.textContent = `${user.date} - ${user.username} - ${user.email}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => {
                deleteUser(user.id);
            };
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    }

    function deleteUser(id) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers(users);
    }

    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        renderUsers(users);
    }


    clearFormButton.addEventListener('click', () => {
        userForm.reset();
    });


    clearAllButton.addEventListener('click', () => {
        localStorage.removeItem('users');
        loadUsers();
    });


    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
        renderUsers(filteredUsers);
    });

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        saveUser(username, email);
        userForm.reset();
    });


    loadUsers();
});
