let capture
let img
let cameraType = null
let showCamera = true
let capturedImage = null

const CANVAS_WIDTH = 375
const CANVAS_HEIGHT = 400

const VIDEO_WIDTH = 320
const VIDEO_HEIGHT = 240
const VIDEO_RATIO = VIDEO_WIDTH / VIDEO_HEIGHT

const IMAGE_WIDTH = 200
const IMAGE_HEIGHT = 160

const VIDEO_POS_X = (CANVAS_WIDTH - VIDEO_WIDTH) / 2
const VIDEO_POS_Y = 30

const IMAGE_POS_X = CANVAS_WIDTH - IMAGE_WIDTH - 10
const IMAGE_POS_Y = CANVAS_HEIGHT - IMAGE_HEIGHT - 20

function preload() {
  cameraType = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    ? 'user'
    : ''

  img = loadImage('assets/event.png')
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  capture = createCapture({
    video: {
      facingMode: cameraType,
    },
  })
  capture.size(VIDEO.width, VIDEO.height)
  capture.hide()

  captureButton = createButton('촬영')
  captureButton.position(150, CANVAS_HEIGHT + 30)
  captureButton.mousePressed(captureImage)

  saveButton = createButton('저장')
  saveButton.position(70, CANVAS_HEIGHT + 30)
  saveButton.mousePressed(saveImage)

  retakeButton = createButton('다시 찍기')
  retakeButton.position(200, CANVAS_HEIGHT + 30)
  retakeButton.mousePressed(retake)
}

function draw() {
  if (capturedImage) {
    image(capturedImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    retakeButton.show()
    saveButton.show()
    captureButton.hide()
  } else {
    retakeButton.hide()
    saveButton.hide()
    captureButton.show()
    background(215, 216, 216)

    push()
    translate(width, 0)
    scale(-1, 1)
    if (cameraType === 'user') {
      image(
        capture,
        VIDEO_POS_X,
        VIDEO_POS_Y,
        VIDEO_HEIGHT * VIDEO_RATIO,
        VIDEO_HEIGHT,
        VIDEO_POS_X,
        VIDEO_POS_Y,
        VIDEO_WIDTH * 1.35,
        VIDEO_HEIGHT * 1.35
      )
    } else {
      image(
        capture,
        VIDEO_POS_X,
        VIDEO_POS_Y,
        VIDEO_HEIGHT * VIDEO_RATIO,
        VIDEO_HEIGHT
      )
    }
    pop()

    image(img, IMAGE_POS_X, IMAGE_POS_Y, IMAGE_WIDTH, IMAGE_HEIGHT)
  }
}

function retake() {
  capturedImage = null
}

function saveImage() {
  saveCanvas('capture', 'jpg')
}

function captureImage() {
  capturedImage = createImage(CANVAS_WIDTH, CANVAS_HEIGHT)
  capturedImage.copy(window, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
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
