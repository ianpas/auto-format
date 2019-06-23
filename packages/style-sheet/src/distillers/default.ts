import { IDistiller, IStyleSheetItem, } from "../common/type";
import { Element } from "xml-util";

export interface IStdDefault extends IStyleSheetItem
{
}

export const DefaultDistiller: IDistiller =
{
    Distill(e: Element): IStdDefault
    {
        const std_default: IStdDefault = { style: e.elements.find(e => e.name === "w:pPr") || null };
        return std_default;
    }
};