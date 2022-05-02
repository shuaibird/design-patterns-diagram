interface Component {
    execute(): void;
}

class ConcreteComponent implements Component {
    public execute(): void {
        console.log("from ConcreteComponent");
    }
}

abstract class BaseDecorator implements Component {
    #comp: Component;
    public constructor(comp: Component) {
        this.#comp = comp;
    }

    execute(): void {
        this.#comp.execute();
    }
}

class ConcreteDecoratorA extends BaseDecorator {
    public execute(): void {
        super.execute();
        this.extra();
    }

    private extra(): void {
        console.log("from ConcreteDecoratorA");
    }
}

class ConcreteDecoratorB extends BaseDecorator {
    public execute(): void {
        super.execute();
        this.extra();
    }

    private extra(): void {
        console.log("from ConcreteDecoratorB");
    }
}

const comp = new ConcreteComponent();
comp.execute();
const decoratedCompA = new ConcreteDecoratorA(comp);
decoratedCompA.execute();
const decoratedCompB = new ConcreteDecoratorB(decoratedCompA);
decoratedCompB.execute();
