import { Convert } from "../src";
import { XmlToElement } from "xml-util";

// convert any tag with text, even it's unknown
test("any unknown tag with text", () =>
{
    const xml_paragraph = `
      <w:p w:rsidR="007342FB" w:rsidRPr="00917DA6" w:rsidRDefault="000A0944" w:rsidP="00917DA6">
        <w:r w:rsidR="003D6E9C" w:rsidRPr="00917DA6">
          <w:any>绪论</w:any>
        </w:r>
      </w:p>`;

    const paragraph = Convert(XmlToElement(xml_paragraph));
    const result = paragraph.PrepareXml();
    expect(result).toEqual({
        "attributes": {
            "w:rsidP": "00917DA6",
            "w:rsidR": "007342FB",
            "w:rsidRDefault": "000A0944",
            "w:rsidRPr": "00917DA6"
        },
        "elements": [
            {
                "type": "element",
                "attributes": {
                    "w:rsidR": "003D6E9C",
                    "w:rsidRPr": "00917DA6"
                },
                "elements": [
                    {
                        "attributes": {},
                        "elements": [
                            {
                                "text": "绪论",
                                "type": "text"
                            }
                        ],
                        "name": "w:any",
                        "type": "element"
                    }
                ],
                "name": "w:r"
            }
        ],
        "name": "w:p",
        "type": "element"
    });

});