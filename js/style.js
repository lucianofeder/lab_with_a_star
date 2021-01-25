const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W E",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

let player = {
    posI: 0,
    posJ: 0,
    ArrowUp: function () {
        updatePosition(`i`, -1)
    },
    w: function () {
        updatePosition(`i`, -1)
    }, 
    ArrowDown: function () {
        updatePosition(`i`, +1)
    },
    s: function () {
        updatePosition(`i`, +1)
    },
    ArrowLeft: function () {
        updatePosition(`j`, -1)
    },
    a: function () {
        updatePosition(`j`, -1)
    },
    ArrowRight: function () {
        updatePosition(`j`, +1)
    },
    d: function () {
        updatePosition(`j`, +1)
    }

}

let end = {
    i: 0,
    j: 0
}

let start = {
    i: 0,
    j: 0
}

const isNextSqmWall = (i, j) => {
    if (map[i][j] != undefined) {
        return map[i][j] === `W`
    }
    return true
}


const updatePosition = (direction, value) => {
    let tempPlayer = {
        i: player.posI,
        j: player.posJ
    }
    tempPlayer[direction] += value
    if (!isNextSqmWall(tempPlayer.i, tempPlayer.j)) {
        updateDivClass(player.posI, player.posJ)
        player.posI = tempPlayer.i
        player.posJ = tempPlayer.j
        updateDivClass(player.posI, player.posJ)
    }
}

const updateDivClass = (i, j) => {
    let div = document.getElementById(`${i}_${j}`)
    div.classList.toggle(`S`)
}

const createDivWall = (str, div, i) => {
    for (let j = 0; j < str.length; j++) {
        let pathOrWall = document.createElement('span')
        if (str[j] === 'W') {
            pathOrWall.classList.add(`wall`)
        } else {
            pathOrWall.classList.add(`path`)
            if (str[j] === 'S') {
                pathOrWall.classList.add(str[j])
                player.posI = i
                player.posJ = j
                start.i = i
                start.j = j
            } else if (str[j] === 'E') {
                pathOrWall.classList.add(str[j])
                end.i = i
                end.j = j
            }
        }
        pathOrWall.id = `${i}_${j}`
        div.appendChild(pathOrWall)
    }
}

const createLab = () => {
    let labContainer = document.getElementById(`labContainer`)
    for (let i = 0; i < map.length; i++) {
        let divLine = document.createElement(`div`)
        divLine.id = `line-${i}`
        divLine.classList.add(`lines`)
        createDivWall(map[i], divLine, i)
        labContainer.appendChild(divLine)
    }
    // highlightAroundPlayer()
}

const isWon = () => {
    return player.posI === end.i && player.posJ === end.j
}

const resetGame = () => {
    switchPopUp()
    updateDivClass(player.posI, player.posJ)
    player.posI = start.i
    player.posJ = start.j
    updateDivClass(player.posI, player.posJ)
    // highlightAroundPlayer()
}

const switchPopUp = () => {
    let popUp = document.querySelector(`.popUp`)
    console.log(popUp)
    popUp.classList.toggle(`hidden`)
}

const highlightAroundPlayer = () => {
    let actualPosition = document.getElementsByClassName('S')[0]
    let actualPositionWindow = actualPosition.getBoundingClientRect()
    let container = document.getElementById('labContainer').getBoundingClientRect()
    let actualPositionTop = actualPositionWindow.top - container.top
    let actualPositionLeft = actualPositionWindow.left - container.left 

    let halfSquare = actualPositionWindow.width/2
    
    let centeredPosTop = actualPositionTop + halfSquare
    let centeredPosLeft = actualPositionLeft + halfSquare

    let coverDiv = document.getElementsByClassName('cover')[0]
    coverDiv.setAttribute('style',`background: radial-gradient(circle at ${centeredPosLeft}px ${centeredPosTop}px, transparent 0%, black 150px);`)

}

const mainGame = (e) => {
    let keyName = e.key
    if (player[keyName]){
        player[keyName]()
    }
    if(isWon()) {
        switchPopUp()
    }
    if(document.getElementById(`resetGame`)) {
        btnReset = document.getElementById(`resetGame`)
        btnReset.addEventListener('click', resetGame)
    }
    // highlightAroundPlayer()
}

createLab()
document.addEventListener('keydown', mainGame)