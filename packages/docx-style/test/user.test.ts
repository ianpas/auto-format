import { UserStyle } from "../src";
import { ReadXml } from "file-util";

describe("structure", () =>
{
    let user_style: UserStyle;

    beforeEach(() =>
    {
        user_style = new UserStyle(ReadXml("structure/user-styles.xml"));
    });

    test("chapter title", () =>
    {
        expect(user_style.StyleName("1")).toEqual("chapter_title");
    });

    test("section title", () =>
    {
        expect(user_style.StyleName("2")).toEqual("section_title");
    });

    test("subsection title", () =>
    {
        expect(user_style.StyleName("3")).toEqual("subsection_title");
    });

    test("normal", () =>
    {
        expect(user_style.StyleName("a1")).toEqual("normal");
    });

    test("normal-2", () =>
    {
        expect(user_style.StyleName("")).toEqual("normal");
    });

});

describe("single figure", () =>
{
    let user_style: UserStyle;

    beforeEach(() =>
    {
        user_style = new UserStyle(ReadXml("single-figure/user-styles.xml"));
    });

    test("figure caption", () =>
    {
        expect(user_style.StyleName("a3")).toEqual("caption");
    });
});

describe("table", () =>
{
    let user_style: UserStyle;

    beforeEach(() =>
    {
        user_style = new UserStyle(ReadXml("table/user-styles.xml"));
    });

    test("table caption", () =>
    {
        expect(user_style.StyleName("a3")).toEqual("caption");
    });
});

describe("formula", () =>
{
    let user_style: UserStyle;

    beforeEach(() =>
    {
        user_style = new UserStyle(ReadXml("formula/user-styles.xml"));
    });

    test("formula caption", () =>
    {
        expect(user_style.StyleName("a3")).toEqual("caption");
    });
});

describe("reference", () =>
{
    let user_style: UserStyle;

    beforeEach(() =>
    {
        user_style = new UserStyle(ReadXml("reference/user-styles.xml"));
    });

    test("reference", () =>
    {
        expect(user_style.StyleName("a3")).toEqual("list");
    });
});

describe("item", () =>
{
    let user_style: UserStyle;

    beforeEach(() =>
    {
        user_style = new UserStyle(ReadXml("item/user-styles.xml"));
    });

    test("item", () =>
    {
        expect(user_style.StyleName("a3")).toEqual("list");
    });
});