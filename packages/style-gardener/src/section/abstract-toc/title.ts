import { XmlComponent, Convert, Paragraph } from "docx-ts";
import { IStyleSheetItem } from "style-sheet";
import { Element, TextToParagraph } from "xml-util";

export const TitleGardener =
{
    Graft({ item, title }: { item: IStyleSheetItem, title: string }): XmlComponent
    {
        try
        {
            const p = Convert(TextToParagraph(title)) as Paragraph;
            p.UpdateProperty(Convert(item.style as Element));
            return p;
        }
        catch (error)
        {
            return null;
        }

    }
}