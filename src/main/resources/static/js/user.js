const url = "http://localhost:8080/api";
const container = document.querySelector("tbody");

document.addEventListener("DOMContentLoaded", async () => {
    await fetch(url + "/user")
        .then(result => result.json())
        .then(user => {
            document.getElementById("infoPanelName").append(user.username);
            document.getElementById("infoPanelRoles").append(user.roles.map(role => " " + role.name.replace('ROLE_', '')));
            container.innerHTML = `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${user.roles.map(role => " " + role.name.replace('ROLE_', ''))}</td>
                    </tr>
                   `;
        })

});
