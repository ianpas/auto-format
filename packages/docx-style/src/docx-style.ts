import { FileToElement, Element } from "xml-util";
import { BasicType } from "./common/type";

export abstract class DocxStyle
{
    protected m_Styles: Element;

    constructor(styles_xml: string)
    {
        this.m_Styles = FileToElement(styles_xml);
    }

    public abstract StyleName(style_id: string): BasicType

    public NativeName(style_id: string): string
    {
        try
        {
            return this.m_Styles.elements
                .find(e => e.attributes && e.attributes["w:styleId"] === style_id).elements
                .find(e => e.name === "w:name").attributes["w:val"] as string;
        }
        catch (error)
        {
            return "";
        }

    }

    public OutlineLevel(style_id: string): string
    {
        try
        {
            return this.m_Styles.elements
                .find(e => e.attributes && e.attributes["w:styleId"] === style_id).elements
                .find(e => e.name === "w:pPr").elements
                .find(e => e.name === "w:outlineLvl")
                .attributes["w:val"] as string;
        }
        catch (error)
        {
            return "";
        }
    }
}