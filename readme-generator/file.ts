import { extname } from "path";
import { Symbols } from "./constants";
import Utils from "./utils";
import Atom from "./atom";
import ContentsItems from "./contents-items";

export default class File extends Atom {
    #name: string;
    #extensions: string[];

    public constructor({
        name,
        extensions,
    }: {
        name: string;
        extensions: string[];
    }) {
        super();
        this.#name = name;
        this.#extensions = extensions;
    }

    public isValid(): boolean {
        return this.#extensions.includes(extname(this.#name));
    }

    public getContents(prefixes: string[]): ContentsItems {
        const name = Utils.removeExtension(this.#name);
        const link = [...prefixes, name].join(Symbols.DASH.repeat(3));
        return [
            {
                title: Utils.formatTitle(name),
                link,
                indentSize: prefixes.length,
            },
        ];
    }

    public flatten(prefixes: string[]): string[][] {
        return [[...prefixes, this.#name]];
    }
}
