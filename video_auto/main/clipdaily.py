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
import re
import cv2
import math


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
def details():
    video = cv2.VideoCapture('C:/Chess/clip_auto/public/clip.mp4')

    frame_count = video.get(cv2.CAP_PROP_FRAME_COUNT)
    fps = video.get(cv2.CAP_PROP_FPS) 
    duration = frame_count / fps
    return math.ceil(duration)

out_file = open("C:/Chess/clip_auto/public/myfile.json", "w")
creds = []
link = "https://www.twitch.tv/directory/game/Chess/clips?range=24hr"
async def scrap():
   # launch browser in headless mode
   browser = await launch({"headless": True, "args": ["--start-maximized"],"executablePath": '/Program Files (x86)/Google/Chrome/Application/chrome.exe'})
   # create a new page
   page = await browser.newPage()
   # set page viewport to the largest size
   # navigate to the page
   await page.goto(link, {"fullPage": True,"waitUntil": 'networkidle2'})  
   

   clip = await page.xpath("//a[@data-a-target='preview-card-image-link']")
   clip_link = await page.evaluate('e => e.href', clip[0])
   result = re.search('twitch.tv/(.*)/clip', clip_link)
   user = result.group(1)
   creds.append(user)
   await page.goto(clip_link,{"fullPage": True,"waitUntil": 'networkidle2'})
   
   video = await page.xpath("""//*[@id="root"]/div/div[2]/div/main/div[1]/div[3]/div/div/div[2]/div/div[2]/div/div[1]/video""")
   titlePath = await page.xpath("""//*[@id="live-channel-stream-information"]/div/div/div[1]/div[1]/h2""")
   video_link = clip_link = await page.evaluate('e => e.src', video[0])
   title = await page.evaluate('e => e.title',titlePath[0])
   creds.append(title)
   urllib.request.urlretrieve(video_link, f"C:/Chess/clip_auto/public/clip.mp4",MyProgressBar()) 
   creds.append(details())
   
   json.dump(creds, out_file, indent = 6)
   out_file.close()

asyncio.get_event_loop().run_until_complete(
        scrap()
)



