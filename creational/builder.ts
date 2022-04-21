class Product {
  #required: any
  public optionalA: any
  public optionalB: any
  public constructor(required: any) {
    this.#required = required
  }
}

class Builder {
  #product: Product
  public constructor(required: any) {
    this.#product = new Product(required)
  }
  public setOptionalA(optionalA: any): Builder {
    this.#product.optionalA = optionalA
    return this
  }
  public setOptionalB(optionalB: any): Builder {
    this.#product.optionalB = optionalB
    return this
  }
  public build(): Product {
    return this.#product
  }
}

const product = new Builder('required')
  .setOptionalA('optionalA')
  .setOptionalB('optionalB')
  .build()
