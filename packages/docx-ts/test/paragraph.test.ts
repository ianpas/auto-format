import { Convert, Paragraph, ParagraphProperty } from "../src";
import { XmlToElement } from "xml-util";
import { ReadXml, ReadJson } from "./utility";

test("paragraph-property", () =>
{
    //
    const xml_paragraph = ReadXml("paragraph/sample.xml");
    const paragraph = Convert(XmlToElement(xml_paragraph));
    const new_paragraph = Convert(paragraph.PrepareXml()) as Paragraph;

    //
    const xml_propety = `<w:pPr><w:pStyle w:val="1"/></w:pPr>`;
    const property = Convert(XmlToElement(xml_propety)) as ParagraphProperty;
    new_paragraph.UpdateProperty(property);

    //
    const result = new_paragraph.PrepareXml();
    //writeFileSync(resolve(__dirname,"./data/paragraph/paragraph.json"),JSON.stringify(result));
    const to_compare = ReadJson("paragraph/paragraph.json");
    expect(result).toEqual(to_compare);
});