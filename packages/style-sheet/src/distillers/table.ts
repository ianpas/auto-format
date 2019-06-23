import { IDistiller, IStyleSheetItem, } from "../common/type";
import { Element } from "xml-util";

export interface IStdTable extends IStyleSheetItem
{
    paragraph_style: Element;
}

export const TableDistiller: IDistiller =
{
    Distill(e: Element): IStdTable
    {
        try
        {
            const style = e.elements.find(e => e.name === "w:tblPr") || null;

            // TODO: assert: there is at least one row and one column in std table
            const paragraph = e.elements.
                find(e => e.name === "w:tr").elements.
                find(e => e.name === "w:tc").elements.
                find(e => e.name === "w:p");

            const paragraph_style = paragraph.elements.find(e => e.name === "w:pPr") || null;

            return { style, paragraph_style };
        }
        catch (error)
        {
            return null;
        }
    }
};