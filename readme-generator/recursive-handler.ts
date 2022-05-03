import ContentsItems from "./contents-items";

export default interface RecursiveHandler {
    getContents(prefixes: string[]): ContentsItems;
    flatten(prefixes: string[]): string[][];
}
