import { join } from "path";
import MarkdownGenerator from "./markdown-generator";

async function main() {
    const container = join(__dirname, "..");
    const sourceDir = join(container, "src");
    const targetFile = join(container, "README.md");
    const templatesDir = join(__dirname, "templates");
    const markdownGenerator = new MarkdownGenerator({
        sourceDir,
        targetFile,
        templatesDir,
    });
    await markdownGenerator.run();
}

main();
