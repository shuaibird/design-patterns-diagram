class Forest {
    #trees: Tree[];
    #factory = new TreeTypeFactory();

    plantTree({
        x,
        y,
        name,
        color,
        texture,
    }: {
        x: number;
        y: number;
        name: string;
        color: string;
        texture: string;
    }): void {
        this.#trees.push(
            new Tree(this.#factory, { x, y, name, color, texture })
        );
    }
}

class Tree {
    public x: number;
    public y: number;
    public type: TreeType;

    public constructor(
        factory: TreeTypeFactory,
        {
            x,
            y,
            name,
            color,
            texture,
        }: {
            x: number;
            y: number;
            name: string;
            color: string;
            texture: string;
        }
    ) {
        this.x = x;
        this.y = y;
        // instead of directly constructing a new treeType
        // fetch the treeType from factory
        // to save memory usage
        this.type = factory.getTreeType({ name, color, texture });
    }
}

class TreeTypeFactory {
    #cache: Record<string, TreeType>;
    public getTreeType({
        name,
        color,
        texture,
    }: {
        name: string;
        color: string;
        texture: string;
    }): TreeType {
        const key = this.hashKey({ name, color, texture });
        if (!this.#cache[key]) {
            this.#cache[key] = new TreeType({ name, color, texture });
        }
        return this.#cache[key];
    }

    private hashKey({
        name,
        color,
        texture,
    }: {
        name: string;
        color: string;
        texture: string;
    }): string {
        return `${name}-${color}-${texture}`;
    }
}

class TreeType {
    #name: string;
    #color: string;
    #texture: string;

    public constructor({
        name,
        color,
        texture,
    }: {
        name: string;
        color: string;
        texture: string;
    }) {
        this.#name = name;
        this.#color = color;
        this.#texture = texture;
    }
}
