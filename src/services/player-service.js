import { ApiResponse, careerRank, leaderBoards, serviceRecord } from "./providers/remote/halo-api.js"
import { Player, LeaderBoardPlayer, PlayerStats } from "../model/player.js"
import { toastMessage } from "../views/assets/scripts/feedback.js";

export class PlayerService {

    async getPlayerStats(nickName, season) {
        /**@type PlayerStats */
        let stats = null;
        try {
            const response = await fetch(serviceRecord(nickName, season))
            if (!response.ok) {
                throw new Error('No se cargaron los datos correctamente')
            } else {
                const {data, additional}  = await response.json()
                stats = new PlayerStats(
                    data.stats.core.summary.kills,
                    data.stats.core.summary.deaths,
                    data.stats.core.summary.assists,
                    data.stats.core.summary.betrayals,
                    data.stats.core.summary.suicides,
                    data.stats.core.summary.spawns,
                    data.stats.core.summary.max_killing_spree,
                    data.stats.core.breakdown.vehicles,
                    data.stats.core.summary.medals.total,
                    data.stats.core.summary.objectives_completed,
                    data.stats.core.damage.taken,
                    data.stats.core.damage.dealt,
                    data.stats.core.shots.fired,
                    data.stats.core.shots.hit,
                    data.stats.core.shots.missed,
                    data.stats.core.shots.accuracy,
                    data.stats.core.rounds.won,
                    data.stats.core.rounds.lost,
                    data.stats.core.rounds.tied,
                    data.stats.core.breakdown.kills,
                    data.stats.core.breakdown.assists,
                    data.stats.core.breakdown.vehicles,
                    data.stats.core.breakdown.medals,
                    data.stats.core.kdr,
                    data.stats.core.kda,
                    data.stats.core.scores.personal,
                    data.stats.core.scores.points,
                    data.stats.modes,
                    data.matches,
                    data.time_played
                )
                
            }
        } catch (e) {
            console.error(e)
        } finally {
            return stats
        }
    }

    async getPlayerCareerRank(nickName) {
        /**@type Player */
        let rank = null;
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
        /**@type LeaderBoardPlayer[] */
        let players = null;
        try {
            const response = await fetch(leaderBoards(playlist))
            if (!response.ok) {
                throw new Error('No se cargaron los datos correctamente')
            } else {
                const {data, _}  = await response.json()
                if (!data) {
                    throw new Error('No se cargaron los datos correctamente')
                } else {
                    players = data.map(element =>
                        new LeaderBoardPlayer(element.player.gamertag,element.player.gamerpic_url,element.rank, element.score)
                    )
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            return players
        }
    }

    async getPlayerRankImage(points) {
        let limit = 0;
        const rankNames = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'onyx']
        const maxLevelRank = 6
        const maxPointsPerLevel = 50
        let index = 0
        const level = (points) => {
            let level = 0;
            while (points >= limit) {
                limit += maxPointsPerLevel
                if (level >= maxLevelRank) {
                    level = 0
                    index++
                }
                level++
            }
        }
        console.log(level(points))
    }
}