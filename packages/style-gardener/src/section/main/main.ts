import { IMainGardener, IComponentGardener } from "../../common/type";
import { IStyleSheet } from "style-sheet";
import { UserSecretary } from "docx-secretary";
import { CaptionGardener } from "./caption";
import { FormulaGardener } from "./formula";
import { DefaultGardener } from "./default";
import { TableGardener } from "./table";
import { UnknownGardener } from "./unknown";
import { XmlComponent, Convert } from "docx-ts";
import { ISection } from "xml-util";
import { SectionGardener } from "../abstract-toc/section";

function Normalize(name: string, type: string)
{
    switch (name)
    {
        case "w:p":
            if (type.includes("caption"))
            {
                return "caption";
            }
            else
            {
                return type === "formula" ? type : "default";
            }

        case "w:tbl":
            return "table";

        default:
            return "unknown";
    }
}

const GardenerTable: { [index: string]: IComponentGardener } =
{
    "caption": CaptionGardener,
    "formula": FormulaGardener,
    "default": DefaultGardener,
    "table": TableGardener,
    "unknown": UnknownGardener
};


export const MainGardener: IMainGardener =
{
    Graft({ style_sheet, section, secretary }: { style_sheet: IStyleSheet, section: ISection, secretary: UserSecretary }): Array<XmlComponent>
    {
        const components: Array<XmlComponent> = [];

        for (const block of section)
        {
            const insight = secretary.Insight(block);
            if (insight.type === "section")
            {
                const grafted = SectionGardener.Graft({ item: style_sheet.Get("section1"), id: "header2" });
                components.push(grafted);
            }
            else
            {
                const style = style_sheet.Get(insight.type);
                const grafted = GardenerTable[Normalize(block.name, insight.type)].Graft({ old: Convert(block), item: style, type: insight.type });
                components.push(grafted);
            }
        }
        return components.filter(e => e !== null);
    }
}