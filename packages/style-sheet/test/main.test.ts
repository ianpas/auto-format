import { StyleSheet } from "../src";
import { ReadXml } from "file-util";
import { ReadJson } from "./utility";

test("structure", () =>
{
    //
    const document_xml = ReadXml("structure/std-document.xml");
    const styles_xml = ReadXml("structure/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const structure_style = ReadJson("out/structure.json");
    expect(style_sheet.Get("chapter_title")).toEqual(structure_style["chapter_title"]);
    expect(style_sheet.Get("section_title")).toEqual(structure_style["section_title"]);
    expect(style_sheet.Get("subsection_title")).toEqual(structure_style["subsection_title"]);
});

test("figure", () =>
{
    //
    const document_xml = ReadXml("single-figure/std-document.xml");
    const styles_xml = ReadXml("single-figure/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const figure_style = ReadJson("out/figure.json");
    expect(style_sheet.Get("figure")).toEqual(figure_style);

    //
    const figure_caption_style = ReadJson("out/figure-caption.json");
    expect(style_sheet.Get("figure_caption")).toEqual(figure_caption_style);
});

test("table", () =>
{

    const document_xml = ReadXml("table/std-document.xml");
    const styles_xml = ReadXml("table/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });


    const table_style = ReadJson("out/table.json");
    expect(style_sheet.Get("table")).toEqual(table_style);
});

test("formula", () =>
{
    //
    const document_xml = ReadXml("formula/std-document.xml");
    const styles_xml = ReadXml("formula/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    //writeFileSync(resolve(__dirname, "./out/formula.json"), JSON.stringify(style_sheet.Get("formula"]), "utf8");
    const formula_style = ReadJson("./out/formula.json");
    expect(style_sheet.Get("formula")).toEqual(formula_style);

    //
    //writeFileSync(resolve(__dirname, "./out/formula-caption.json"), JSON.stringify(style_sheet.Get("formula_caption"]), "utf8");
    const formula_caption_style = ReadJson("./out/formula-caption.json");
    expect(style_sheet.Get("formula_caption")).toEqual(formula_caption_style);

});

test("table of contents", () =>
{
    //
    const document_xml = ReadXml("toc/std-document.xml");
    const styles_xml = ReadXml("toc/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    //writeFileSync(resolve(__dirname, "./out/toc.json"), JSON.stringify(style_sheet.Get("toc"]), "utf8");
    const toc_style = ReadJson("out/toc.json");
    //writeFileSync(resolve(__dirname, "./out/toc.xml"), ElementToXml(style_sheet.Get("toc"] as Element), "utf8");
    expect(style_sheet.Get("toc")).toEqual(toc_style);

});

test("item", () =>
{

    const document_xml = ReadXml("item/std-document.xml");
    const styles_xml = ReadXml("item/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    const item_style = ReadJson("out/item.json");
    expect(style_sheet.Get("item")).toEqual(item_style);

    const subitem_style = ReadJson("out/subitem.json");
    expect(style_sheet.Get("subitem")).toEqual(subitem_style);
});

test("abstract cn", () =>
{

    const document_xml = ReadXml("abstract/std-document.xml");
    const styles_xml = ReadXml("abstract/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    expect(style_sheet.Get("title_cn")).toEqual(ReadJson("out/title-cn.json"));
    expect(style_sheet.Get("author_cn")).toEqual(ReadJson("out/author-cn.json"));
    expect(style_sheet.Get("tutor_cn")).toEqual(ReadJson("out/tutor-cn.json"));
});

test("pure chapter", () =>
{
    const document_xml = ReadXml("pure-chapter/std-document.xml");
    const styles_xml = ReadXml("pure-chapter/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });
    expect(style_sheet.Get("pure_chapter")).toEqual(ReadJson("out/pure-chapter.json"));

});