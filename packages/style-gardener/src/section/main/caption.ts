import { IComponentGardener } from "../../common/type";
import { XmlComponent, Paragraph, ParagraphProperty, Convert, Clone } from "docx-ts";
import { IStyleSheetItem, IStdCaption } from "style-sheet";
import { Element, ExtractCaption, TextToRun, RunText } from "xml-util";

function FillHole(elements: Array<Element>, e: Element)
{
    const backup = elements.map(e => e);
    const hole = backup.findIndex(e => e === null);

    if (hole === -1)
    {
        backup.push(e);
    }
    else
    {
        backup.splice(hole, 0, e);
    }

    return backup;
}

function ClearHole(elements: Array<Element>)
{
    return elements.filter(e => e !== null);
}

export const CaptionGardener: IComponentGardener =
{
    Graft({ old, item, type }: { old: XmlComponent, item: IStyleSheetItem, type: string }): XmlComponent
    {
        try
        {
            const p = old.PrepareXml();
            const caption_style = item as IStdCaption;
            const { caption_space = null, caption = null } = caption_style;

            //
            const { pre: pre_caption, post: post_caption } = ExtractCaption(p);

            pre_caption.pre = FillHole(pre_caption.pre, caption_style.label);
            pre_caption.pre = ClearHole(pre_caption.pre);

            // in formula caption, caption is null, and thus there is no hole in post
            !post_caption.caption && (post_caption.post.unshift(null));
            caption_space && (post_caption.post = FillHole(post_caption.post, caption_space));
            caption && (post_caption.caption = caption);
            post_caption.caption = TextToRun(RunText(post_caption.caption).trim());
            post_caption.post = FillHole(post_caption.post, post_caption.caption);
            post_caption.post = ClearHole(post_caption.post);

            p.elements = [...pre_caption.pre, ...caption_style.fields, ...post_caption.post];

            //
            const paragraph = Convert(p) as Paragraph;
            const prop = Convert(caption_style.style) as ParagraphProperty;
            paragraph.UpdateProperty(prop);

            return paragraph;
        }
        catch (error)
        {
            return Clone(old);
        }
    }
}