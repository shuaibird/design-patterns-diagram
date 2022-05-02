import { readdir, stat } from "fs/promises";
import { join, extname } from "path";
import Items from "./typings";

export default async function scan(path: string): Promise<Items> {
    const items = await readdir(path);
    const data = await Promise.all(
        items.map(async (name) => {
            const fullPath = join(path, name);
            const isDir = (await stat(fullPath)).isDirectory();
            if (isDir) {
                const children = await scan(fullPath);
                if (!children.length) {
                    return;
                }
                return {
                    name,
                    children,
                };
            }
            if (extname(name) !== ".wsd") {
                return;
            }
            return name;
        })
    );
    return data.filter(Boolean) as Items;
}
