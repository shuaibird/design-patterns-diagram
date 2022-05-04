abstract class Middleware {
    protected next: Middleware | null = null;

    public setNext(next: Middleware): void {
        this.next = next;
    }

    public abstract run(request: Record<string, boolean>): void;
}

class Authentication extends Middleware {
    public run(request: Record<string, boolean>): void {
        if (request.isAuthenticated) {
            this.next && this.next.run(request);
            return;
        }
        console.log(401);
    }
}

class Authorization extends Middleware {
    public run(request: Record<string, boolean>): void {
        if (request.isAdmin) {
            this.next && this.next.run(request);
            return;
        }
        console.log(403);
    }
}

const authentication = new Authentication();
const authorization = new Authorization();
authentication.setNext(authorization);

// middlewares stack
const middlewares = authentication;
middlewares.run({ isAuthenticated: true, isAdmin: false }); // 403
