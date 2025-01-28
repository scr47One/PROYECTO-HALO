let imagesURL = 'https://etxvqmdrjezgtwgueiar.supabase.co/storage/v1/object/public/assets/games/halo-infinite/metadata/multiplayer/'
let images = [
    //?width=128&height=128
    {
        value: 'medals',
        preffix: 'medals/',
        suffix: '.png'
    },
    {
        value: 'rank',
        preffix: 'csrs/',
        suffix: '.png'
    }
]

const getMedalImage = (medalId) => `${imagesURL}${images[0].preffix}${medalId}${images[0].suffix}`
const getRankImage = (rankId) => `${imagesURL}${images[1].preffix}${rankId}${images[1].suffix}`
const serviceRecord = (nickName, season) => `https://sr-nextjs.vercel.app/api/halodotapi?path=%2Fgames%2Fhalo-infinite%2Fstats%2Fmultiplayer%2Fplayers%2F${nickName}%2Fservice-record%2Fmatchmade%3Ffilter%3D${season}`
const careerRank = (nickName) => `https://sr-nextjs.vercel.app/api/halodotapi?path=%2Fgames%2Fhalo-infinite%2Fstats%2Fmultiplayer%2Fplayers%2F${nickName}%2Fcareer-rank`
const leaderBoards = (playListId) => `https://sr-nextjs.vercel.app/api/halodotapi?path=%2Fgames%2Fhalo-infinite%2Ftooling%2Fleaderboards%2Fcsr%3Fplaylist_id%3D${playListId}`


function ApiResponse(data, additional) {
    return {
        data,
        additional
    }
}

export { getMedalImage, getRankImage, serviceRecord, careerRank,leaderBoards, ApiResponse }