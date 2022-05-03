import ContentsItems from "./contents-items";
import RecursiveHandler from "./recursive-handler";

export default abstract class Atom implements RecursiveHandler {
    public abstract isValid(): boolean;
    public abstract getContents(prefixes: string[]): ContentsItems;
    public abstract flatten(prefixes: string[]): string[][];
}
