import { XmlToElement, CaptionFieldsRange, ExtractPreCaption, ExtractPostCaption } from "../src";
import { ReadXml, ReadJson } from "./utility";

describe("figure", () =>
{
    const figure = XmlToElement(ReadXml("caption/figure.xml"));

    test("fields range", () =>
    {
        const result = CaptionFieldsRange(figure);
        expect(result).toEqual({ start: 3, end: 20 });
    });

    test("pre caption", () =>
    {
        const result = ExtractPreCaption(figure);
        const pre_caption = ReadJson("caption/figure-pre-caption.json");
        expect(result).toEqual(pre_caption);
    });

    test("post caption", () =>
    {
        const result = ExtractPostCaption(figure);
        const post_caption = ReadJson("./caption/figure-post-caption.json");
        expect(result).toEqual(post_caption);
    });
});

describe("formula", () =>
{
    test("fields range", () =>
    {
        const result = CaptionFieldsRange(XmlToElement(ReadXml("caption/formula.xml")));
        expect(result).toEqual({ start: 3, end: 12 });
    });

});