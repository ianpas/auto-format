import { Convert } from "../src";
import { XmlToElement } from "xml-util";

// the order of attributes matters!
test("attributes order", () =>
{
    const xml_paragraph = `
      <w:p w:rsidR="007342FB" w:rsidRPr="00917DA6" w:rsidRDefault="000A0944" w:rsidP="00917DA6">
        <w:r w:rsidRPr="00917DA6">
          <w:rPr>
            <w:rFonts w:hint="eastAsia"/>
          </w:rPr>
          <w:t xml:space="preserve">第一章 </w:t>
        </w:r>
        <w:r w:rsidR="003D6E9C" w:rsidRPr="00917DA6">
          <w:rPr>
            <w:rFonts w:hint="eastAsia"/>
          </w:rPr>
          <w:t>绪论</w:t>
        </w:r>
        <w:bookmarkStart w:id="0" w:name="_GoBack"/>
        <w:bookmarkEnd w:id="0"/>
      </w:p>`;

    const paragraph = Convert(XmlToElement(xml_paragraph));
    const attributes = paragraph.GetAttributes();
    expect(JSON.stringify(attributes)).toEqual(JSON.stringify({
        'w:rsidR': '007342FB',
        'w:rsidRPr': '00917DA6',
        'w:rsidRDefault': '000A0944',
        'w:rsidP': '00917DA6'
    }));
});