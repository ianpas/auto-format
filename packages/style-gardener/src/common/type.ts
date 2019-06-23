import { XmlComponent } from "docx-ts";
import { IStyleSheetItem, IStyleSheet } from "style-sheet";
import { UserSecretary } from "docx-secretary";
import { ISection } from "xml-util";

export interface IComponentGardener
{
    Graft({ old, item, type }: { old?: XmlComponent, item?: IStyleSheetItem, type?: string }): XmlComponent;
}

export interface IAbstractTocGardener
{
    Graft({ style_sheet, section }: { style_sheet: IStyleSheet, section: ISection }): Array<XmlComponent>;
}

export interface IMainGardener
{
    Graft({ style_sheet, section, secretary }: { style_sheet: IStyleSheet, section: ISection, secretary: UserSecretary }): Array<XmlComponent>
}