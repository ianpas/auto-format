import * as JsZip from "jszip";

// name: path
const package_content_table: { [index: string]: string } =
{
    "content_types": "[Content_Types].xml",
    "doc_parts_rel": "word/_rels/document.xml.rels",
    "theme": "word/theme/theme1.xml",
    "document": "word/document.xml",
    "settings": "word/settings.xml",
    "numbering": "word/numbering.xml",
    "font_table": "word/fontTable.xml",
    "styles": "word/styles.xml",
    "foot_notes": "word/footnotes.xml",
    "end_notes": "word/endnotes.xml",
    "header1": "word/header1.xml",
    "header2": "word/header2.xml",
    "header1_rel": "word/_rels/header1.xml.rels",
    "header2_rel": "word/_rels/header2.xml.rels",
    "header_logo": "word/media/image1.png",
    "literal_header_logo":"word/media/header_logo.png"
};

export class DocxPackage
{
    private m_Package: JsZip;

    public async FromArrayBuffer(buffer: ArrayBuffer)
    {
        this.m_Package = await JsZip.loadAsync(buffer);
        return this;
    }

    public async ToArrayBuffer()
    {
        return await this.m_Package.generateAsync({ type: "arraybuffer" });
    }

    public async Read(name: string, type: "text" | "arraybuffer" = "text")
    {
        try
        {
            const path = package_content_table[name];
            return await this.m_Package.files[path].async(type);

        }
        catch (error)
        {
            console.log(`invalid name ${name} in reading xml of docx`);
            return null;
        }
    }

    public Save({ content, name }: { content: string | ArrayBuffer, name: string })
    {
        const path = package_content_table[name];

        if (path && content)
        {
            this.m_Package.file(path, content);
        }
        else
        {
            console.log(`invalid name ${name} in saving xml of docx`);
        }

        return this;
    }
}