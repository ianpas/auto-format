import { XmlToElement, ExtractSections } from "../src";
import { ReadXml } from "./utility";

describe("section", () =>
{
    const body = XmlToElement(ReadXml("section/section.xml"));

    test("extract sections", () =>
    {
        const elements = body.elements;
        const sections = ExtractSections(elements);
        expect(sections.length).toEqual(2);
    });
});