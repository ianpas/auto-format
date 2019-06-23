import { DocxPackage } from "docx-package";
import { InjectPackage, InjectPackageNative } from "docx-inject";
import { StyleSheet } from "style-sheet";
import { Graft } from "style-gardener";

/**
 * @todo remove this method and rename the native one
 */
export async function FormatPackage({ input, standard }: { input: DocxPackage, standard: DocxPackage })
{
    const style_sheet = new StyleSheet({ styles_xml: await standard.Read("styles") as string, document_xml: await standard.Read("document") as string });
    const user_doc = await input.Read("document") as string;
    const user_styles = await input.Read("styles") as string;
    const user_numbering = await input.Read("numbering") as string;
    const grafted = Graft({ style_sheet, user_doc, user_numbering, user_styles });
    input.Save({ content: grafted, name: "document" });

    // caution! the order matters
    // if you inject package first, you will lost original user style 
    await InjectPackage({ input, standard });
}

//
export async function DocxIsValid(input:DocxPackage)
{
    const user_doc = await input.Read("document") as string;
    return !user_doc.includes(`<w:docPartGallery w:val="Table of Contents"/>`);
}

export async function FormatPackageNative({ input, standard }: { input: DocxPackage, standard: DocxPackage })
{
    const style_sheet = new StyleSheet({ styles_xml: await standard.Read("styles") as string, document_xml: await standard.Read("document") as string });
    const user_doc = await input.Read("document") as string;
    const user_styles = await input.Read("styles") as string;
    const user_numbering = await input.Read("numbering") as string;
    let grafted = Graft({ style_sheet, user_doc, user_numbering, user_styles });

    /**
     * @todo temp fix: replace "" in Times New Roman with Song
             move this to docx-ts run normalize later, if possible :)

             set font of “ and ” explicitly in order to save it as <w:rPr/><w:t>“</w:t>
             instead of <w:rPr/><w:t>“测试</w:t>
     */
    
    const reg_left = `<w:rPr/><w:t>“</w:t>`;
    grafted = grafted.replace(reg_left,`<w:rPr><w:rFonts w:hint="eastAsia"/></w:rPr><w:t>“</w:t>`);
    
    const reg_right = `<w:rPr/><w:t>”</w:t>`;
    grafted = grafted.replace(reg_right,`<w:rPr><w:rFonts w:hint="eastAsia"/></w:rPr><w:t>”</w:t>`);

    input.Save({ content: grafted, name: "document" });

    // caution! the order matters
    // if you inject package first, you will lost original user style 
    await InjectPackageNative({ input, standard });
}