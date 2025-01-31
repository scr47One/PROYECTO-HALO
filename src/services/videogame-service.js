import { Videogame } from "../model/videogame.js";

export class VideogameService {
    constructor() {
        this.url = "../services/providers/local/videogames.json"
    }

    /**
     * @returns {Promise<Videogame[]>} videogames
     */
    async getVideogames() {
        let videogames = []
        try {
            const response = await fetch(this.url)
            if (!response.ok) {
                throw new Error('No se cargaron los datos correctamente')
            } else {
                const data = await response.json()
                videogames = data.map(videogame => {
                    return new Videogame({ ...videogame })
                });
            }
        } catch (e) {
            console.error(e)
        } finally {
            return videogames
        }
    }
}