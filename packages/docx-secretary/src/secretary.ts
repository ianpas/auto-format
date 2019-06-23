import { Element, Get, IsSectionSeparator } from "xml-util";
import { DocxStyle } from "docx-style";
import { insight_type } from "./common/type";

export type IInsight = { type: insight_type };

export abstract class Secretary
{
    protected m_DocxStyle: DocxStyle;

    public abstract UnderstandStyle(styles_xml: string): void;
    public abstract Insight(e: Element): IInsight;

    private m_TypeTable: { [index: string]: Function } = {
        "w:p": this.ParagraphType.bind(this),
        "w:tbl": this.TableType.bind(this),
        "w:sdt": this.StructureDocTagType.bind(this)
    };

    private ParagraphType(e: Element): string
    {
        try
        {
            const pStyle = e.elements
                .find(e => e.name === "w:pPr").elements
                .find(e => e.name === "w:pStyle");

            const style_id = Get(pStyle, ["attributes", "w:val"], "");
            return this.m_DocxStyle.StyleName(style_id);

        }
        catch (error)
        {
            return "normal";
        }
    }

    private StructureDocTagType(e: Element): string
    {
        try
        {
            const pTag = e.elements
                .find(e => e.name === "w:sdtPr").elements
                .find(e => e.name === "w:docPartObj").elements
                .find(e => e.name === "w:docPartGallery");

            const name = Get(pTag, ["attributes", "w:val"], "");
            return name === "Table of Contents" ? "toc" : "normal";

        }
        catch (error)
        {
            return "normal";
        }
    }

    private TableType(e: Element): string
    {
        return "table";
    }

    protected StructureInsight(e: Element): IInsight
    {
        const insight: IInsight = { type: "normal" };

        if (IsSectionSeparator(e))
        {
            insight.type = "section";
            return insight;
        }

        if (e.name in this.m_TypeTable)
        {
            insight.type = this.m_TypeTable[e.name](e);
            return insight;
        }

        return insight;
    }
}