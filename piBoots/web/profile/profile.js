const modalPub = document.getElementsByClassName("modalPub")
const modalPubH3 = document.querySelector("h3")
const cards = document.getElementsByClassName("card")
const profPic = document.querySelector(".profPic")
const inputProfPic = document.querySelector(".inputProfPic")
const sendProfPic = document.querySelector(".sendProfPic")
const imagemA = document.querySelector(".imagem-a")
const profName = document.querySelector(".profName")
const galery = document.querySelector(".galery")
const loaderContainer = document.querySelector(".loader")


const formProf = document.querySelector("#upload-prof-pic")

for (let index = 0; index < cards.length; index++) {
    cards[index].addEventListener("click", () => {
        modalPub[0].classList.remove("modalPubHidden");
    })
}

modalPub[0].addEventListener("click", e => {
    if (modalPub[0] == e.target)
        modalPub[0].classList.add("modalPubHidden");
})


profPic.addEventListener("click", ()=> {
        inputProfPic.dispatchEvent(new MouseEvent("click"))
})


inputProfPic.addEventListener("change", () => {
    sendProfPic.dispatchEvent(new MouseEvent("click"))
})

formPost.addEventListener("submit", ev => {
    ev.preventDefault();
})


sendProfPic.addEventListener("click", async () => {
    const data = new FormData(formProf)
    const upload = await fetch('http://localhost:3333/uplprofPic/' + user.id, {
        method: "POST",
        body: data
    })
    const respostaUpload = await upload.json();
    imagemA.src = "http://localhost:3333/profPic/" + respostaUpload.userId + "?" + Math.random()
    alert("Foto de perfil alterada com sucesso! ^^ ")
})

const st = JSON.parse(localStorage.getItem("@Templart:userData"))
const profPicaAltered = "http://localhost:3333/profPic/" + st.id;
imagemA.src = profPicaAltered
imagemA.addEventListener("error", () => imagemA.src = "../images/placeholderPic.png")
profName.innerHTML = st.nome

let page = 0
var idGrow = 1

const getPosts = async () => {
    const response = await fetch(`http://localhost:3333/profPosts?idUsuário=${st.id}&limit=6&page=${page}`)
    const espaço = `
    <div class="card-group">
        <ul class="list-group list-group-horizontal">
            <li class="recomendedLi" id="recomendedLi${idGrow}">
            </li>
    </ul>
    </div>`

    galery.innerHTML += espaço;

    return response.json()
}

const addPostIntoDom = async () => {
    const posts = await getPosts()

    const postTemplate = await posts.map(async (item) => {
        const picture = `http://localhost:3333/showUpload/${item.id}/inputThumb`
        return await `
        <div class="card miniature">
        <img src="${picture}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${item.nome}</h5>
        <p class="card-text">${st.nome}</p>
        <p class="card-text"><small class="text-muted">${item.data_publicacao}</small></p>
        </div>
        </div>
        `
        
    })

    let resposta = await Promise.all(postTemplate)
    resposta = resposta.join("")

    const li = document.querySelector(`#recomendedLi${idGrow}`)
    li.innerHTML += resposta;
    idGrow++

}

addPostIntoDom()

const getNextPosts = () => {
    page++
    addPostIntoDom()
}

const removeLoader = () => {
    setTimeout(() => {
        loaderContainer.classList.remove('show')
        getNextPosts()
    }, 1000)
}

const showLoader = () => {
    loaderContainer.classList.add('show')
    removeLoader()
}

window.addEventListener('scroll', () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageAlmostAtTheEnd = scrollTop + clientHeight >= scrollHeight - 10

    if (isPageAlmostAtTheEnd) {
        showLoader()
    }
})

function temClasse(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
galery.addEventListener('click', function (e) {
    if (temClasse(e.target, 'miniature')) {
        modalPub[0].classList.remove("modalPubHidden");
    }
});
