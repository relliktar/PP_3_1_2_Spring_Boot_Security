const url = "http://localhost:8080/api";
const container = document.querySelector("tbody");

const modal = new bootstrap.Modal(document.getElementById("modal"));
const newForm = document.getElementById("new");
const modalForm = document.getElementById("modalForm");
const modalId = document.getElementById("modalId");
const modalFirstName = document.getElementById("modalFirstName");
const modalLastName = document.getElementById("modalLastName");
const modalEmail = document.getElementById("modalEmail");
const modalAge = document.getElementById("modalAge");
const modalPassword = document.getElementById("modalPassword");
const modalSelect = document.getElementById("modalSelect");
const newSelect = document.getElementById("newRole");
let option = "";
let usersInTable = [];

//Дожидаемся загрузки страницы и заполняем основные элементы.
// (Таблица с пользователями, роли в формах для создания нового пользователя и модальных окон)
document.addEventListener("DOMContentLoaded", async () => {
    await fetch(url+"/user")
        .then(result => result.json())
        .then(user =>{
            document.getElementById("infoPanelName").append(user.username);
            document.getElementById("infoPanelRoles").append(user.roles.map(role => " " + role.name.replace('ROLE_', '')));
        })
    await fetch(url + "/roles")
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                if(role.name==="ROLE_USER"){ selectedRole = true;}
                newSelect.append(new Option(role.name, role.id, false, selectedRole));
                modalSelect.append(new Option(role.name, role.id, false, false));

            });
        })
    newSelect.setAttribute("size", "" + newSelect.options.length);
    modalSelect.setAttribute("size", "" + modalSelect.options.length);
    await reloadTable();
});

// Метод для заполнения таблицы с пользователями.
async function loadUser(users) {
    usersInTable = [];
    let result = "";
    users.forEach(user => {
        usersInTable.push(user);
        result += `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${user.roles.map(role => " " + role.name.replace('ROLE_', ''))}</td>
                        <td><a class="buttonEdit btn btn-info btn-sm">Edit</a></td>
                        <td><a class="buttonDelete btn btn-danger btn-sm">Delete</a></td>
                    </tr>`;
    });
    return result;
}
// Заполняем форму модального окна данными из выбранной строки
async function fillForm(line) {
    modalId.value = line.children[0].innerHTML;
    let user = usersInTable.find(usr => usr.id == modalId.value);
    modalFirstName.value = user.username;
    modalLastName.value = user.lastName;
    modalAge.value = user.age;
    modalEmail.value = user.email;
    modalPassword.value = user.password;
    for (let i = 1; i < modalSelect.options.length; i++) {
        modalSelect.options[i].selected = false;
        user.roles.forEach(role => {
            if (modalSelect.options[i].innerHTML === role.name) {
                modalSelect.options[i].selected = true;
            }
        });
    }
}

// Реагируем на нажатие кнопок в таблице
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
}

// Форматируем модальное окно для удаления пользователя.
on(document, "click", ".buttonDelete", async e => {
    const line = e.target.parentNode.parentNode;
    await fillForm(line);
    modalFirstName.setAttribute("disabled", "");
    modalLastName.setAttribute("disabled", "");
    modalAge.setAttribute("disabled", "");
    modalEmail.setAttribute("disabled", "");
    document.getElementById("passwordDiv").setAttribute("hidden", "");
    modalSelect.setAttribute("disabled", "");
    let button = document.getElementById("formButton");
    button.className = "btn";
    button.classList.add("btn-danger")
    button.value = "Delete";
    option = "delete";
    modal.show();
});

// Форматируем модальное окно для обновления пользователя
on(document, "click", ".buttonEdit", async e => {
    const line = e.target.parentNode.parentNode;
    await fillForm(line);
    modalFirstName.removeAttribute("disabled");
    modalLastName.removeAttribute("disabled");
    modalAge.removeAttribute("disabled");
    modalEmail.removeAttribute("disabled");
    document.getElementById("passwordDiv").removeAttribute("hidden");
    modalSelect.removeAttribute("disabled");
    let button = document.getElementById("formButton");
    button.className = "btn";
    button.classList.add("btn-primary")
    button.value = "Edit";
    option = "update";
    modal.show();
});

// Метод получения выбранных ролей из select
function selectedRoles(select) {
    let roles = [];
    for (let i = 1; i < select.options.length; i++) {
        if (select.options[i].selected) {
            roles.push({
                id: select.options[i].value,
                name: select.options[i].name
            });
        }
    }
    return roles;
}

// Обработка нажатия кнопки в модальном окне.
modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (option === "update") {
        let userRole = selectedRoles(modalSelect);
        fetch(url + "/saveUser/" + modalId.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: modalId.value,
                username: modalFirstName.value,
                lastName: modalLastName.value,
                age: modalAge.value,
                email: modalEmail.value,
                password: modalPassword.value,
                roles: userRole
            })
        }).then(async () => {
            await reloadTable()
        });
    }
    if (option === "delete") {
        fetch(url + "/deleteUser/" + modalId.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async () => {
            await reloadTable();
        });
    }
    modal.hide();
});

// Обработка нажатия кнопки создания нового пользователя
newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let userRole = selectedRoles(newSelect);
    fetch(url + "/saveUser/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: document.getElementById("newFirstName").value,
            lastName: document.getElementById("newLastName").value,
            age: document.getElementById("newAge").value,
            email: document.getElementById("newEmail").value,
            password: document.getElementById("newPassword").value,
            roles: userRole
        })
    }).then(result => result.json())
        .then(async () => {
            await reloadTable();
            document.getElementById("list-tab").click();
            newForm.reset();
        });
});

// Метод для получения данных с пользователями из базы и обновления таблицы на странице.
async function reloadTable() {
    await fetch(url)
        .then(result => result.json())
        .then(async users => {
            container.innerHTML = await loadUser(users);
        });
}