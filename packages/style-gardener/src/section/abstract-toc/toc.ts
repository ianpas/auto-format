import { XmlComponent, Convert, PropertyItem } from "docx-ts";
import { IStyleSheetItem } from "style-sheet";
import { Element } from "xml-util";

export const TocGardener =
{
    Graft({ item }: { item: IStyleSheetItem }): XmlComponent
    {
        try
        {
            // TODO: use general prop item or TOC component?
            const toc = Convert(item.style as Element) as PropertyItem;
            return toc;
        }
        catch (error)
        {
            return null;
        }

    }
}