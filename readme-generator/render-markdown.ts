import { join } from "path";
import { readFile } from "fs/promises";

const fetchTemplate = (() => {
    const templates: Record<string, string> = {};
    return async (template: string) => {
        if (!templates[template]) {
            templates[template] = await readFile(
                join(__dirname, "templates", `${template}.md`),
                "utf-8"
            );
        }
        return templates[template];
    };
})();

export default async function renderMarkdown(
    template: string,
    context: Record<string, string>
): Promise<string> {
    let body = await fetchTemplate(template);
    for (const key of Object.keys(context)) {
        body = body.replace(
            new RegExp(`{{${key.toUpperCase()}}}`, "g"),
            context[key]
        );
    }
    return body;
}
