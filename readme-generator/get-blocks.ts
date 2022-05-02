import { join } from "path";
import { readFile } from "fs/promises";
import Items, { File, Dir } from "./typings";
import { formatTitle, removeExtension } from "./utils";
import getImgUrl from "./get-img-url";

function flatten(data: Items, prefixes: string[] = []): string[][] {
    return data.reduce((memo, item) => {
        if (typeof item === "string") {
            return [...memo, [...prefixes, item as File]];
        }
        const { name, children } = item as Dir;
        return [...memo, ...flatten(children, [...prefixes, name])];
    }, [] as string[][]);
}

export default async function getBlocks(
    data: Items,
    root: string
): Promise<{ title: string; img: string; implementation: string }[]> {
    return await Promise.all(
        flatten(data).map(async (item) => {
            const title = item
                .map((segment) => formatTitle(removeExtension(segment)))
                .join("-");
            const [imgContent, implementation] = await Promise.all([
                readFile(join(root, ...item), "utf-8"),
                readFile(
                    join(
                        root,
                        ...item.slice(0, item.length - 1),
                        `${removeExtension(item[item.length - 1])}.ts`
                    ),
                    "utf-8"
                ),
            ]);
            const img = getImgUrl(imgContent);
            return {
                img,
                title,
                implementation,
            };
        })
    );
}
