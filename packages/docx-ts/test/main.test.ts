import { Import } from "../src";
import { ElementToFile, FileToElement } from "xml-util";
import { ReadXml, WriteXml } from "./utility";

test("iterator", () =>
{
    const xml_file = ReadXml("main/in.xml");
    const body = Import(xml_file).GetBody();
    for (const block of body)
    {
        const __block = block;
    }

    // reset internal iter is important
    for (const block of body)
    {
        const __block = block;

        for (const run_level of block)
        {
            const __run_level = run_level;

            for (const run_content_level of run_level)
            {
                const __run_content_level = run_content_level;
            }
        }
    }
});

test("main", () =>
{
    const in_xml = ReadXml("main/in.xml");
    const out_xml = ElementToFile(Import(in_xml).PrepareXml());
    const to_compare = ReadXml("main/to_compare.xml");

    //WriteXml("main/out.xml", out_xml);
    expect(FileToElement(out_xml)).toEqual(FileToElement(to_compare));
});