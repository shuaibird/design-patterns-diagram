import Atom from "./atom";
import RecursiveHandler from "./recursive-handler";
import ContentsItems from "./contents-items";

export default class Atoms implements RecursiveHandler {
    #atoms: Atom[];

    public constructor(atoms: Atom[]) {
        this.#atoms = atoms;
    }

    public get length(): number {
        return this.#atoms.length;
    }

    public getContents(prefixes: string[] = []): ContentsItems {
        return this.#atoms.reduce(
            (memo, atom) => [...memo, ...atom.getContents(prefixes)],
            [] as ContentsItems
        );
    }

    public flatten(prefixes: string[] = []): string[][] {
        return this.#atoms.reduce(
            (memo, atom) => [...memo, ...atom.flatten(prefixes)],
            [] as string[][]
        );
    }
}
