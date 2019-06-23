import { XmlComponent, Convert, Paragraph } from "docx-ts";
import { IStyleSheetItem } from "style-sheet";
import { Element } from "xml-util";
import { DefaultGardener } from "../main/default";

export const AbstractGardener =
{
    Graft({ abstract, item }: { abstract: Array<Element>, item: IStyleSheetItem }): Array<XmlComponent>
    {
        try
        {
            const result = abstract.map(e => DefaultGardener.Graft({ old: Convert(e), item, type: "normal" }));
            return result;
        }
        catch (error)
        {
            return null;
        }

    }
}