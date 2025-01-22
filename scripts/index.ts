import Bunbot from 'bunbot'
import fs from "fs";
import os from "os";



const username = os.userInfo().username;

const bb = new Bunbot()

// Get screen size
const screenSize = bb.getScreenSize()
// Get scale size
const scaleSize = bb.getScaleSize()

console.log(screenSize, scaleSize)
console.log(username)


function getScreenSize() {
    const screenSize = bb.getScreenSize()
    const scaleSize = bb.getScaleSize()
    return { screenSize, scaleSize }
}

console.log(getScreenSize())

function sendImage() {
    const screenSize = bb.getScreenSize()
    const scaleSize = bb.getScaleSize()
    //const image = bb.CaptureScreen(0, 0, screenSize.width, screenSize.height)
    //fs.writeFileSync(`/Users/${username}/Desktop/image.png`, image)
    console.log("sent image", bb)
}



if (username === "shelbernstein") {
    //setInterval(sendImage, 1000)
    sendImage()
} else {
    receiveImageAndAskO1Pro()
}


function receiveImageAndAskO1Pro() {
    const image = fs.readFileSync(`/Users/${username}/Desktop/image.png`)
    console.log(image)
}