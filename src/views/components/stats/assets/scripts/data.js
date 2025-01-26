import { Player } from "../../../../../model/player.js";
import { PlayerService } from "../../../../../services/player-service.js";

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
        value: 'dcb2e24e-05fb-4390-8076-32a0cdb4326e',
        text: 'Slayer'
    },
    {
        value: 'edfef3ac-9cbe-4fa2-b949-8f29deafd483',
        text: 'Arena'
    }
]

function chargeLeaderBoard(players) {
    const cardContainer = document.getElementById('cardContainer');
    if (players.length > 0) {
        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');

        const playerBackground = document.createElement('div');
        playerBackground.classList.add('player-background');

        const playerAvatar = document.createElement('div');
        playerAvatar.classList.add('player-avatar');
        const avatarSpan = document.createElement('span');
        playerAvatar.appendChild(avatarSpan);

        const playerInfo = document.createElement('div');
        playerInfo.classList.add('player-info');

        const playerGamertag = document.createElement('div');
        playerGamertag.classList.add('player-gamertag');

        const playerScore = document.createElement('div');
        playerScore.classList.add('player-score');

        const chipGroup = document.createElement('div');
        chipGroup.classList.add('chip-group');
        const chipText = document.createElement('p');
        chipGroup.appendChild(chipText);

        playerInfo.appendChild(playerGamertag);
        playerInfo.appendChild(playerScore);
        playerInfo.appendChild(chipGroup);
        playerBackground.appendChild(playerAvatar);
        playerBackground.appendChild(playerInfo);
        playerCard.appendChild(playerBackground);

        cardContainer.appendChild(playerCard);
    }
}

const search = document.getElementById('search');

search.addEventListener('click', async () => {
    const input = document.getElementById('gamertagInput');
    const player = await playerService.getPlayerCareerRank(input.value)
    chargePlayerCareer(player)
})

/**
 * 
 * @param {Player} player 
 */
function chargePlayerCareer(player) {
    resetPlayerCareer()
    const background = document.getElementById("background");
    background.style.backgroundColor = player.colorPrimary;
    background.style.opacity = '1'
    // Para el avatar
    const avatar = document.getElementById("avatar");
    avatar.style.backgroundImage = `url(${player.icon})`;

    // Para el contenedor de íconos
    const avatarContainer = document.getElementById("avatar");
    avatarContainer.style.backgroundImage = `url(${player.icon})`;

    // Para las imágenes dentro del contenedor de íconos

    const adornmentIcon = document.getElementById("adornmentIcon");
    adornmentIcon.src = player.adornmentIcon;

    // Para los elementos de información del jugador
    const gamertag = document.getElementById("gamertag");
    gamertag.innerText = player.gamertag;
    const title = document.getElementById("title");
    title.innerText = 'TÍTULO: ' + player.title;
    const subtitle = document.getElementById("subtitle");
    subtitle.innerText = 'CATEGORÍA: ' + player.subtitle;
    const rank = document.getElementById("rank");
    rank.innerText = 'RANGO: ' + player.rank;

    // Para los chips
    const tier = document.getElementById("tier");
    tier.innerText = player.tier;
    tier.style.backgroundColor = player.colorSecondary;
    const type = document.getElementById("type");
    type.innerText = player.type;
    type.style.backgroundColor = player.colorSecondary;

    // Para los textos adicionales
    const level = document.getElementById("level");
    level.max = player.totalXp
    level.value = player.threshold
    level.style.opacity = '1'
    level.style.transition = 'opacity 0.5s'

    const xpNextLevel = document.getElementById("xpNextLevel");
    xpNextLevel.innerText = 'XP para el siguiente nivel: ' + player.remainingXpToNextLevel;
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

    level.style.opacity = '0'
    level.style.transition = 'opacity 0.5s'
    background.style.opacity = '0'
    background.style.transition = 'opacity 0.5s'
}