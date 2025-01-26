import { ApiResponse, careerRank } from "./providers/remote/halo-api.js"
import { Player } from "../model/player.js"

export class PlayerService {

    async getPlayerCareerRank(nickName) {
        /**@type Player */
        let rank;
        try {
            const response = await fetch(careerRank(nickName))
            if (!response.ok) {
                throw new Error('No se cargaron los datos correctamente')
            } else {
                const {data, additional}  = await response.json()
                rank = new Player(
                    additional.params.gamertag,
                    data.level.total_xp,
                    data.level.remaining_xp_to_next_level,
                    data.level.next_level_threshold,
                    data.current.rank,
                    data.current.title,
                    data.current.subtitle,
                    data.current.image_urls.icon,
                    data.current.image_urls.adornment_icon,
                    data.current.image_urls.large_icon,
                    data.current.attributes.grade,
                    data.current.attributes.tier,
                    data.current.properties.type,
                    data.current.properties.threshold,
                    data.current.attributes.colors[0],
                    data.current.attributes.colors[1]
                )
            }
        } catch (e) {
            console.error(e)
        } finally {
            return rank
        }
    }

    async getTopLeaderBoards(playlist) {
        let url3 = `https://sr-nextjs.vercel.app/api/halodotapi?path=%2Fgames%2Fhalo-infinite%2Ftooling%2Fleaderboards%2Fcsr%3Fplaylist_id%3D${playlist}`
    }
}