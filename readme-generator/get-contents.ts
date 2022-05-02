import Items, { File, Dir } from "./typings";
import { removeExtension, formatTitle } from "./utils";

const INDENT = "\t";

export default function getContents(
    data: Items,
    prefixes: string[] = []
): string {
    return data
        .map((item) => {
            const tabSpace = INDENT.repeat(prefixes.length);
            if (typeof item === "string") {
                const name = removeExtension(item as File);
                const link = `#${[...prefixes, name].join("-")}`;
                return `${tabSpace}- [${formatTitle(name)}](${link})`;
            }
            const { name, children } = item as Dir;
            return [
                `${tabSpace}- ${formatTitle(name)}`,
                getContents(children, [...prefixes, name]),
            ].join("\n");
        })
        .join("\n");
}
