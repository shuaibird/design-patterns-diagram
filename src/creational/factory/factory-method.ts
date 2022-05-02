interface Product {}
class ProductA implements Product {}
class ProductB implements Product {}

abstract class FactoryBase {
    public abstract createProduct(): Product;
}

class FactoryA extends FactoryBase {
    public createProduct(): Product {
        return new ProductA();
    }
}

class FactoryB extends FactoryBase {
    public createProduct(): Product {
        return new ProductB();
    }
}
