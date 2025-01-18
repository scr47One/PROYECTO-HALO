import { Novel } from "../model/novel.js"

export class NovelService {
    /**
     * 
     * @param {URL} url 
     */
    constructor() {
        this.url = "../services/providers/data/novels.json"
    }

    /**
     * 
     * @returns {Novel[]}: novels
     */
    async getNovels() {
        try {
            const response = await fetch(this.url)
            if (!response.ok) {
                throw new Error('No se leyeron los datos correctamente')
            } else {
                console.log(response.json())
            }
        } catch (e) {
            console.error(e)
        } finally {
            return []
        }
    }
}