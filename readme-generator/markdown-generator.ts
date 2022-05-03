import { join } from "path";
import { readdir, readFile, stat, writeFile } from "fs/promises";
import { Extensions, Symbols, Templates } from "./constants";
import Utils from "./utils";
import Atoms from "./atoms";
import Directory from "./directory";
import File from "./file";
import MarkdownRenderer from "./markdown-renderer";

export default class MarkdownGenerator {
    #sourceDir: string;
    #targetFile: string;
    #renderer: MarkdownRenderer;
    #atoms = new Atoms([]);

    public constructor({
        sourceDir,
        targetFile,
        templatesDir,
    }: {
        sourceDir: string;
        targetFile: string;
        templatesDir: string;
    }) {
        this.#sourceDir = sourceDir;
        this.#targetFile = targetFile;
        this.#renderer = new MarkdownRenderer(templatesDir);
    }

    public async run(): Promise<void> {
        await this.setUp();
        await this.generate(await this.getMarkdown());
    }

    private async setUp(): Promise<void> {
        const [atoms] = await Promise.all([
            this.construct(),
            this.#renderer.fetchTemplates([
                Templates.PATTERN,
                Templates.README,
                Templates.CONTENTS_ITEM_WITHOUT_LINK,
                Templates.CONTENTS_ITEM_WITH_LINK,
            ]),
        ]);
        this.#atoms = atoms;
    }

    private async getMarkdown(): Promise<string> {
        const [contents, patterns] = await Promise.all([
            this.getContents(),
            this.getPatterns(),
        ]);
        return this.#renderer.render(Templates.README, {
            contents,
            patterns,
        });
    }

    private async generate(markdown: string): Promise<void> {
        await writeFile(this.#targetFile, markdown);
        console.log(
            `Successfully generate markdown file - ${this.#targetFile}`
        );
    }

    private async construct(path: string = this.#sourceDir): Promise<Atoms> {
        const items = await readdir(path);
        const atoms = await Promise.all(
            items.map(async (name) => {
                const fullPath = join(path, name);
                const isDir = (await stat(fullPath)).isDirectory();
                if (isDir) {
                    const children = await this.construct(fullPath);
                    return new Directory({
                        name,
                        children,
                    });
                }
                return new File({
                    name,
                    extensions: [Extensions.PLANTUML],
                });
            })
        );
        return new Atoms(atoms.filter((atom) => atom.isValid()));
    }

    private async getContents(): Promise<string> {
        return this.#atoms
            .getContents()
            .map(({ indentSize, ...rest }) => {
                const indentation = Utils.getTabSpace(indentSize);
                const template = rest.link
                    ? Templates.CONTENTS_ITEM_WITH_LINK
                    : Templates.CONTENTS_ITEM_WITHOUT_LINK;
                return this.#renderer.render(template, {
                    ...rest,
                    indentation,
                });
            })
            .join("\n");
    }

    private async getPatterns(): Promise<string> {
        const patterns = await Promise.all(
            this.#atoms.flatten().map(async (items) => {
                const title = items
                    .map((segment) =>
                        Utils.formatTitle(Utils.removeExtension(segment))
                    )
                    .join(`${Symbols.SPACE}${Symbols.DASH}${Symbols.SPACE}`);
                const path = Utils.removeExtension(
                    join(this.#sourceDir, ...items)
                );
                const [img, implementation] = await Promise.all([
                    MarkdownGenerator.getImg(path),
                    MarkdownGenerator.getImplementation(path),
                ]);
                return this.#renderer.render(Templates.PATTERN, {
                    img,
                    title,
                    implementation,
                });
            })
        );
        return patterns.join("\n");
    }

    private static async getImg(path: string): Promise<string> {
        const img = await readFile(`${path}${Extensions.PLANTUML}`, "utf-8");
        return Utils.getImgUrl(img);
    }

    private static async getImplementation(path: string): Promise<string> {
        return readFile(`${path}${Extensions.TYPESCRIPT}`, "utf-8");
    }
}
