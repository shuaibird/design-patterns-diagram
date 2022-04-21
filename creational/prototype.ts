interface Prototype<T> {
  clone(): T
}

class Product implements Prototype<Product> {
  public field: any

  public constructor();
  public constructor(product: Product);
  public constructor(product?: Product) {
    if (product) {
      this.field = product.field
    }
  }

  clone(): Product {
    return new Product(this)
  }
}
