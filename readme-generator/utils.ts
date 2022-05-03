import capitalize from "capitalize";
import { encode } from "plantuml-encoder";
import { Extensions, Symbols, Urls } from "./constants";

export default class Utils {
    public static getTabSpace(indentSize: number): string {
        return Symbols.INDENT_STYLE.repeat(indentSize);
    }

    public static removeExtension(
        name: string,
        extension = Extensions.PLANTUML
    ): string {
        return name.replace(new RegExp(`\\${extension}$`), "");
    }

    public static formatTitle(name: string): string {
        return name
            .split(Symbols.DASH)
            .map((word) => capitalize(word))
            .join(Symbols.SPACE);
    }

    public static getImgUrl(content: string): string {
        return `${Urls.PLANTUML_SERVER_URL}${encode(content)}`;
    }
}
