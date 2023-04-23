import asyncio
from typing import List
from pyppeteer import launch
import time 
import json
import urllib.request

f = open('C:/Chess/video_auto/main/requests.json')
data = json.load(f)
gameLink = data[0]['url']


async def get_moves():
   # launch browser in headless mode
   browser = await launch({"headless": False, "args": ["--start-maximized"],"executablePath": '/Program Files (x86)/Google/Chrome/Application/chrome.exe'})
   # create a new page
   page = await browser.newPage()
   # set page viewport to the largest size
   # navigate to the page
   await page.setViewport({"width": 1920, "height": 1080})
   await page.goto('https://www.chess.com/login_and_go?returnUrl=https://www.chess.com/', {"fullPage": True,"waitUntil": 'networkidle2'})  
   
   await page.type('#username','username')
   await page.type('#password','password')
   await page.click('#login')
   await page.setViewport({"width": 1920, "height": 1080})
   await page.goto(gameLink,{"fullPage": True,"waitUntil": 'networkidle2'})
   time.sleep(10)
   i = 0 
   allmoves = {"moves":[], "brilliant_pos":[],"soundFile":[]}
   out_file = open("C:/Chess/video_auto/public/myfile.json", "w")

   while (await page.querySelector('#board-layout-sidebar > div > div > div.game-controls-view-component > div > div:nth-child(1) > button:nth-child(4)[disabled]')==None):
       i = i + 1 
       await page.click('#board-layout-sidebar > div > div > div.game-controls-view-component > div > div:nth-child(1) > button:nth-child(4) > span')
       time.sleep(0.250)

       await page.waitForSelector('#board-layout-sidebar > div > div > div.sidebar-tab-content-component.sidebar-view-content > div > div > div.review-move-list > section.review-view-section.review-view-movelist > div > div.move-list-content > div > div > div.coach-content > div.coach-comment-component.move-feedback-box-component > div.move-feedback-box-content > div.move-feedback-box-move > div')
       board = await page.querySelector('#board-analysis-board') 
       await board.screenshot({"path":f"C:/Chess/video_auto/public/moves/move_{i}.png"})
       moves = await page.querySelector('#board-layout-sidebar > div > div > div.sidebar-tab-content-component.sidebar-view-content > div > div > div.review-move-list > section.review-view-section.review-view-movelist > div > div.move-list-content > div > div > div.coach-content > div.coach-comment-component.move-feedback-box-component > div.move-feedback-box-content > div.move-feedback-box-move')
       iconText = await page.querySelector('#board-layout-sidebar > div > div > div.sidebar-tab-content-component.sidebar-view-content > div > div > div.review-move-list > section.review-view-section.review-view-movelist > div > div.move-list-content > div > div > div.coach-content > div.coach-comment-component.move-feedback-box-component > div.move-feedback-box-content > div.move-feedback-box-move > span > span')
       movesValue = (await page.evaluate('(element) => element.textContent', moves)).strip()
       icon = await page.evaluate('(element) => element.innerHTML', iconText)

       pieces = {"knight" : "N",
          "king" : "K",
          "rook" : "R",
          "queen" : "Q",
          "bishop" : "B",
          " ": ""}
       letter = {
          "+":"check.wav",
          "x":"execute.wav",
            "-":"castle.wav",
            "#":"mate.wav",
            "":"move.wav"
       }
       #color = {"black": "Black played ","white": "White played "," ": ""}
       
       my_peice_letter = pieces[[key for key in pieces if key in icon][0]]
       final = movesValue.replace(" is an ", "").replace(" is a ", "").replace(" is ", "")
       detail = final.split(" ")[1].replace("the","last book move")
       move = final.split(" ")[0]
       
       soundLetter = letter[[key for key in letter if key in move][0]]
       allmoves["soundFile"].append(soundLetter)
       #colour = color[[key for key in color if key in icon][0]]
       finalMove = my_peice_letter.strip() +move+ ' ('+detail+')'
       print(move)
       allmoves["moves"].insert(i,finalMove)
       if "brilliant" in finalMove:
          allmoves["brilliant_pos"].append(i)

   json.dump(allmoves, out_file, indent = 6)
  

   out_file.close()
   

print("Starting...")
asyncio.get_event_loop().run_until_complete(
   get_moves()
)

