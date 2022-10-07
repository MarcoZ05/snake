import Game from './Game.js'

// init snakeCanvas
const snakeCanvas = document.getElementById('snakeCanvas') as HTMLCanvasElement

// create gameObject
const game = new Game(snakeCanvas, 500, 500, 20, 20)

// init keyHandler
document.addEventListener('keydown', e => {
  const key = e.key.toLowerCase()
  switch (key) {
    case 'w':
    case 'arrowup':
      game.snake.turn({ x: 0, y: 1 })
      break
    case 'a':
    case 'arrowleft':
      game.snake.turn({ x: -1, y: 0 })
      break
    case 's':
    case 'arrowdown':
      game.snake.turn({ x: 0, y: -1 })
      break
    case 'd':
    case 'arrowright':
      game.snake.turn({ x: 1, y: 0 })
      break
  }
})

// init gameLoop
const gameLoop = () => {
  game.update()
  game.render()
}

gameLoop()
