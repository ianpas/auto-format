import { XmlComponent, Convert, PropertyItem } from "docx-ts";
import { IStyleSheetItem } from "style-sheet";
import { Element } from "xml-util";

export const LiteralGardener =
{
    Graft({ item }: { item: IStyleSheetItem }): XmlComponent
    {
        try
        {
            return Convert(item.style as Element) as PropertyItem;
        }
        catch (error)
        {
            return null;
        }

    }
}