import { Element } from "xml-util";
import { Secretary, IInsight } from "./secretary";
import { StdStyle } from "docx-style";

export class StdSecretary extends Secretary
{
    public UnderstandStyle(styles_xml: string)
    {
        this.m_DocxStyle = new StdStyle(styles_xml);
        return this;
    }

    public Insight(e: Element): IInsight
    {
        return super.StructureInsight(e);
    }
}