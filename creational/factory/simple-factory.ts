interface Product {}
class ProductA implements Product {}
class ProductB implements Product {}


class Factory {
  public static createProduct(type: string): Product {
    switch (type) {
      case 'A':
        return new ProductA()
      case 'B':
        return new ProductB()
      default:
    }
  }
}
