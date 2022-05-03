import { join } from "path";
import { readFile } from "fs/promises";

export default class MarkdownRenderer {
    #templatesDir: string;
    #templates: Record<string, string> = {};

    public constructor(templatesDir: string) {
        this.#templatesDir = templatesDir;
    }

    public async fetchTemplates(templates: string[]): Promise<void> {
        const contents = await Promise.all(
            templates.map(
                (template) =>
                    this.#templates[template] ||
                    readFile(join(this.#templatesDir, template), "utf-8")
            )
        );
        for (let i = 0; i < templates.length; i++) {
            this.#templates[templates[i]] = contents[i];
        }
    }

    public render(template: string, context: Record<string, string>): string {
        let body = this.#templates[template];
        for (const key of Object.keys(context)) {
            body = body.replace(
                new RegExp(`{{${key.toUpperCase()}}}`, "g"),
                context[key]
            );
        }
        return body;
    }
}
