const card = document.getElementsByClassName("card");
const profButton = document.getElementById("profButton");
const homeButton = document.getElementById("homeButton");
const exitButton = document.getElementById("exitButton");
const uploadButton = document.getElementById("uploadButton")
const modalUpload = document.getElementsByClassName("modalUpload");
const inputs = document.getElementsByClassName("form-control");
const pubButton = document.querySelector(".pubButton");
const uploadInput = document.getElementById("custom-file-input");
const formPost = document.querySelector("#upload-post")
const excludeBt = document.querySelector("#excludeButton")

const user = JSON.parse(localStorage.getItem("@Templart:userData"))

profButton.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/profile/profile.html";
})

homeButton.addEventListener("click", () => {
    window.location.href = "http://localhost:5500/index";
})

exitButton.addEventListener("click", () => {
    localStorage.clear();
    setTimeout(() => {
    window.location.href = "http://127.0.0.1:5500/login/login.html"
    }, 1000)
})

uploadButton.addEventListener("click", async () => {
    modalUpload[0].classList.remove("modalUploadHidden");
})

modalUpload[0].addEventListener("click", e => {
    if (modalUpload[0] == e.target)
        modalUpload[0].classList.add("modalUploadHidden");
})

pubButton.addEventListener("click", async () => {
    // alert(user.id);
    const response = await fetch(`http://localhost:3333/posts/${user.id}?nome=${inputs[0].value}&descricao=${inputs[1].value}`, { method: 'POST' });
    const post = await response.json();
   alert(post);
    
    
    
    alert("Publicação realizada com sucesso.");
    modalUpload[0].classList.add("modalUploadHidden");
    for (let i = 0; i < inputs.length; i++) {
        (inputs[i].value = "")
    }
    const upload = await fetch('http://localhost:3333/upload/' + post.id, {
        method: "POST",
        body: new FormData(formPost)
    })
    const respostaUpload = await upload.json();
})


// excludeBt.addEventListener("click", () => {
//     window.location.href = "http://127.0.0.1:5500/login/login.html"
// })

