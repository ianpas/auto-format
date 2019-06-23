import { StdSecretary } from "docx-secretary";
import { FileToElement } from "xml-util";
import { IStyleSheet, IStyleSheetItem } from "./common/type";
import { Distiller } from "./distillers/distiller";

export class StyleSheet implements IStyleSheet
{
    private m_StyleSheet: { [index: string]: IStyleSheetItem } = {};

    constructor({ styles_xml, document_xml }: { styles_xml: string, document_xml: string })
    {
        try
        {
            const secretary = new StdSecretary();
            secretary.UnderstandStyle(styles_xml);

            const body = FileToElement(document_xml).elements[0];
            let section_count = 0;

            body.elements.forEach((block, i) =>
            {
                const type = secretary.Insight(block).type;
                if (type === "section")
                {
                    this.m_StyleSheet[`${type}${section_count}`] = Distiller.Distill(block, type);
                    section_count += 1;
                }
                else if (!(type in this.m_StyleSheet))
                {
                    this.m_StyleSheet[type] = Distiller.Distill(block, type);
                }
            });
        }
        catch (error)
        {

        }
    }

    public Get(type: string): IStyleSheetItem
    {
        return this.m_StyleSheet[type] || null;
    }
}