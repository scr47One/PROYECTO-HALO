

const seasons = [
    {
        value: "All",
        text: "All"
    },
    {
        value: "Season1",
        text: "Season 1: Heroes of Reach Part I"
    },
    {
        value: "Season1-2",
        text: "Season 1: Heroes of Reach Part II"
    },
    {
        value: "Season2",
        text: "Season 2: Lone Wolves"
    },
    {
        value: "Season-Winter-Break-22",
        text: "Season 2: Winter Update"
    },
    {
        value: "Season3",
        text: "Season 3: Echoes Within"
    },
    {
        value: "Season4",
        text: "Season 4: Infection"
    },
    {
        value: "Season5-Op1",
        text: "Season 5: Reckoning"
    },
    {
        value: "Season6-Op1",
        text: "Season 6: Spirit of Fire"
    },
    {
        value: "Season7-Op1",
        text: "Season 7: Banished Honor"
    },
    {
        value: "Season8-Op1",
        text: "Season 8: Fleetcom"
    },
    {
        value: "Season9-Op1",
        text: "Season 9: Great Journey"
    }
];

const playlist = [
    {
        value: 'dcb2e24e-05fb-4390-8076-32a0cdb4326e',
        text: 'Slayer'
    },
    {
        value: 'edfef3ac-9cbe-4fa2-b949-8f29deafd483',
        text: 'Arena'
    }
]

const imagesURL = 'https://etxvqmdrjezgtwgueiar.supabase.co/storage/v1/object/public/assets/games/halo-infinite/metadata/multiplayer/'
const images = [
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

async function getPlayerData(nickName, season) {
    let url2 = `https://sr-nextjs.vercel.app/api/halodotapi?path=%2Fgames%2Fhalo-infinite%2Fstats%2Fmultiplayer%2Fplayers%2F${nickName}%2Fservice-record%2Fmatchmade%3Ffilter%3D${season}`
    let url = `https://sr-nextjs.vercel.app/api/halodotapi?path=%2Fgames%2Fhalo-infinite%2Fstats%2Fmultiplayer%2Fplayers%2F${nickName}%2Fcareer-rank`
    const response = await fetch(url2)
    if (!response.ok) {
        throw new Error('No se cargaron los datos correctamente')
    } else {
        const data = await response.json()
    }
}

function apiResponse(data, additional) {
    return {
        data,
        additional
    }
}

class Player {
    constructor(totalXp, remainingXpToNextLevel, nextLevelThreshold, rank, title, subtitle, imageUrls, attributes, properties) {
        this.totalXp = totalXp;
        this.remainingXpToNextLevel = remainingXpToNextLevel;
        this.nextLevelThreshold = nextLevelThreshold;
        this.rank = rank;
        this.title = title;
        this.subtitle = subtitle;
        this.imageUrls = imageUrls;
        this.attributes = attributes;
        this.properties = properties;
    }
}

class PlayerStats {
    constructor(kills, deaths, assists, betrayals, suicides, spawns, maxKillingSpree, vehicles, medals, objectivesCompleted, damageTaken, damageDealt, shotsFired, shotsHit, shotsMissed, accuracy, roundsWon, roundsLost, roundsTied, killsBreakdown, assistsBreakdown, vehiclesBreakdown, medalsBreakdown, kdr, kda, personalScore, points, modes, matches, timePlayed) {
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
        this.betrayals = betrayals;
        this.suicides = suicides;
        this.spawns = spawns;
        this.maxKillingSpree = maxKillingSpree;
        this.vehicles = vehicles;
        this.medals = medals;
        this.objectivesCompleted = objectivesCompleted;
        this.damageTaken = damageTaken;
        this.damageDealt = damageDealt;
        this.shotsFired = shotsFired;
        this.shotsHit = shotsHit;
        this.shotsMissed = shotsMissed;
        this.accuracy = accuracy;
        this.roundsWon = roundsWon;
        this.roundsLost = roundsLost;
        this.roundsTied = roundsTied;
        this.killsBreakdown = killsBreakdown;
        this.assistsBreakdown = assistsBreakdown;
        this.vehiclesBreakdown = vehiclesBreakdown;
        this.medalsBreakdown = medalsBreakdown;
        this.kdr = kdr;
        this.kda = kda;
        this.personalScore = personalScore;
        this.points = points;
        this.modes = modes;
        this.matches = matches;
        this.timePlayed = timePlayed;
    }
}


async function getTopLeaderBoards(playlist) {
    let url3 = `https://sr-nextjs.vercel.app/api/halodotapi?path=%2Fgames%2Fhalo-infinite%2Ftooling%2Fleaderboards%2Fcsr%3Fplaylist_id%3D${playlist}`
}
