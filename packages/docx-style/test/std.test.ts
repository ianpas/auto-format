import { StdStyle } from "../src";
import { ReadXml } from "file-util";

describe("structure", () =>
{
    let std_style: StdStyle;

    beforeEach(() =>
    {
        std_style = new StdStyle(ReadXml("structure/std-styles.xml"));
    })

    test("pure chapter", () =>
    {
        const std_style = new StdStyle(ReadXml("pure-chapter/std-styles.xml"));
        expect(std_style.StyleName("aff6")).toEqual("pure_chapter");
    });

    test("chapter title", () =>
    {
        expect(std_style.StyleName("1")).toEqual("chapter_title");
    });

    test("section title", () =>
    {
        expect(std_style.StyleName("2")).toEqual("section_title");
    });

    test("subsection title", () =>
    {
        expect(std_style.StyleName("3")).toEqual("subsection_title");
    });

    test("normal", () =>
    {
        expect(std_style.StyleName("a3")).toEqual("normal");
    });

    test("normal-2", () =>
    {
        expect(std_style.StyleName("")).toEqual("normal");
    });

});

describe("single figure", () =>
{
    let std_style: StdStyle;

    beforeEach(() =>
    {
        std_style = new StdStyle(ReadXml("single-figure/std-styles.xml"));
    })

    test("figure caption", () =>
    {
        expect(std_style.StyleName("ae")).toEqual("figure_caption");
    });

    test("figure", () =>
    {
        expect(std_style.StyleName("ab")).toEqual("figure");
    });
});

describe("table", () =>
{
    let std_style: StdStyle;

    beforeEach(() =>
    {
        std_style = new StdStyle(ReadXml("table/std-styles.xml"));
    })

    test("table caption", () =>
    {
        expect(std_style.StyleName("af0")).toEqual("table_caption");
    });

    test("table", () =>
    {
        expect(std_style.StyleName("ae")).toEqual("table");
    });
});

describe("formula", () =>
{
    let std_style: StdStyle;

    beforeEach(() =>
    {
        std_style = new StdStyle(ReadXml("formula/std-styles.xml"));
    })

    test("formula", () =>
    {
        expect(std_style.StyleName("af3")).toEqual("formula");
    });

    test("formula caption", () =>
    {
        expect(std_style.StyleName("af5")).toEqual("formula_caption");
    });
});

describe("reference", () =>
{
    let std_style: StdStyle;

    beforeEach(() =>
    {
        std_style = new StdStyle(ReadXml("formula/std-styles.xml"));
    })
    test("reference", () =>
    {
        const type = std_style.StyleName("a0");
        expect(type).toEqual("reference");
    });
});

describe("item", () =>
{
    let std_style: StdStyle;

    beforeEach(() =>
    {
        std_style = new StdStyle(ReadXml("item/std-styles.xml"));
    })

    test("item", () =>
    {
        expect(std_style.StyleName("a")).toEqual("item");
    });

    test("sub item", () =>
    {
        expect(std_style.StyleName("a1")).toEqual("subitem");
    });
});

describe("abstract cn", () =>
{
    let std_style: StdStyle;

    beforeEach(() =>
    {
        std_style = new StdStyle(ReadXml("abstract/std-styles.xml"));
    })

    test("title", () =>
    {
        expect(std_style.StyleName("af8")).toEqual("title_cn");
    });

    test("author", () =>
    {
        expect(std_style.StyleName("afa")).toEqual("author_cn");
    });

    test("author name", () =>
    {
        expect(std_style.StyleName("afb")).toEqual("author_name_cn");
    });

    test("tutor", () =>
    {
        expect(std_style.StyleName("afc")).toEqual("tutor_cn");
    });

    test("tutor name", () =>
    {
        expect(std_style.StyleName("afd")).toEqual("tutor_name_cn");
    });

    test("literal abstract cn", () =>
    {
        expect(std_style.StyleName("afe")).toEqual("literal_abstract_cn");
    });
});