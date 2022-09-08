const url = "http://localhost:8080/api";

document.addEventListener("DOMContentLoaded", async () => {
    await fetch(url + "/user")
        .then(result => result.json())
        .then(user => {
            document.getElementById("infoPanelName").append(user.username);
            document.getElementById("infoPanelRoles").append(user.roles.map(role => " " + role.name.replace('ROLE_', '')));
        })

});
