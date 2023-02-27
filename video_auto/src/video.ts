
const gameLink = 'https://www.chess.com/analysis/library/PhnXZTvAi?tab=review'
const one = gameLink.split('/')
const two  = one.slice(-1)[0]
const gameId = two.split('?')[0]
const file = require(`../public/games/${gameId}.json`)
const fs = require('fs')
let arr = file.moves

export const getPos = () => {
    fs.appendFileSync(`../public/brilliant/brilliant_${gameId}.json`,`{"move":["0"`)
    for (let i = 0; i < arr.length; i++){

    if (arr[i].includes('brilliant')){
        fs.appendFileSync(`../public/brilliant/brilliant_${gameId}.json`,`,`)
        fs.appendFileSync(`../public/brilliant/brilliant_${gameId}.json`,JSON.stringify(i-1))

    }

}
fs.appendFileSync(`../public/brilliant/brilliant_${gameId}.json`,`]}`)

}
getPos()

