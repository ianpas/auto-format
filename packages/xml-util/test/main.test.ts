import { XmlToElement, ElementToXml, FileToElement, ExtractElement } from "../src";
import { ReadXml, ReadJson } from "./utility";

describe("xml to element", () =>
{
    test("xml", () =>
    {
        const __in = ReadXml("xml-element/in.xml");
        const out = ReadJson("xml-element/out.json");
        expect(XmlToElement(__in)).toEqual(out);
    });

    test("empty", () =>
    {
        expect(XmlToElement("")).toEqual(null);
    });

});

describe("element to xml", () =>
{
    test("element", () =>
    {
        const __in = ReadJson("element-xml/in.json");
        expect(XmlToElement(ElementToXml(__in))).toEqual(__in);
    });
})


describe("extract element", () =>
{

    const xml = `
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <w:numbering xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 w16se wp14">
        <w:num w:numId="1">
            <w:abstractNumId w:val="0"/>
        </w:num>
        </w:numbering>`;

    test("found", () =>
    {
        const result = ExtractElement({ name: "w:num", prop: "w:numId", value: "1", e: FileToElement(xml) });
        expect(result).toEqual({ "attributes": { "w:numId": "1" }, "elements": [{ "attributes": { "w:val": "0" }, "name": "w:abstractNumId", "type": "element" }], "name": "w:num", "type": "element" });
    });

    test("not found", () =>
    {
        const result = ExtractElement({ name: "w:null", prop: "w:numId", value: "1", e: FileToElement(xml) });
        expect(result).toEqual(null);
    });
});