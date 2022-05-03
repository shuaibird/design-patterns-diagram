import Atom from "./atom";
import Atoms from "./atoms";
import ContentsItems from "./contents-items";
import Utils from "./utils";

export default class Directory extends Atom {
    #name: string;
    #children: Atoms;

    public constructor({ name, children }: { name: string; children: Atoms }) {
        super();
        this.#name = name;
        this.#children = children;
    }

    public isValid(): boolean {
        return !!this.#children.length;
    }

    public getContents(prefixes: string[]): ContentsItems {
        return [
            {
                title: Utils.formatTitle(this.#name),
                indentSize: prefixes.length,
            },
            ...this.#children.getContents([...prefixes, this.#name]),
        ];
    }

    public flatten(prefixes: string[]): string[][] {
        return this.#children.flatten([...prefixes, this.#name]);
    }
}
