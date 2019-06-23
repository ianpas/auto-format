import { Element } from "xml-js";
import { PlainText } from "./text";

export type ISection = Array<Element>
export type ISections = Array<ISection>


export function IsSectionSeparator(e: Element)
{
    const text = PlainText(e).toLowerCase();
    return JSON.stringify(e).includes('"name":"w:sectPr"') || text.startsWith("keywords:");
}

export function ExtractSections(blocks: Array<Element>): ISections
{
    const sections = blocks.reduce((prev: ISections, curr: Element) =>
    {
        prev[prev.length - 1].push(curr);

        if (IsSectionSeparator(curr))
        {
            prev.push([]);
        }

        return prev;

    }, [[]]);

    // remove last empty []
    sections.pop();
    return sections;
}