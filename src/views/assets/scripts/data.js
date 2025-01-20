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
        mainSection.classList.add('main-section')
        const sectionContent = document.createElement('section')
        sectionContent.classList.add('section-content')
        const sectionText = document.createElement('section')
        sectionText.classList.add('section-text')
        const sectionMultimedia = document.createElement('section')
        sectionMultimedia.classList.add('section-multimedia')
        const sectionImage = document.createElement('section')
        sectionImage.classList.add('section-image')
        const sectionVideo = document.createElement('section')
        sectionVideo.classList.add('section-video')

        const title = document.createElement('h2')
        title.innerHTML = videogame.title
        mainSection.appendChild(title)

        const titleTextSection = document.createElement('h3')
        titleTextSection.innerHTML = 'Trama'
        const contentTextSection = document.createElement('p')
        contentTextSection.innerHTML = videogame.plot

        sectionText.appendChild(titleTextSection)
        sectionText.appendChild(contentTextSection)

        sectionContent.appendChild(sectionText)
        mainSection.appendChild(sectionContent)
        section.appendChild(mainSection)
    })
}

await fillNovelsTable()
