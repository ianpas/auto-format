import { xml2js, Element, js2xml } from "xml-js";

// xml_text likes <w:p ...> ... </w:p>
export function XmlToElement(xml_text: string): Element
{
    try
    {
        const e = xml2js(xml_text, { compact: false, captureSpacesBetweenElements: true }).elements[0] as Element;
        return FilterElement(e);
    }
    catch (error)
    {
        return null;
    }

}

// exclude xml head
export function FileToElement(xml_file: string): Element
{
    try
    {
        const raw = xml2js(xml_file, { compact: false, captureSpacesBetweenElements: true }) as Element;
        const filtered = FilterElement(raw);
        return filtered.elements[0];
    }
    catch (error)
    {
        return null;
    }

}

export function ElementToFile(e: Element): string
{
    return `${XmlHead()}\r\n${ElementToXml(e)}`;
}

// element likes {"name":...,"type":...}
export function ElementToXml(e: Element): string
{
    return js2xml({ elements: [e] }, { compact: false });
}


//
function FilterElement(e: Element): Element
{
    if (e.elements)
    {
        e.elements = e.elements.filter(e => e.type !== "text" || (
            !(e.text as string).startsWith("\r\n") &&
            !(e.text as string).startsWith("\n"))
        );

        e.elements.forEach(e =>
        {
            FilterElement(e);
        });
    }
    return e;
}

function XmlHead(): string
{
    return js2xml({ declaration: { attributes: { version: "1.0", encoding: "UTF-8", standalone: "yes" } }, }, { compact: false });
}