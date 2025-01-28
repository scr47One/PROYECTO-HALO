class Player {
    constructor(gamertag, totalXp, remainingXpToNextLevel, nextLevelThreshold, rank, title, subtitle, icon, adornmentIcon, largeIcon, grade, tier, type, threshold, colorPrimary, colorSecondary) {
        this.gamertag = gamertag;
        this.totalXp = totalXp;
        this.remainingXpToNextLevel = remainingXpToNextLevel;
        this.nextLevelThreshold = nextLevelThreshold;
        this.rank = rank;
        this.title = title;
        this.subtitle = subtitle;
        this.adornmentIcon = adornmentIcon
        this.icon = icon
        this.largeIcon = largeIcon
        this.grade = grade;
        this.tier = tier;
        this.type = type;
        this.threshold = threshold;
        this.colorPrimary = colorPrimary
        this.colorSecondary = colorSecondary
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

class LeaderBoardPlayer {
    constructor(gamertag, gamerpicUrl, rank, score) {
        this.gamertag = gamertag;
        this.gamerpicUrl = gamerpicUrl;
        this.rank = rank;
        this.score = score;
    }
}

export { Player, PlayerStats, LeaderBoardPlayer };