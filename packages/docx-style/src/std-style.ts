import { DocxStyle } from "./docx-style";
import { BasicType } from "./common/type";

const StyleTable: { [index: string]: BasicType } = {
    "heading 1": "chapter_title",
    "heading 2": "section_title",
    "heading 3": "subsection_title",
    "无编号章":"pure_chapter",
    "无编号节":"pure_section",
    "论文正文": "normal",
    "图片": "figure",
    "图片题注": "figure_caption",
    "论文表格": "table",
    "表格题注": "table_caption",
    "论文公式": "formula",
    "公式题注": "formula_caption",
    "参考文献": "reference",
    "款": "item",
    "项": "subitem",
    "中文摘要": "title_cn",
    "中文论文作者": "author_cn",
    "中文论文作者名": "author_name_cn",
    "中文指导教师": "tutor_cn",
    "中文指导教师名": "tutor_name_cn",
    "中文摘要字面值": "literal_abstract_cn",
    "中文关键词字面值": "literal_keywords_cn",
    "英文摘要": "title_en",
    "英文论文作者": "author_en",
    "英文论文作者名": "author_name_en",
    "英文指导教师": "tutor_en",
    "英文指导教师名": "tutor_name_en",
    "英文摘要字面值": "literal_abstract_en",
    "英文关键词字面值": "literal_keywords_en"
};

export class StdStyle extends DocxStyle
{

    constructor(styles_xml: string)
    {
        super(styles_xml);
    }

    public StyleName(style_id: string): BasicType
    {
        const native_name = super.NativeName(style_id);
        return StyleTable[native_name] || "normal";
    }
}