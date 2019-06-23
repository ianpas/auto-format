import { DocxNumbering } from "../src";
import { ReadXml } from "file-util";

test("get type from id", () =>
{
    const numbering = new DocxNumbering(ReadXml("item/std-numbering.xml"));
    expect(numbering.NumberingType({ level: "0", id: "5" })).toEqual("reference");
    expect(numbering.NumberingType({ level: "0", id: "9" })).toEqual("item");
    expect(numbering.NumberingType({ level: "0", id: "10" })).toEqual("subitem");
    expect(numbering.NumberingType({ level: "0", id: "81" })).toEqual("normal");
});