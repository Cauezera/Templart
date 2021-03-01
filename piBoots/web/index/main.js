const modalPub = document.querySelector(".modalPub")
const miniature = document.querySelectorAll(".miniature")
const cardgroup = document.querySelector(".card-group")
const recomended = document.querySelector(".recomended")
const loaderContainer = document.querySelector(".loader")

modalPub.addEventListener("click", e => {
    if (modalPub == e.target)
        modalPub.classList.add("modalPubHidden");
})

miniature.forEach((miniatureTrig) => {
    miniatureTrig.addEventListener("click", () => {
        modalPub.classList.remove("modalPubHidden");
    })
}
)

let page = 0
var idGrow = 1

const getPosts = async () => {
    const response = await fetch(`http://localhost:3333/posts?limit=6&page=${page}`)
    const espaço = `
    <div class="card-group">
        <ul class="list-group list-group-horizontal">
            <li class="recomendedLi" id="recomendedLi${idGrow}">
            </li>
    </ul>
    </div>`
    recomended.innerHTML += espaço;

    return response.json()
}



const addPostIntoDom = async () => {
    const posts = await getPosts()

    const postTemplate = await posts.map(item => 
        `
        <div class="card miniature">
        <img src="https://picsum.photos/250/150?random=${Math.random()}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${item.nome}</h5>
        <p class="card-text">nome dono</p>
        <p class="card-text"><small class="text-muted">${item.data_publicacao}</small></p>
        </div>
        </div>
        `
   )

    // var arrayResposta = await Promise.all(postTemplate)
    // arrayResposta = arrayResposta.join("")

    const li = document.querySelector(`#recomendedLi${idGrow}`)
    // li.innerHTML += arrayResposta;
    li.innerHTML += postTemplate;
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
    const isPageAlmostAtTheEnd = scrollTop + clientHeight >= scrollHeight 

    if (isPageAlmostAtTheEnd) {
        showLoader()
    }
})

function temClasse(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}
recomended.addEventListener('click', function (e) {
    if (temClasse(e.target, 'miniature')) {
        modalPub.classList.remove("modalPubHidden");
    }
});