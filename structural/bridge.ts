abstract class Shape {
  #color: Color
  public constructor(color: Color) {
    this.#color = color
  }
  public getColor(): void {
    this.#color.getColor()
  }
  public abstract getShape(): void
}

abstract class Color {
  public abstract getColor(): void
}

class Circle extends Shape {
  public getShape(): void {
    console.log('circle')
  }
}

class Blue extends Color {
  public getColor(): void {
    console.log('blue')
  }
}

const blueCircle = new Circle(new Blue())
blueCircle.getShape() // circle
blueCircle.getColor() // blue