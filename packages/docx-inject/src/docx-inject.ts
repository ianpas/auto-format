import { FileToElement, ElementToFile, XmlToElement } from "xml-util";
import { DocxPackage } from "docx-package";

export function InjectContentTypes({ input, standard }: { input: string, standard: string }): string
{
    const e_input = FileToElement(input);
    const e_standard = FileToElement(standard);

    // TODO: we need better set!!
    const items_set = new Set([...e_input.elements.map(e => JSON.stringify(e)), ...e_standard.elements.map(e => JSON.stringify(e))]);
    e_input.elements = Array.from(items_set).map(e => JSON.parse(e));

    return ElementToFile(e_input);
}

export function InjectDocPartsRelation({ input, standard }: { input: string, standard: string }): string
{
    const e_input = FileToElement(input);
    const e_standard = FileToElement(standard);

    const input_targets = new Set(e_input.elements.map(e => e.attributes["Target"]));
    const image_type = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";

    e_standard.elements.forEach(e =>
    {
        const target = e.attributes["Target"] as string;
        if (target.startsWith("header"))
        {

            // TODO: what happens when same target with different id?
            e_input.elements.push(e);

            // if (input_targets.has(target))
            // {
            // }
            // else
            // {
            // }
        }
        else if (!input_targets.has(target) && e.attributes["Type"] !== image_type)
        {
            e.attributes["Id"] = `rId${e_input.elements.length + 1}`;
            e_input.elements.push(e);
        }
    });
    return ElementToFile(e_input);
}

export async function InjectPackage({ input, standard }: { input: DocxPackage, standard: DocxPackage })
{
    //
    {
        const __input = await input.Read("content_types") as string;
        const __std = await standard.Read("content_types") as string;
        const result = InjectContentTypes({ input: __input, standard: __std });
        input.Save({ content: result, name: "content_types" });
    }

    {
        const __input = await input.Read("doc_parts_rel") as string;
        const __std = await standard.Read("doc_parts_rel") as string;
        const result = InjectDocPartsRelation({ input: __input, standard: __std });
        input.Save({ content: result, name: "doc_parts_rel" });
    }

    // TODO: how about settings.xml? nothing important?
    const xmls = [
        "numbering",
        "foot_notes",
        "end_notes",
        "theme",
        "styles",
        "font_table",
        "header1",
        "header2",
        "header1_rel",
        "header2_rel"
    ];

    for (const name of xmls)
    {
        input.Save({ content: await standard.Read(name) as string, name: name });
    }

    const images = [
        "header_logo"
    ];

    for (const name of images)
    {
        input.Save({ content: await standard.Read(name, "arraybuffer") as ArrayBuffer, name: name });
    }


}

// use native id instead hardcode id by hand
export function InjectDocPartsRelationNative({ input, standard }: { input: string, standard: string }): string
{
    const e_input = FileToElement(input);
    const e_standard = FileToElement(standard);

    const input_targets = new Set(e_input.elements.map(e => e.attributes["Target"]));
    const image_type = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";

    e_standard.elements.forEach(e =>
    {
        const target = e.attributes["Target"] as string;
        if (target.startsWith("header"))
        {

            // TODO: what happens when same target with different id?
            // eg. there is header in input file
            e.attributes["Id"] = target.replace(".xml", "");
            e_input.elements.push(e);
        }
        else if (!input_targets.has(target) && e.attributes["Type"] !== image_type)
        {
            e.attributes["Id"] = `rId${e_input.elements.length + 1}`;
            e_input.elements.push(e);
        }
    });
    return ElementToFile(e_input);
}


export async function InjectPackageNative({ input, standard }: { input: DocxPackage, standard: DocxPackage })
{
    //
    {
        const __input = await input.Read("content_types") as string;
        const __std = await standard.Read("content_types") as string;
        const result = InjectContentTypes({ input: __input, standard: __std });
        input.Save({ content: result, name: "content_types" });
    }

    {
        const __input = await input.Read("doc_parts_rel") as string;
        const __std = await standard.Read("doc_parts_rel") as string;
        const result = InjectDocPartsRelationNative({ input: __input, standard: __std });
        input.Save({ content: result, name: "doc_parts_rel" });
    }

    const xmls = [
        "numbering",
        "foot_notes",
        "end_notes",
        "theme",
        "styles",
        "font_table"
    ];

    for (const name of xmls)
    {
        input.Save({ content: await standard.Read(name) as string, name: name });
    }

    const settings= FileToElement(await standard.Read("settings") as string);
    settings.elements.push(XmlToElement(`<w:updateFields w:val="true" />`));
    input.Save({ content: ElementToFile(settings), name: "settings" });

    const header1 = await standard.Read("header1") as string;
    input.Save({ content: header1.replace(`r:embed="rId1"`,`r:embed="header_logo"`), name: "header1" });
    
    const header2 = await standard.Read("header2") as string;
    input.Save({ content: header2.replace(`r:embed="rId1"`,`r:embed="header_logo"`), name: "header2" });

    const header1_rel = await standard.Read("header1_rel") as string;
    const header1_modified = header1_rel.replace(`Id="rId1"`, `Id="header_logo"`).replace(`Target="media/image1.png"`, `Target="media/header_logo.png"`);
    input.Save({ content: header1_modified, name: "header1_rel" });

    const header2_rel = await standard.Read("header2_rel") as string;
    const header2_modified = header2_rel.replace(`Id="rId1"`, `Id="header_logo"`).replace(`Target="media/image1.png"`, `Target="media/header_logo.png"`);
    input.Save({ content: header2_modified, name: "header2_rel" });

    const header_logo = await standard.Read("header_logo", "arraybuffer") as ArrayBuffer
    input.Save({ content: header_logo, name: "literal_header_logo" });
}