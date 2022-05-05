interface Command {
    execute(): void;
}

class ConcreteCommand implements Command {
    #receiver: Receiver;
    constructor(receiver: Receiver) {
        this.#receiver = receiver;
    }
    public execute(): void {
        this.#receiver.onReceive();
    }
}

class Sender {
    public execute(command: Command): void {
        command.execute();
    }
}

class Receiver {
    public onReceive(): void {}
}
