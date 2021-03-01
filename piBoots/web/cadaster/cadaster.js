const inputs = document.getElementsByClassName("form-control");
const cadButton = document.getElementById("cadBut");
const goToLog = document.querySelector(".cadaster");

goToLog.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/login/login.html";
})

cadButton.addEventListener("click", e => {
    e.preventDefault();
    void async function () {

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                return alert("Preencha todos os campos")
            }
        }
        if (!inputs[1].value.includes("@")) {
            return alert("Insira um E-mail válido.")
        }

        if (inputs[2].value !== inputs[3].value) {
            return alert("As duas senhas não coincidem.")
        }

        const response = await fetch(`http://localhost:3333/users?nome=${inputs[0].value}&email=${inputs[1].value}&senha=${inputs[2].value}`, { method: "POST" });
        const user = await response.json();
        if (user.message) {
            return alert(user.message);
        }
        alert("Cadastro realizado com sucesso.");
        window.location.href = "http://localhost:5500/login/login.html";
    }()
})



