import asyncio
from typing import List
from pyppeteer import launch
import time 
import urllib.request
from moviepy.editor import *
import os
from natsort import natsorted
import json
import progressbar

class MyProgressBar():
    def __init__(self):
        self.pbar = None

    def __call__(self, block_num, block_size, total_size):
        if not self.pbar:
            self.pbar=progressbar.ProgressBar(maxval=total_size)
            self.pbar.start()

        downloaded = block_num * block_size
        if downloaded < total_size:
            self.pbar.update(downloaded)
        else:
            self.pbar.finish()
# Data to be written
def concat():
    L = []

    for root, dirs, files in os.walk("C:/Chess/video_auto/main/clips"):

        #files.sort()
        files = natsorted(files)
        for file in files:
            if os.path.splitext(file)[1] == '.webm':
                filePath = os.path.join(root, file)
                video = VideoFileClip(filePath)
                L.append(video)

    final_clip = concatenate_videoclips(L)
    final_clip.write_videofile("output.webm",bitrate="12000k")

link = "https://www.twitch.tv/directory/game/Chess/clips?range=7d"
async def scrap(i):
   # launch browser in headless mode
   browser = await launch({"headless": True, "args": ["--start-maximized"],"executablePath": '/Program Files (x86)/Google/Chrome/Application/chrome.exe'})
   # create a new page
   page = await browser.newPage()
   # set page viewport to the largest size
   # navigate to the page
   await page.goto(link, {"fullPage": True,"waitUntil": 'networkidle2'})  
   

   clip = await page.xpath("//a[@data-a-target='preview-card-image-link']")
   clip_link = await page.evaluate('e => e.href', clip[i])
   await page.goto(clip_link,{"fullPage": True,"waitUntil": 'networkidle2'})
   
   video = await page.xpath("""//*[@id="root"]/div/div[2]/div/main/div[1]/div[3]/div/div/div[2]/div/div[2]/div/div[1]/video""")
   video_link = clip_link = await page.evaluate('e => e.src', video[0])
   urllib.request.urlretrieve(video_link, f"C:/Chess/video_auto/main/clips/clip_{i}.webm",MyProgressBar()) 

for i in range(20):
   asyncio.get_event_loop().run_until_complete(
            scrap(i)
   )

concat()