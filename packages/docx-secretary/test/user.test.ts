import { XmlToElement } from "xml-util";
import { UserSecretary } from "../src";
import { ReadXml } from "file-util";
import { ReadXml as ReadLocalXml } from "./utility";

describe("structure", () =>
{
    let styles_xml;
    let secretary: UserSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("structure/user-styles.xml");
        secretary = new UserSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("chapter title", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/structure/chapter-title.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "chapter_title"
        });
    });

    test("semantic chapter title", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/structure/semantic-chapter-title.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "chapter_title"
        });
    });

    test("section title", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/structure/section-title.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "section_title"
        });
    });

    test("subsection title", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/structure/subsection-title.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "subsection_title"
        });
    });

    test("semantic subsection title", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/structure/semantic-subsection-title.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "subsection_title"
        });
    });

    test("normal", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/structure/normal.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "normal"
        });
    });
});


describe("figure", () =>
{
    let styles_xml;
    let secretary: UserSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("single-figure/user-styles.xml");
        secretary = new UserSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("figure caption", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/figure/figure-caption.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "figure_caption"
        });
    });

    test("figure", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/figure/figure.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "figure"
        });
    });
})

describe("table", () =>
{
    let styles_xml;
    let secretary: UserSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("table/user-styles.xml");
        secretary = new UserSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("table caption", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/table/table-caption.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "table_caption"
        });
    });

    test("table", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/table/table.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "table"
        });
    });
})

describe("formula", () =>
{
    let styles_xml;
    let secretary: UserSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("formula/user-styles.xml");
        secretary = new UserSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("formula caption", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/formula/formula-caption.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "formula_caption"
        });
    });

    test("formula", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/formula/formula.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "formula"
        });
    });
})

describe("reference", () =>
{
    let styles_xml;
    let numbering_xml;
    let secretary: UserSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("reference/user-styles.xml");
        numbering_xml = ReadXml("reference/user-numbering.xml");
        secretary = new UserSecretary();
        secretary.UnderstandStyle(styles_xml);
        secretary.UnderstandNumbering(numbering_xml);
    });

    test("reference", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/reference/reference.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "reference"
        });
    });
})

describe("item", () =>
{
    let styles_xml;
    let numbering_xml;
    let secretary: UserSecretary;

    beforeEach(async () =>
    {
        styles_xml = ReadXml("item/user-styles.xml");
        numbering_xml = ReadXml("item/user-numbering.xml");
        secretary = new UserSecretary();
        secretary.UnderstandStyle(styles_xml);
        secretary.UnderstandNumbering(numbering_xml);
    });

    test("item", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/item/item.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "item"
        });
    });

    test("sub item", () =>
    {
        const xml = XmlToElement(ReadLocalXml("user/item/subitem.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "subitem"
        });
    });
})