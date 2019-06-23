import { Element } from "xml-js";
import { get } from "lodash";

export function ExtractElement({ name, prop, value, e }: { name: string, prop: string, value: string, e: Element }): Element
{
    const result = e.elements.find(
        e => e.name === name &&
            get(e, ["attributes", prop], "") === value
    );
    return result || null;
}

export function HasElement({ name, prop, value, e }: { name: string, prop: string, value: string, e: Element }): boolean
{
    return ExtractElement({ name, prop, value, e }) !== null;
}

export { get as Get } from "lodash";