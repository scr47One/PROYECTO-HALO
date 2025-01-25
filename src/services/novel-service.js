import { Novel } from "../model/novel.js"

export class NovelService {
    constructor() {
        this.url = "../services/providers/local/novels.json"
    }

    /**
     * 
     * @returns {Promise<Novel[]>}: novels
     */
    async getNovels() {
        let novels = []
        try {
            const response = await fetch(this.url)
            if (!response.ok) {
                throw new Error('No se cargaron los datos correctamente')
            } else {
                const data = await response.json()
                novels = data.map(element => {
                    return new Novel({...element})
                });
            }
        } catch (e) {
            console.error(e)
        } finally {
            return novels
        }
    }
}