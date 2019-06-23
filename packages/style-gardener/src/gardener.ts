import { IStyleSheet } from "style-sheet";
import { Import, Body } from "docx-ts";
import { UserSecretary } from "docx-secretary";
import { ElementToFile, ExtractSections, ISection } from "xml-util";
import { MainGardener } from "./section/main/main";
import { AbstractTocGardener } from "./section/abstract-toc/abstract-toc";


const IndexTable: { [index: string]: number } =
{
    "abstract_toc": 0,
    "main": 1
}

function Index(section_name: string, sections_length: number)
{
    if (sections_length === 1)
    {
        return 0;
    }
    else if (section_name in IndexTable)
    {
        return IndexTable[section_name];
    }
}

export function Graft({ style_sheet, user_doc, user_styles, user_numbering }:
    { style_sheet: IStyleSheet; user_doc: string, user_styles: string, user_numbering?: string }): string
{

    const __document = Import(user_doc);
    const old_body = __document.GetBody();
    const sections = ExtractSections(old_body.PrepareXml().elements);


    const secretary = new UserSecretary()
        .UnderstandStyle(user_styles)
        .UnderstandNumbering(user_numbering);

    const new_body = new Body();

    if (sections.length > 1)
    {
        const abstract_toc = sections[Index("abstract_toc", sections.length)] as ISection;
        abstract_toc && AbstractTocGardener.Graft({ style_sheet, section: abstract_toc }).forEach(e => new_body.AddChild(e));
    }

    const main_toc = sections[Index("main", sections.length)] as ISection;
    main_toc && MainGardener.Graft({ style_sheet, section: main_toc, secretary }).forEach(e => new_body.AddChild(e));

    __document.SetBody(new_body);

    return ElementToFile(__document.PrepareXml());
}