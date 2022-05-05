interface Mediator {
    notify(component: Component): void;
}

abstract class Component {
    protected mediator: Mediator;
    constructor(mediator: Mediator) {
        this.mediator = mediator;
    }
    public abstract operate(): void;
}

class ConcreteMediator implements Mediator {
    public notify(component: Component): void {}
}

class ConcreteComponent extends Component {
    public operate(): void {
        this.mediator.notify(this);
    }
}
