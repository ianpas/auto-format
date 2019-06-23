import { IDistiller, IStyleSheetItem, } from "../common/type";
import { Element, ExtractCaption, RunText, TextToRun } from "xml-util";

export interface IStdCaption extends IStyleSheetItem
{
    label: Element;
    fields: Array<Element>;
    caption_space?: Element;
    caption?: Element
}

export const CaptionDistiller: IDistiller =
{
    Distill(e: Element, type: string): IStdCaption
    {
        try
        {
            const style = e.elements.find(e => e.name === "w:pPr") || null;
            const { fields, pre, post } = ExtractCaption(e);

            if (type === "formula_caption")
            {
                return { style, label: pre.label, fields, caption: post.caption };
            }
            else if (type === "figure_caption" || type === "table_caption")
            {
                const caption_text = RunText(post.caption);
                const caption_space = TextToRun(" ".repeat(caption_text.length - caption_text.trimLeft().length));
                return { style, label: pre.label, fields, caption_space };
            }
        }
        catch (error)
        {
            return null;
        }
    }
};