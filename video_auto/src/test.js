const gameLink = 'https://www.chess.com/analysis/library/PhnXZTvAi?tab=review'
const one = gameLink.split('/')
const two  = one.slice(-1)[0]
const gameId = two.split('?')[0]
const moves = require(`../public/brilliant/brilliant_${gameId}.json`)



const N = 5

const moveList = Array.from({length: N}, (_, index) => index + 1).reverse();
console.log(moveList)




