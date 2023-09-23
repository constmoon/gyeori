let capture
let img

const CANVAS_WIDTH = 375
const CANVAS_HEIGHT = 400

const VIDEO_WIDTH = 320
const VIDEO_HEIGHT = 240

const IMAGE_WIDTH = 200
const IMAGE_HEIGHT = 160

const VIDEO_POS_X = (CANVAS_WIDTH - VIDEO_WIDTH) / 2
const VIDEO_POS_Y = 30

const IMAGE_POS_X = CANVAS_WIDTH - IMAGE_WIDTH - 10
const IMAGE_POS_Y = CANVAS_HEIGHT - IMAGE_HEIGHT - 20

function preload() {
  img = loadImage('assets/event.png')
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  background(215, 216, 216)
  capture = createCapture(VIDEO)

  captureButton = createButton('Capture')
  captureButton.position(VIDEO_WIDTH / 2, CANVAS_HEIGHT + 30)
  captureButton.mousePressed(captureImage)
}

function draw() {
  image(capture, VIDEO_POS_X, VIDEO_POS_Y, VIDEO_WIDTH, VIDEO_HEIGHT)
  image(img, IMAGE_POS_X, IMAGE_POS_Y, IMAGE_WIDTH, IMAGE_HEIGHT)
}

function captureImage() {
  saveCanvas('capture', 'jpg')
}
