interface Component1 {}
class Component1A implements Component1 {}
class Component1B implements Component1 {}
interface Component2 {}
class Component2A implements Component2 {}
class Component2B implements Component2 {}

abstract class FactoryBase {
    public assemble(): void {
        const comp1 = this.createComponent1();
        const comp2 = this.createComponent2();
    }
    protected abstract createComponent1(): Component1;
    protected abstract createComponent2(): Component2;
}

class FactoryA extends FactoryBase {
    protected createComponent1(): Component1 {
        return new Component1A();
    }
    protected createComponent2(): Component2 {
        return new Component2A();
    }
}

class FactoryB extends FactoryBase {
    protected createComponent1(): Component1 {
        return new Component1B();
    }
    protected createComponent2(): Component2 {
        return new Component2B();
    }
}
