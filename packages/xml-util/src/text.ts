import { Element } from "xml-js";
import { XmlToElement } from "./conversion";

//
export function TextToRun(text: string): Element
{
    return XmlToElement(`<w:r><w:t xml:space="preserve">${text}</w:t></w:r>`);
}

export function TextToParagraph(text: string): Element
{
    return XmlToElement(`<w:p><w:r><w:t xml:space="preserve">${text}</w:t></w:r></w:p>`);
}

// e is w:r
export function RunText(e: Element): string
{
    try
    {
        return e.elements
            .find(e => e.name === "w:t").elements
            .find(e => e.type === "text").text as string;
    }
    catch (error)
    {
        return "";
    }
}

// e is w:p, join text in w:t element
export function PlainText(e: Element): string
{
    return e.elements
        .filter(e => e.name === "w:r")
        .map(e => e.elements.find(e => e.name === "w:t"))
        .filter(e => e)
        .map(e => e.elements.find(e => e.type === "text"))
        .map(e => e.text)
        .join("")
        .trim();
}
