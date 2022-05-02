import { encode } from "plantuml-encoder";

export default function getImgUrl(content: string): string {
    const url = `https://www.plantuml.com/plantuml/svg/`;
    return `${url}${encode(content)}`;
}
