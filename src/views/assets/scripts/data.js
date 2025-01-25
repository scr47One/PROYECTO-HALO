import { NovelService } from "../../../services/novel-service.js";
import { VideogameService } from "../../../services/videogame-service.js";

const novelService = new NovelService()
const novels = await novelService.getNovels()

const videogamesService = new VideogameService()
const videogames = await videogamesService.getVideogames()

async function fillNovelsTable() {
    const table = document.getElementById("tableBody")

    novels.forEach(novel => {
        const row = table.insertRow()
        const title = row.insertCell(0)
        title.innerHTML = novel.title
        const author = row.insertCell(1)
        author.innerHTML = novel.author
        const plot = row.insertCell(2)
        plot.innerHTML = novel.plot
        const image = row.insertCell(3)
        const imageElement = document.createElement('img')
        imageElement.src = novel.image
        image.appendChild(imageElement)
    })
}

async function fillVideogamesSection() {
    const section = document.getElementById("videogames")

    videogames.forEach(videogame => {
        const mainSection = document.createElement('section')
        mainSection.style.backgroundImage = 'linear-gradient(to right, rgba(16, 14, 24, 1), rgba(16, 14, 24, 0.51)), url("'+videogame.cover+'")'
        mainSection.classList.add('main-section')

        const sectionContent = document.createElement('section')
        sectionContent.classList.add('section-content')
        const sectionText = document.createElement('section')
        sectionText.classList.add('section-text')
        const sectionMultimedia = document.createElement('section')
        sectionMultimedia.classList.add('section-multimedia')
        const sectionImage = document.createElement('section')
        sectionImage.classList.add('section-img')
        const sectionVideo = document.createElement('section')
        sectionVideo.classList.add('section-video')

        const title = document.createElement('h2')
        title.innerHTML = videogame.title
        mainSection.appendChild(title)

        //#region texto
        const titleTextSection = document.createElement('h3')
        titleTextSection.innerHTML = 'Trama'
        const contentTextSection = document.createElement('p')
        contentTextSection.innerHTML = videogame.plot
        sectionText.appendChild(titleTextSection)
        sectionText.appendChild(contentTextSection)
        // #endregion

        // #region multimedia
        const titleCoverSection = document.createElement('h3')
        titleCoverSection.innerHTML = 'Portada'
        const imageSection = document.createElement('img')
        imageSection.src = videogame.cover
        imageSection.alt = videogame.title + ' cover'

        sectionImage.appendChild(titleCoverSection)
        sectionImage.appendChild(imageSection)

        sectionMultimedia.appendChild(sectionImage)

        const titleTrailerSection = document.createElement('h3')
        titleTrailerSection.innerHTML = 'Video'

        const trailerSection = document.createElement('video')
        trailerSection.loop = true
        trailerSection.controls = true
        trailerSection.preload = 'metadata'
        trailerSection.classList.add('auto-play')
        trailerSection.src = videogame.trailer
        trailerSection.alt = videogame.title + ' trailer'

        sectionVideo.appendChild(titleTrailerSection)
        sectionVideo.appendChild(trailerSection)

        sectionMultimedia.appendChild(sectionVideo)
        // #endregion

        sectionContent.appendChild(sectionText)
        sectionContent.appendChild(sectionMultimedia)
        mainSection.appendChild(sectionContent)
        section.appendChild(mainSection)
    })
}

await fillVideogamesSection()
await fillNovelsTable()
