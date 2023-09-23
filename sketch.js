let capture
let img
let cameraType = ''

const CANVAS_WIDTH = 375
const CANVAS_HEIGHT = 400

let videoWidth = 320
let videoHeight = 240
const VIDEO_RATIO = videoWidth / videoHeight

const IMAGE_WIDTH = 200
const IMAGE_HEIGHT = 160

const VIDEO_POS_X = (CANVAS_WIDTH - videoWidth) / 2
const VIDEO_POS_Y = 30

const IMAGE_POS_X = CANVAS_WIDTH - IMAGE_WIDTH - 10
const IMAGE_POS_Y = CANVAS_HEIGHT - IMAGE_HEIGHT - 20

function preload() {
  img = loadImage('assets/event.png')
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  background(215, 216, 216)
  capture = createCapture({
    video: {
      facingMode: cameraType,
    },
  })
  capture.size(VIDEO.width, VIDEO.height)
  capture.hide()

  captureButton = createButton('Capture')
  captureButton.position(50, CANVAS_HEIGHT + 30)
  captureButton.mousePressed(captureImage)

  switchButton = createButton('Switch Camera')
  switchButton.position(190, CANVAS_HEIGHT + 30)
  switchButton.mousePressed(switchCamera)
}

function draw() {
  if (cameraType === 'user') {
    push()
    translate(width, 0)
    scale(-1, 1)
    image(
      capture,
      VIDEO_POS_X,
      VIDEO_POS_Y,
      videoHeight * VIDEO_RATIO,
      videoHeight,
      VIDEO_POS_X,
      VIDEO_POS_Y,
      videoWidth,
      videoHeight
    )
    pop()
  } else {
    image(
      capture,
      VIDEO_POS_X,
      VIDEO_POS_Y,
      capture.width / 2,
      capture.width / 2 / VIDEO_RATIO
    )
  }

  image(img, IMAGE_POS_X, IMAGE_POS_Y, IMAGE_WIDTH, IMAGE_HEIGHT)
}

function captureImage() {
  saveCanvas('capture', 'jpg')
}

function switchCamera() {
  if (cameraType === 'user') {
    cameraType = 'environment'
  } else {
    cameraType = 'user'
  }

  capture = createCapture({
    video: {
      facingMode: cameraType,
    },
  })
  capture.hide()
}
