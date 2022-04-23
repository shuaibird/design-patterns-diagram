interface Component {
  execute(): void
}

class Container implements Component {
  #comps: Component[] = []
  public add(comp: Component) {
    this.#comps.push(comp)
  }
  public execute(): void {
    for (const comp of this.#comps) {
      comp.execute()
    }
  }
}

class Leaf implements Component {
  public execute(): void {}
}
