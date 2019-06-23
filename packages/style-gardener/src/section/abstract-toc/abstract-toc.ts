import { IAbstractTocGardener } from "../../common/type";
import { IStyleSheet } from "style-sheet";
import { XmlComponent } from "docx-ts";
import { TocGardener } from "./toc";
import { ISection, PlainText, Element } from "xml-util";
import { TitleGardener } from "./title";
import { EntityGardener } from "./entity";
import { NameGardener } from "./name";
import { SectionGardener } from "./section";
import { LiteralGardener } from "./literal";
import { AbstractGardener } from "./abstract";
import { KeywordsGardener } from "./keywords";

type IMeta = {
    "title_cn": string, "title_en": string,
    "author_cn": string, "author_en": string,
    "tutor_cn": string, "tutor_en": string
};

function ExtractMeta(section: ISection): IMeta
{
    const meta: IMeta = {
        "title_cn": "未识别的标题", "title_en": "unknown title",
        "author_cn": "未识别的作者", "author_en": "unknown author",
        "tutor_cn": "未识别的指导教师", "tutor_en": "unknown tutor"
    };

    try
    {
        const title_index = section.findIndex(e => PlainText(e).startsWith("论文题目："));
        if (title_index !== -1)
        {
            meta["title_cn"] = PlainText(section[title_index + 1]).trim();
            meta["title_en"] = PlainText(section[title_index + 2]).trim();
        }

        const author_index = section.findIndex(e => PlainText(e).startsWith("学生："));
        if (author_index !== -1)
        {
            meta["author_cn"] = PlainText(section[author_index + 1]).trim();
            meta["author_en"] = PlainText(section[author_index + 2]).trim();
        }

        const tutor_index = section.findIndex(e => PlainText(e).startsWith("指导教师："));
        if (tutor_index !== -1)
        {
            meta["tutor_cn"] = PlainText(section[tutor_index + 1]).trim();
            meta["tutor_en"] = PlainText(section[tutor_index + 2]).trim();
        }
    }
    catch (error)
    {

    }


    return meta;
}

function ExtractAbstract({ section, start, end }: { section: ISection, start: string, end: string }): Array<Element>
{
    try
    {
        // ignore user typed abstract literal
        const __start = section.findIndex(e => PlainText(e) === start) + 1;

        // TODO:the empty line before keywords should be supplyed by user?
        const __end = section.findIndex(e => PlainText(e).startsWith(end));
        const abstract_cn = section.slice(__start, __end);
        return abstract_cn;
    }
    catch (error)
    {
        return null;
    }
}

function ExtractAbstractCn(section: ISection): Array<Element>
{
    return ExtractAbstract({
        section,
        start: "摘要",
        end: "关键字："
    });
}

function ExtractAbstractEn(section: ISection): Array<Element>
{
    return ExtractAbstract({
        section,
        start: "Abstract",
        end: "Keywords:"
    });
}

function ExtractKeywords({ section, start }: { section: ISection, start: string }): string
{
    try
    {
        const e = section.find(e => PlainText(e).startsWith(start));
        const keywords = PlainText(e).replace(start, "");
        return keywords;
    }
    catch (error)
    {
        return null;
    }
}


function ExtractKeywordsCn(section: ISection): string
{
    return ExtractKeywords({ section, start: "关键字：" });
}

function ExtractKeywordsEn(section: ISection): string
{
    return ExtractKeywords({ section, start: "Keywords:" });
}

export const AbstractTocGardener: IAbstractTocGardener =
{
    Graft({ style_sheet, section }: { style_sheet: IStyleSheet, section: ISection }): Array<XmlComponent>
    {
        //
        const meta = ExtractMeta(section);

        //
        const title_cn = TitleGardener.Graft({ item: style_sheet.Get("title_cn"), title: meta.title_cn });
        const author_cn = EntityGardener.Graft({ item: style_sheet.Get("author_cn") });
        const author_name_cn = NameGardener.Graft({ item: style_sheet.Get("author_name_cn"), name: meta.author_cn });
        const tutor_cn = EntityGardener.Graft({ item: style_sheet.Get("tutor_cn") });
        const tutor_name_cn = NameGardener.Graft({ item: style_sheet.Get("tutor_name_cn"), name: meta.tutor_cn });
        const literal_abstract_cn = LiteralGardener.Graft({ item: style_sheet.Get("literal_abstract_cn") });
        const abstract_cn = AbstractGardener.Graft({ abstract: ExtractAbstractCn(section), item: style_sheet.Get("normal") });
        const literal_keywords_cn = LiteralGardener.Graft({ item: style_sheet.Get("literal_keywords_cn") });
        const keywords_cn = KeywordsGardener.Graft({ keywords: ExtractKeywordsCn(section), item: style_sheet.Get("normal") });

        //
        const title_en = TitleGardener.Graft({ item: style_sheet.Get("title_en"), title: meta.title_en });
        const author_en = EntityGardener.Graft({ item: style_sheet.Get("author_en") });
        const author_name_en = NameGardener.Graft({ item: style_sheet.Get("author_name_en"), name: meta.author_en });
        const tutor_en = EntityGardener.Graft({ item: style_sheet.Get("tutor_en") });
        const tutor_name_en = NameGardener.Graft({ item: style_sheet.Get("tutor_name_en"), name: meta.tutor_en });
        const literal_abstract_en = LiteralGardener.Graft({ item: style_sheet.Get("literal_abstract_en") });
        const abstract_en = AbstractGardener.Graft({ abstract: ExtractAbstractEn(section), item: style_sheet.Get("normal") });
        const literal_keywords_en = LiteralGardener.Graft({ item: style_sheet.Get("literal_keywords_en") });
        const keywords_en = KeywordsGardener.Graft({ keywords: ExtractKeywordsEn(section), item: style_sheet.Get("normal") });

        //
        const toc = TocGardener.Graft({ item: style_sheet.Get("toc") });
        const abstract_toc_section = SectionGardener.Graft({ item: style_sheet.Get("section0"), id: "header1" });

        //
        const grafted = [
            title_cn,
            author_cn,
            author_name_cn,
            tutor_cn,
            tutor_name_cn,
            literal_abstract_cn,
            ...abstract_cn,
            literal_keywords_cn,
            keywords_cn,
            title_en,
            author_en,
            author_name_en,
            tutor_en,
            tutor_name_en,
            literal_abstract_en,
            ...abstract_en,
            literal_keywords_en,
            keywords_en,
            toc,
            abstract_toc_section
        ].filter(e => e !== null);
        return grafted;
    }
}