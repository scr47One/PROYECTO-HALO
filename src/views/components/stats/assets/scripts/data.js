import { LeaderBoardPlayer, Player } from "../../../../../model/player.js";
import { PlayerService } from "../../../../../services/player-service.js";
import { toastMessage } from "../../../../assets/scripts/feedback.js";

const playerService = new PlayerService()


let seasons = [
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

let playlist = [
    {
        value: 'edfef3ac-9cbe-4fa2-b949-8f29deafd483',
        text: 'Arena'
    },
    {
        value: 'dcb2e24e-05fb-4390-8076-32a0cdb4326e',
        text: 'Slayer'
    }
]

const cardContainer = document.getElementById('cardContainer');
const select = document.getElementById('gameType');

playlist.forEach(type => {
    const option = document.createElement('option')
    option.value = type.value
    option.innerText = type.text
    select.append(option)
})

const leaderBoard = document.getElementById('leaderBoard');



let currentValue = playlist[0].value;

leaderBoard.addEventListener('click', async () => {
    const option = document.getElementById('gameType');
    if (currentValue === option.value) return
    cardContainer.innerHTML = ''
    currentValue = option.value
    chargeLeaderBoard(await getPlayers())
})

async function getPlayers() {
    let players = []
    try {
        const response = await playerService.getTopLeaderBoards(currentValue)
        if (response === null) throw new Error('No se encontraron jugadores')
        players = response.slice(0, 10)
        return players
    } catch (error) {
        toastMessage(error, 'error')
    }
}

window.onload = async () => {
    chargeLeaderBoard(await getPlayers())
    toastMessage('Jugadores cargados', 'success')
}

/**
 * 
 * @param {LeaderBoardPlayer[]} players 
 */
function chargeLeaderBoard(players) {
    if (players.length > 0) {
        players.map(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card');
            playerCard.style.backgroundImage = `url(${player.gamerpicUrl})`;

            const playerBackground = document.createElement('div');
            playerBackground.classList.add('player-background');

            const playerAvatar = document.createElement('div');
            playerAvatar.classList.add('player-avatar');
            const avatarSpan = document.createElement('span');
            playerAvatar.appendChild(avatarSpan);
            avatarSpan.style.backgroundImage = `url(${player.gamerpicUrl})`;

            const playerInfo = document.createElement('div');
            playerInfo.classList.add('player-info');

            const playerGamertag = document.createElement('div');
            playerGamertag.classList.add('player-gamertag');
            playerGamertag.innerText = player.gamertag;

            const playerScore = document.createElement('div');
            playerScore.classList.add('player-score');
            playerScore.innerText = 'puntuación: ' + player.score;

            const chipGroup = document.createElement('div');
            chipGroup.classList.add('chip-group');
            const chipText = document.createElement('p');
            chipGroup.appendChild(chipText);
            chipText.innerText = '#' + player.rank;

            playerInfo.appendChild(playerGamertag);
            playerInfo.appendChild(playerScore);
            playerInfo.appendChild(chipGroup);

            playerBackground.appendChild(playerAvatar);
            playerBackground.appendChild(playerInfo);

            playerCard.appendChild(playerBackground);
            cardContainer.appendChild(playerCard);
        })
    }
}

const search = document.getElementById('search');

search.addEventListener('click', async () => {
    const input = document.getElementById('gamertagInput');
    chargePlayerCareer(await getPlayerCareerRank(input.value))
})

async function getPlayerCareerRank(gamertag) {
    let player = null
    try {
        player = await playerService.getPlayerCareerRank(gamertag)
        if (player === null || player.adornmentIcon === null) throw new Error('Jugador no encontrado')
        return player
    } catch (error) {
        toastMessage( error, 'error')
    }
}

/**
 * 
 * @param {Player} player 
 */
function chargePlayerCareer(player) {
    resetPlayerCareer()
    const background = document.getElementById("background");
    background.style.backgroundColor = player.colorPrimary;
    background.style.opacity = '1'

    const avatar = document.getElementById("avatar");
    avatar.style.backgroundImage = `url(${player.icon})`;

    const avatarContainer = document.getElementById("avatar");
    avatarContainer.style.backgroundImage = `url(${player.icon})`;

    const adornmentIcon = document.getElementById("adornmentIcon");
    adornmentIcon.src = player.adornmentIcon;

    const gamertag = document.getElementById("gamertag");
    gamertag.innerText = player.gamertag;
    const title = document.getElementById("title");
    title.innerText = 'TÍTULO: ' + player.title;
    const subtitle = document.getElementById("subtitle");
    subtitle.innerText = 'CATEGORÍA: ' + player.subtitle;
    const rank = document.getElementById("rank");
    rank.innerText = 'RANGO: ' + player.rank;

    const tier = document.getElementById("tier");
    tier.innerText = player.tier;
    tier.style.backgroundColor = player.colorSecondary;
    const type = document.getElementById("type");
    type.innerText = player.type;
    type.style.backgroundColor = player.colorSecondary;

    const level = document.getElementById("level");
    level.max = 100
    level.value = ((player.totalXp * 100) / player.nextLevelThreshold).toFixed(2)
    level.style.opacity = '1'
    const currentXp = document.getElementById("currentXp");
    currentXp.innerText = player.totalXp + ' XP';

    const xpNextLevel = document.getElementById("xpNextLevel");
    xpNextLevel.innerText = 'XP para el siguiente nivel: ' + player.remainingXpToNextLevel;

    toastMessage('Jugador cargado', 'success')
}

function resetPlayerCareer() {
    const avatar = document.getElementById("avatar");
    avatar.style.backgroundImage = 'none';

    const avatarContainer = document.getElementById("avatar");
    avatarContainer.style.backgroundImage = 'none';

    const background = document.getElementById("background");
    background.style.backgroundColor = 'none';

    const adornmentIcon = document.getElementById("adornmentIcon");
    adornmentIcon.src = 'none';

    const gamertag = document.getElementById("gamertag");
    gamertag.innerText = 'none';

    const title = document.getElementById("title");
    title.innerText = 'none';

    const subtitle = document.getElementById("subtitle");
    subtitle.innerText = 'none';

    const rank = document.getElementById("rank");
    rank.innerText = 'none';

    const tier = document.getElementById("tier");
    tier.innerText = 'none';

    const type = document.getElementById("type");
    type.innerText = 'none';

    const level = document.getElementById("level");
    level.value = 0

    const xpNextLevel = document.getElementById("xpNextLevel");
    xpNextLevel.innerText = 'none';

    background.style.opacity = '0'
    background.style.transition = 'opacity 0.5s'
}

/*
const gamertagValidation = () =>
    [
        gamertag => gamertag.length >= 3 || 'Ingresa al menos 3 caracteres',
        gamertag => /^[a-zA-Z0-9]*$/.test(gamertag) || 'Sólo se admiten letras y números'
    ]
,
        document.getElementById('gamertagError')
        ,
        document.getElementById('gamertagInput')

        gamertag.addEventListener('input', () => {
        gamertagError.innerHTML = ''
        const errorsGamertag = gamertagValidation().filter(validation => typeof validation(gamertag.value) === 'string').map(validation => validation(gamertag.value))
        gamertagError.innerHTML = errorsGamertag[0] || ''
    })
*/