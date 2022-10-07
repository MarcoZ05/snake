import Position from './Position.js'

export default class Snake {
  body: Position[]
  head: Position
  direction: Position = { x: 0, y: 0 }

  constructor (head: Position) {
    this.body = [head]
    this.head = head
  }

  public turn (direction: Position) {
    // snake can't go backwards
    if (
      !(
        direction.x + this.direction.x === 0 &&
        direction.y + this.direction.y === 0
      )
    ) {
      this.direction = direction
    }
  }

  public move () {
    const reversedBody = this.body
      .filter((e, i) => {
        i !== 0
      })
      .reverse()

    // pull bodyParts to the previous bodyPart
    reversedBody.forEach((bodyPart, i) => {
      if (reversedBody.indexOf(bodyPart) === reversedBody.length - 1) {
        bodyPart = this.head
      } else {
        bodyPart = reversedBody[i + 1]
      }
    })

    // add direction Position to head Position
    this.head.x += this.direction.x
    this.head.y += this.direction.y
  }

  public grow () {
    // add body part at position of last body part
    this.body.push(this.body[this.body.length - 1])
  }
}
