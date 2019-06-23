import { XmlComponent, Convert, Paragraph } from "docx-ts";
import { IStyleSheetItem } from "style-sheet";
import { Element } from "xml-util";

export const EntityGardener =
{
    Graft({ item }: { item: IStyleSheetItem }): XmlComponent
    {
        try
        {
            const p = Convert(item.style as Element) as Paragraph;

            // caution! 
            // keep style because something such as aligning text(in 4 characters distance)... etc
            // has nothing to do with style and it belongs to DIRECT style
            p.KeepStyle();
            return p;
        }
        catch (error)
        {
            return null;
        }

    }
}