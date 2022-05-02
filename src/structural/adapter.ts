interface X {}
interface Y {}
interface Z {}

class Client {
    public userService(data: X): Z {
        return new Adapter(new Service()).run(data);
    }
}

class Adapter {
    #service: Service;
    public constructor(service: Service) {
        this.#service = service;
    }
    public run(data: X): Z {
        return this.#service.run(data);
    }
}

class Service {
    public run(data: Y): Z {}
}
