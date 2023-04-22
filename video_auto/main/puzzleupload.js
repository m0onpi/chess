/* eslint-disable no-useless-concat */
const { upload } = require('youtube-videos-uploader'); //vanilla javascript
const tag = require('./info.json')
const credentials = { email: tag.email, pass: tag.password}
require("dotenv").config();
const { IgApiClient } = require('instagram-private-api');
const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);

const ig = new IgApiClient();

async function login() {
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
}

// eslint-disable-next-line no-useless-concat
const puzzle = { path: 'C:/Chess/video_auto/out/video.mp4', title: 'This is a title' + ' ' + '#shorts' ,description: 'This is a title' +' #shorts #chess',isAgeRestriction: false, isNotForKid: true}


upload (credentials, [puzzle]).then(console.log)




const puzzlePost = async () => {
    await login();
  
    const videoPath = 'C:/Chess/video_auto/out/video.mp4';
    const coverPath = './public/thumbnail.jpg';
  
    const publishResult = await ig.publish.video({
      video: await readFileAsync(videoPath),
      coverImage: await readFileAsync(coverPath),
      caption: 'This is a title' + ' \n. \n. \n Press ❤ if you like this. Follow us @sigma_chess_memes \n. \n' + tag.captions
  
  
    });
  
    console.log(publishResult);
};
