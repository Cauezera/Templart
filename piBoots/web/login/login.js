const loginButton = document.getElementById("loginButton");
const inputs = document.getElementsByClassName("form-control");
const goToCadaster = document.getElementsByClassName("cadaster");

localStorage.clear();

const checkUserExistence = JSON.parse(localStorage.getItem("@Templart:userData"));


if (checkUserExistence) {
    // localStorage.clear();
    window.location.href = `http://localhost:5500/index?userId=${checkUserExistence.id}`
}

loginButton.addEventListener("click", async () => {
    const response = await fetch(`http://localhost:3333/users/login?email=${inputs[0].value}&senha=${inputs[1].value}`)

    const user = await response.text();
    if (JSON.parse(user).message) {
        alert(JSON.parse(user).message);
        inputs[0].value = "";
        inputs[1].value = "";
        return;
    }
    localStorage.setItem("@Templart:userData", user);
    window.location.href = `http://127.0.0.1:5500/index/`
})

goToCadaster[0].addEventListener("click", () => window.location.href = "http://127.0.0.1:5500/cadaster/cadaster.html")