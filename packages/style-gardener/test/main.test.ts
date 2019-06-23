import { StyleSheet } from "style-sheet";
import { FileToElement } from "xml-util";
import { Graft } from "../src";
import { ReadXml } from "file-util";
import { ReadXml as ReadLocalXml, WriteXml } from "./utility";

test("structure", () =>
{
    //
    const document_xml = ReadXml("structure/std-document.xml");
    const styles_xml = ReadXml("structure/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("structure/user-styles.xml");
    const user_doc = ReadLocalXml("in/structure.xml");
    const grafted = Graft({ style_sheet, user_doc, user_styles });

    WriteXml("out/structure-temp.xml", grafted);
    const to_compare = ReadLocalXml("out/structure.xml");
    expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));

});

test("figure", () =>
{
    //
    const document_xml = ReadXml("single-figure/std-document.xml");
    const styles_xml = ReadXml("single-figure/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("single-figure/user-styles.xml");

    {
        const user_doc = ReadLocalXml("in/figure.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles });

        //writeFileSync(resolve(__dirname, "./out/figure.xml"), grafted, "utf8");
        const to_compare = ReadLocalXml("out/figure.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }

    {
        const user_doc = ReadLocalXml("in/figure-caption.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles });

        //writeFileSync(resolve(__dirname, "./out/figure-caption.xml"), grafted, "utf8");
        const to_compare = ReadLocalXml("out/figure-caption.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }
});

test("table", () =>
{
    //
    const document_xml = ReadXml("table/std-document.xml");
    const styles_xml = ReadXml("table/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("table/user-styles.xml");

    {
        const user_doc = ReadLocalXml("in/table.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles });

        //writeFileSync(resolve(__dirname, "./out/table.xml"), grafted, "utf8");
        const to_compare = ReadLocalXml("out/table.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }

    {
        const user_doc = ReadLocalXml("in/table-caption.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles });

        //writeFileSync(resolve(__dirname, "./out/table-caption.xml"), grafted, "utf8");
        const to_compare = ReadLocalXml("out/table-caption.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }
});

test("formula", () =>
{
    //
    const document_xml = ReadXml("formula/std-document.xml");
    const styles_xml = ReadXml("formula/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("formula/user-styles.xml");

    {
        const user_doc = ReadLocalXml("in/formula.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles });

        //writeFileSync(resolve(__dirname, "./out/formula.xml"), grafted, "utf8");
        const to_compare = ReadLocalXml("out/formula.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }

    {
        const user_doc = ReadLocalXml("in/formula-caption.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles });

        //writeFileSync(resolve(__dirname, "./out/formula-caption.xml"), grafted, "utf8");
        const to_compare = ReadLocalXml("out/formula-caption.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }
});

test("reference", () =>
{
    //
    const document_xml = ReadXml("reference/std-document.xml");
    const styles_xml = ReadXml("reference/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("reference/user-styles.xml");
    const user_numbering = ReadXml("reference/user-numbering.xml");
    const user_doc = ReadLocalXml("in/reference.xml");
    const grafted = Graft({ style_sheet, user_doc, user_styles, user_numbering });

    //writeFileSync(resolve(__dirname, "./out/reference.xml"), grafted, "utf8");
    const to_compare = ReadLocalXml("out/reference.xml");
    expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
});

test("table of contents", () =>
{
    //
    const document_xml = ReadXml("toc/std-document.xml");
    const styles_xml = ReadXml("toc/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("toc/user-styles.xml");
    const user_doc = ReadLocalXml("in/toc.xml");
    const grafted = Graft({ style_sheet, user_doc, user_styles });

    WriteXml("out/toc-temp.xml", grafted);
    const to_compare = ReadLocalXml("out/toc.xml");
    expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
});

test("item", () =>
{
    //
    const document_xml = ReadXml("item/std-document.xml");
    const styles_xml = ReadXml("item/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("item/user-styles.xml");
    const user_numbering = ReadXml("item/user-numbering.xml");

    {
        const user_doc = ReadLocalXml("in/item.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles, user_numbering });

        //writeFileSync(resolve(__dirname, "./out/item.xml"), grafted, "utf8");
        const to_compare = ReadLocalXml("out/item.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }

    {
        const user_doc = ReadLocalXml("in/subitem.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles, user_numbering });

        //writeFileSync(resolve(__dirname, "./out/subitem.xml"), grafted, "utf8");
        const to_compare = ReadLocalXml("out/subitem.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }
});

test("abstract", async () =>
{
    //
    const document_xml = ReadXml("abstract/std-document.xml");
    const styles_xml = ReadXml("abstract/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("abstract/user-styles.xml");
    {
        const user_doc = ReadLocalXml("in/abstract.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles });

        WriteXml("out/abstract-temp.xml", grafted);
        const to_compare = ReadLocalXml("out/abstract.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }
    {
        const user_doc = ReadLocalXml("in/abstract-2.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles });

        //WriteXml("out/abstract-2.xml", grafted);
        const to_compare = ReadLocalXml("out/abstract-2.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }
});

test("section", async () =>
{
    //
    const document_xml = ReadXml("header/std-document.xml");
    const styles_xml = ReadXml("header/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("header/user-styles.xml");
    {
        const user_doc = ReadLocalXml("in/section.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles });

        //WriteXml("out/section.xml", grafted);
        const to_compare = ReadLocalXml("out/section.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }
});

test("pure chapter", async () =>
{
    //
    const document_xml = ReadXml("pure-chapter/std-document.xml");
    const styles_xml = ReadXml("pure-chapter/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("pure-chapter/user-styles.xml");
    {
        const user_doc = ReadLocalXml("in/pure-chapter.xml");
        const grafted = Graft({ style_sheet, user_doc, user_styles });

        //WriteXml("out/pure-chapter.xml", grafted);
        const to_compare = ReadLocalXml("out/pure-chapter.xml");
        expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));
    }
});

test("semantic", () =>
{
    //
    const document_xml = ReadXml("semantic/std-document.xml");
    const styles_xml = ReadXml("semantic/std-styles.xml");
    const style_sheet = new StyleSheet({ styles_xml, document_xml });

    //
    const user_styles = ReadXml("semantic/user-styles.xml");
    const user_doc = ReadLocalXml("in/semantic.xml");
    const grafted = Graft({ style_sheet, user_doc, user_styles });

    WriteXml("out/semantic-temp.xml", grafted);
    const to_compare = ReadLocalXml("out/semantic.xml");
    expect(FileToElement(grafted)).toEqual(FileToElement(to_compare));

});