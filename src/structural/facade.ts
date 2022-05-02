class ComponentA {
    public static process() {}
}

class ComponentB {
    public static process() {}
}

class Facade {
    public static process() {
        ComponentA.process();
        ComponentB.process();
    }
}

Facade.process();
