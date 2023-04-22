const info = require(`../public/myfile.json`)
const lol = info.brilliant_pos.length -1 
const first = info.brilliant_pos[lol] 
const last = info.moves.length
const sounds = info.soundFile[50]
const lge = info.soundFile.length
const n = 110
console.log(lol,first)