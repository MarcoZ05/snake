import Position from './Position.js'
import Snake from './Snake.js'

export default class Game {
  snakeCanvas: HTMLCanvasElement
  snakeCtx: CanvasRenderingContext2D
  height: number
  width: number
  snake: Snake
  applePosition: Position

  constructor (
    snakeCanvas: HTMLCanvasElement,
    canvasHeight: number,
    canvasWidth: number,
    height: number,
    width: number,
    snakePosition: Position = { x: 0, y: 0 }
  ) {
    this.snakeCanvas = snakeCanvas
    this.snakeCanvas.height = canvasHeight
    this.snakeCanvas.width = canvasWidth
    this.snakeCtx = snakeCanvas.getContext('2d')!
    this.height = height
    this.width = width
    this.snake = new Snake(snakePosition)
    this.applePosition = { x: width, y: height }
  }

  public update () {
    this.snake.move()
    if (this.snake.head == this.applePosition) this.newApple()
    this.detectWin()
  }

  private detectWin () {
    if (this.snake.body.length == this.width * this.height) alert('WIN')
  }

  private newApple () {
    const possiblePositions = this.getFreePositions()
    const randomIndex = Math.floor(Math.random() * possiblePositions.length)
    this.applePosition = possiblePositions[randomIndex]
  }

  private getFreePositions (): Position[] {
    const freePositions: Position[] = []
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const position = { x, y }
        if (!this.snake.body.includes(position)) {
          freePositions.push(position)
        }
      }
    }

    return freePositions
  }

  public render () {
    this.snakeCtx.clearRect(0, 0, this.snakeCanvas.width, this.snakeCanvas.height)
    this.snake.body.forEach(bodyPart => {
      this.snakeCtx.fillRect(
        bodyPart.x * this.snakeCanvas.width / this.width,
        bodyPart.y * this.snakeCanvas.height / this.height,
        this.snakeCanvas.width / this.width,
        this.snakeCanvas.height / this.height
      )
    })
    this.snakeCtx.fillStyle = 'red'
    this.snakeCtx.fillRect(
      this.applePosition.x * this.snakeCanvas.width / this.width,
      this.applePosition.y * this.snakeCanvas.height / this.height,
      this.snakeCanvas.width / this.width,
      this.snakeCanvas.height / this.height
    )
    this.snakeCtx.fillStyle = 'black'
  }
}
