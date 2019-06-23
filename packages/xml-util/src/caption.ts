import { Element } from "xml-js";
import { HasElement } from "./search";
import { findLastIndex } from "lodash";
import { RunText, TextToRun } from "./text";

export interface IFieldsRange { start: number, end: number }; // range in [start,end)
export type IFields = Array<Element>;
export interface IPreCaption { pre: Array<Element>; label: Element };
export interface IPostCaption { post: Array<Element>; caption: Element };
export interface ICaption { pre: IPreCaption, fields: IFields, post: IPostCaption };

// fields in a w:p is whatever between the first field begin(or fldSimple) and the last field(or fldSimple) end
export function CaptionFieldsRange(e: Element): IFieldsRange
{
    // complex field implementation start
    const complex_start = e.elements.findIndex(e => e.name === "w:r" && HasElement({ name: "w:fldChar", prop: "w:fldCharType", value: "begin", e }));
    const complex_end = findLastIndex(e.elements, e => e.name === "w:r" && HasElement({ name: "w:fldChar", prop: "w:fldCharType", value: "end", e }));

    // simple field imple
    let simple_start = e.elements.findIndex(e => e.name === "w:fldSimple");
    simple_start === -1 && (simple_start = Number.MAX_SAFE_INTEGER);

    let simple_end = findLastIndex(e.elements, e => e.name === "w:fldSimple");
    simple_end === -1 && (simple_end = Number.MIN_VALUE);

    //
    const start = Math.min(simple_start, complex_start);
    const end = Math.max(simple_end, complex_end) + 1;
    return { start, end };
}

export function ExtractCaptionFields(e: Element)
{
    const range = CaptionFieldsRange(e);
    return e.elements.slice(range.start, range.end);
}

function ExtractText(elements: Array<Element>): Element
{
    const text = elements.reduce((prev, curr) => 
    {
        return curr.name === "w:r" ? prev + RunText(curr) : prev + "";
    }, "");
    return text ? TextToRun(text) : null;
}

function ExcludeRun(elements: Array<Element>): Array<Element>
{
    return elements.map(e => e.name === "w:r" ? null : e);
}

export function ExtractPreCaption(e: Element): IPreCaption
{
    const range = CaptionFieldsRange(e);
    const raw = e.elements.slice(0, range.start);
    return { pre: ExcludeRun(raw), label: ExtractText(raw) };
}

export function ExtractPostCaption(e: Element): IPostCaption
{
    const range = CaptionFieldsRange(e);
    const raw = e.elements.slice(range.end);
    return { post: ExcludeRun(raw), caption: ExtractText(raw) };
}

export function ExtractCaption(e: Element): ICaption
{
    return { pre: ExtractPreCaption(e), fields: ExtractCaptionFields(e), post: ExtractPostCaption(e) };
}