import { join } from "path";
import { writeFile } from "fs/promises";
import scan from "./scan";
import getContents from "./get-contents";
import getBlocks from "./get-blocks";
import renderMarkdown from "./render-markdown";

async function main(root: string, target: string) {
    const data = await scan(root);
    const contents = getContents(data);
    const blocks = await getBlocks(data, root);
    const blocksMarkdown = (
        await Promise.all(
            blocks.map((diagram) => renderMarkdown("block", diagram))
        )
    ).join("\n");
    const markdown = await renderMarkdown("main", {
        contents,
        blocks: blocksMarkdown,
    });
    await writeFile(target, markdown);
    console.log("README.md successfully generated.");
}

(async () => {
    const container = join(__dirname, "..");
    await main(join(container, "src"), join(container, "README.md"));
})();
