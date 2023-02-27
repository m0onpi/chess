const puppeteer = require('puppeteer');
const fs = require('fs');
    const gameLink = 'https://www.chess.com/analysis/library/PhnXZTvAi?tab=review'
    const one = gameLink.split('/')
    const two  = one.slice(-1)[0]
    const gameId = two.split('?')[0]


const getInfo = () => {
puppeteer.launch({
        headless: false,

      }).then(async browser => {
        const page = await browser.newPage()
        await page.goto('https://www.chess.com/login_and_go?returnUrl=https://www.chess.com/', {
            fullPage: true,
            waitUntil: 'networkidle2'
        });

        await page.type('#username','pi_moon')
        await page.type('#password','Playstation79')
        await page.click('#login')

        await page.goto(gameLink, {
            fullPage: true,
            waitUntil: 'networkidle2'
        })
        await page.waitForTimeout(10000)
        let i = 0;
        fs.appendFileSync(`../public/games/${gameId}.json`,`{"moves":["0"`)

        while (await page.$('#board-layout-sidebar > div > div > div.game-controls-view-component > div > div:nth-child(1) > button:nth-child(4)[disabled]')==null) {
            i ++

        await page.waitForTimeout(500)
        
        await page.click('#board-layout-sidebar > div > div > div.game-controls-view-component > div > div:nth-child(1) > button:nth-child(4) > span')
        await page.waitForSelector('#board-layout-sidebar > div > div > div.sidebar-tab-content-component.sidebar-view-content > div > div > div.review-move-list > section.review-view-section.review-view-movelist > div > div.move-list-content > div > div > div.coach-content > div.coach-comment-component.move-feedback-box-component > div.move-feedback-box-content > div.move-feedback-box-move > div')

        let moves = await page.$('#board-layout-sidebar > div > div > div.sidebar-tab-content-component.sidebar-view-content > div > div > div.review-move-list > section.review-view-section.review-view-movelist > div > div.move-list-content > div > div > div.coach-content > div.coach-comment-component.move-feedback-box-component > div.move-feedback-box-content > div.move-feedback-box-move')
        let iconText = await page.$('#board-layout-sidebar > div > div > div.sidebar-tab-content-component.sidebar-view-content > div > div > div.review-move-list > section.review-view-section.review-view-movelist > div > div.move-list-content > div > div > div.coach-content > div.coach-comment-component.move-feedback-box-component > div.move-feedback-box-content > div.move-feedback-box-move > span > span')
        let desc = await page.$('#board-layout-sidebar > div > div > div.sidebar-tab-content-component.sidebar-view-content > div > div > div.review-move-list > section.review-view-section.review-view-movelist > div > div.move-list-content > div > div > div.coach-content > div.coach-comment-component.move-feedback-box-component > div.move-feedback-box-row > div')
        const board = await page.$('#board-analysis-board') 
        await board.screenshot({path:`../public/moves/move_${i}.png`})

        let movesValue = await page.evaluate(el => el.textContent, moves)
        let icon = await page.evaluate(el => el.innerHTML, iconText)
        let descValue = await page.evaluate(el => el.textContent, desc)
        const desc1 = descValue.replace('\n','')
        const step1 = movesValue.split('\n');
        const step2 = step1.slice(-1)[0] 
        const change =  () => {
        if (icon.includes('knight')){
            return   'N'
        }else if (icon.includes('king')){
            return  'K'
        }else if (icon.includes('queen')){
            return  'Q'
        }else if (icon.includes('bishop')){
            return  'B'
        }else if (icon.includes('rook')){
            return  'R'
        }else{
            return  ''
        }
        }
        const mainStr = step2.trim()     
        const mainIcon = change()
        const mainDesc = desc1.trim()
        const main = mainIcon.concat(mainStr)

        //const file = require('./set.json')
        console.log(JSON.stringify(main))
        fs.appendFileSync(`../public/games/${gameId}.json`,`,`)
        fs.appendFileSync(`../public/games/${gameId}.json`,JSON.stringify(main))


        //console.log(main)
        //fs.writeFile('values.json',JSON.stringify(mainDesc),(err) => err && console.error(err))
        }
        fs.appendFileSync(`../public/games/${gameId}.json`,`]}`)

        await browser.close()
        


    });
}
getInfo()
module.exports = {gameId}

/*<div style={{ 
    position: "relative",
    fontFamily: fontFamily,
    fontSize: 250,          
    color: "black",
    textAlign: "center",
     
 }}>5</div>*/