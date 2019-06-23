import { XmlComponent, Convert, Paragraph } from "docx-ts";
import { IStyleSheetItem } from "style-sheet";
import { Element, TextToParagraph } from "xml-util";

export const NameGardener =
{
    Graft({ item, name }: { item: IStyleSheetItem, name: string }): XmlComponent
    {
        try
        {
            const p = Convert(TextToParagraph(name)) as Paragraph;
            p.UpdateProperty(Convert(item.style as Element));
            return p;
        }
        catch (error)
        {
            return null;
        }

    }
}