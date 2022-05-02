import capitalize from "capitalize";

export function removeExtension(name: string): string {
    return name.replace(/\.wsd$/, "");
}

export function formatTitle(name: string): string {
    return name
        .split("-")
        .map((word) => capitalize(word))
        .join(" ");
}
