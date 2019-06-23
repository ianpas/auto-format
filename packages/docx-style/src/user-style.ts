import { DocxStyle } from "./docx-style";
import { BasicType } from "./common/type";

const StyleTable: { [index: string]: BasicType } = {
    "0": "chapter_title",
    "1": "section_title",
    "2": "subsection_title"
};

export class UserStyle extends DocxStyle
{

    constructor(styles_xml: string)
    {
        super(styles_xml);
    }

    public StyleName(style_id: string): BasicType
    {
        //
        const outline_level = super.OutlineLevel(style_id);
        if (outline_level)
        {
            return StyleTable[outline_level] || "normal";
        }

        //
        const name = super.NativeName(style_id);
        if (name === "caption")
        {
            return "caption";
        }
        else if (name === "List Paragraph")
        {
            return "list";
        }

        return "normal";
    }
}