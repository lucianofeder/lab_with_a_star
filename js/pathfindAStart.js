class Spot {
    constructor (i,j,isWall) {
        this.i = i
        this.j = j
        this.f = 0
        this.g = 0
        this.h = 0
        this.wall = isWall
        this.neighbors = []
        this.previous = undefined
    }

    addNeighbors(newMap) {
        if (this.i < newMap.length - 1) {
            this.neighbors.push(newMap[this.i+1][this.j])
        }
        if (this.i > 0) {
            this.neighbors.push(newMap[this.i-1][this.j])
        }
        if (this.j < newMap[0].length - 1) {
            this.neighbors.push(newMap[this.i][this.j+1])
        }
        if (this.j > 0) {
            this.neighbors.push(newMap[this.i][this.j-1])
        }
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

const drawItself = async (arr,classname) => {
    for (let i = 0; i < arr.length; i++) {
        let div = document.getElementById(`${arr[i].i}_${arr[i].j}`)
        div.classList.toggle(classname)
        await sleep(50)
    }
}

function pathfindAStar() {
    function heuristic(actualPos, end) {
        let result = Math.abs(actualPos.i - end.i) + Math.abs(actualPos.j - end.j)
        return result
    }

    function removeFromArray(arr, elt) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === elt) {
                arr.splice(i, 1)
            }
        }
    }

    let newMap = new Array(map.length)
    
    for (let j = 0; j < map.length; j++) {
        newMap[j] = new Array(map[0].length)
    }

    for (let j = 0; j < map[0].length; j++) {
        for (let i = 0; i < map.length; i++) {
            if (map[i][j] === 'W') {
                let actualValue = new Spot(i, j, true)
                newMap[i][j] = actualValue
            } else {
                let actualValue = new Spot(i, j, false)
                newMap[i][j] = actualValue
            }
            
        }
    }

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            newMap[i][j].addNeighbors(newMap)
        }
    }

    let startObj = newMap[start.i][start.j]
    let endObj = newMap[end.i][end.j]

    let openSet = []
    openSet.push(startObj)
    let closeSet = []
    let temp

    while (openSet.length > 0) {
        
        let winner = 0
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i
            }
        }

        let current = openSet[winner]

        temp = current
        if (current === endObj) {
            break
            
        }

        removeFromArray(openSet, current)
        closeSet.push(current)

        let neighbors = current.neighbors
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]
            if (!closeSet.includes(neighbor) && !neighbor.wall) {
                let tempG = current.g + 1

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG
                        neighbor.previous = current
                    }
                } else {
                    neighbor.g = tempG
                    openSet.push(neighbor)
                    neighbor.previous = current
                }

                neighbor.h = heuristic(neighbor, endObj)
                neighbor.f = neighbor.g + neighbor.h

            }
        }
        
    }

    let path = []
    path.push(temp)

    while (temp.previous) {
        path.push(temp.previous)
        temp = temp.previous
    }

    drawItself(path, 'openSet')

}