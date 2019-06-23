import { Secretary, IInsight } from "./secretary";
import { UserStyle } from "docx-style";
import { PlainText, Element } from "xml-util";
import { DocxNumbering } from "docx-numbering";
import { insight_type } from "./common/type";

const CaptionTable: { [index: string]: insight_type } = {
    "图": "figure_caption",
    "表": "table_caption",
    "公式": "formula_caption"
};

const NormalTable: { [index: string]: insight_type } = {
    '"name":"w:drawing"': "figure",
    '"name":"m:oMath"': "formula"
};

const PureChapterSet = new Set<string>(["参考文献", "结论", "致谢", "附录", "总结与展望"]);
const PureSectionSet = new Set<string>(["结论", "总结", "论文总结","本人工作内容","展望"]);

export class UserSecretary extends Secretary
{
    private m_InsightTable: { [index: string]: Function } = {
        "caption": this.CaptionType.bind(this),
        "normal": this.NormalType.bind(this),
        "list": this.ListType.bind(this),
        "chapter_title": this.ChapterType.bind(this),
        "section_title":this.SectionType.bind(this)
    };

    private m_DocxNumbering: DocxNumbering;

    public UnderstandStyle(styles_xml: string)
    {
        this.m_DocxStyle = new UserStyle(styles_xml);
        return this;
    }

    public UnderstandNumbering(numbering_xml: string)
    {
        this.m_DocxNumbering = new DocxNumbering(numbering_xml);
        return this;
    }

    private CaptionType(e: Element): insight_type
    {
        for (const key in CaptionTable)
        {
            if (PlainText(e).startsWith(key))
            {
                return CaptionTable[key];
            }
        }
        return "normal";
    }

    private ChapterType(e: Element): insight_type
    {
        const text = PlainText(e);
        if (PureChapterSet.has(text))
        {
            return "pure_chapter";
        }
        else
        {
            return "chapter_title";
        }
    }

    private SectionType(e: Element): insight_type
    {
        const text = PlainText(e);
        if (PureSectionSet.has(text))
        {
            return "pure_section";
        }
        else
        {
            return "section_title";
        }
    }

    private NormalType(e: Element): insight_type
    {
        for (const key in NormalTable)
        {
            // TODO: improve the performace with some deep-search lib!
            if (JSON.stringify(e).includes(key))
            {
                if (NormalTable[key] === "formula")
                {
                    if (PlainText(e) === "")
                    {
                        return "formula";
                    }
                    else
                    {
                        return "normal";
                    }
                }
                return NormalTable[key];
            }
        }

        const text = PlainText(e);
        if (/^\d+\s+.+$/.test(text) || /^第.+章\s+.+$/.test(text) || /^#\s*.+$/.test(text))
        {
            return "chapter_title";
        }
        else if (/^\d+\.\d+\s+.+$/.test(text) || /^##\s*.+$/.test(text))
        {
            return "section_title";
        }
        else if (/^\d+\.\d+\..+\s+.+$/.test(text) || /^###\s*.+$/.test(text))
        {
            return "subsection_title";
        }
        else if (PureChapterSet.has(text))
        {
            return "pure_chapter";
        }
        return "normal";
    }

    private ListType(e: Element): insight_type
    {
        try
        {
            const numPr = e.elements
                .find(e => e.name === "w:pPr").elements
                .find(e => e.name === "w:numPr");

            const level = numPr.elements.find(e => e.name === "w:ilvl").attributes["w:val"] as string;
            const id = numPr.elements.find(e => e.name === "w:numId").attributes["w:val"] as string;
            const type = this.m_DocxNumbering.NumberingType({ level, id });

            return type;

        }
        catch (error)
        {
            return "normal";
        }
    }

    private UpdateInsight(insight: IInsight, e: Element): IInsight
    {
        if (insight.type in this.m_InsightTable)
        {
            insight.type = this.m_InsightTable[insight.type](e);
        }
        return insight;
    }

    public Insight(e: Element): IInsight
    {
        const insight = super.StructureInsight(e);
        return this.UpdateInsight(insight, e);
    }
}