import { XmlComponent, Convert, Paragraph } from "docx-ts";
import { IStyleSheetItem } from "style-sheet";
import { Element, TextToParagraph } from "xml-util";
import { DefaultGardener } from "../main/default";

export const KeywordsGardener =
{
    Graft({ keywords, item }: { keywords: string, item: IStyleSheetItem }): XmlComponent
    {
        if(!keywords)
        {
            return null;
        }
        
        try
        {
            const component = DefaultGardener.Graft({ old: Convert(TextToParagraph(keywords)), item });
            return component;
        }
        catch (error)
        {
            return null;
        }

    }
}