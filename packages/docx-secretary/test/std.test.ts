import { XmlToElement } from "xml-util";
import { StdSecretary } from "../src";
import { ReadXml } from "file-util";
import { ReadXml as ReadLocalXml } from "./utility";

describe("structure", () =>
{
    let styles_xml;
    let secretary: StdSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("structure/std-styles.xml");
        secretary = new StdSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("chapter title", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/structure/chapter-title.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "chapter_title"
        });
    });

    test("section title", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/structure/section-title.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "section_title"
        });
    });

    test("subsection title", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/structure/subsection-title.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "subsection_title"
        });
    });

    test("normal", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/structure/normal.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "normal"
        });
    });
});

describe("figure", () =>
{
    let styles_xml;
    let secretary: StdSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("single-figure/std-styles.xml");
        secretary = new StdSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("figure caption", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/figure/figure-caption.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "figure_caption"
        });
    });

    test("figure", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/figure/figure.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "figure"
        });

    });

});

describe("table", () =>
{
    let styles_xml;
    let secretary: StdSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("table/std-styles.xml");
        secretary = new StdSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("table caption", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/table/table-caption.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "table_caption"
        });
    });
    test("table", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/table/table.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "table"
        });
    });
});

describe("formula", () =>
{
    let styles_xml;
    let secretary: StdSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("formula/std-styles.xml");
        secretary = new StdSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("formula caption", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/formula/formula-caption.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "formula_caption"
        });
    });

    test("formula", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/formula/formula.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "formula"
        });
    });
})

describe("reference", () =>
{
    let styles_xml;
    let secretary: StdSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("reference/std-styles.xml");
        secretary = new StdSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("reference", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/reference/reference.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "reference"
        });
    });

})

describe("table of contents", () =>
{
    let styles_xml;
    let secretary: StdSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("toc/std-styles.xml");
        secretary = new StdSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("toc", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/toc/toc.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "toc"
        });
    });

})

describe("item", () =>
{
    let styles_xml;
    let secretary: StdSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("item/std-styles.xml");
        secretary = new StdSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("item", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/item/item.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "item"
        });
    });

    test("sub item", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/item/subitem.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "subitem"
        });
    });
})

describe("abstract", () =>
{
    let standard;
    let styles_xml;
    let secretary: StdSecretary;

    beforeEach(() =>
    {
        styles_xml = ReadXml("abstract/std-styles.xml");
        secretary = new StdSecretary();
        secretary.UnderstandStyle(styles_xml);
    });

    test("cn", () =>
    {
        const xml = XmlToElement(ReadLocalXml("std/abstract/abstract-cn.xml"));
        expect(secretary.Insight(xml)).toEqual({
            "type": "title_cn"
        });
    });
})