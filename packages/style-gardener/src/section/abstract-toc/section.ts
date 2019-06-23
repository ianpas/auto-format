import { XmlComponent, Convert, PropertyItem } from "docx-ts";
import { IStyleSheetItem } from "style-sheet";
import { Element } from "xml-util";

export const SectionGardener =
{
    Graft({ item, id }: { item: IStyleSheetItem, id?: string }): XmlComponent
    {

        if (!item)
        {
            return null;
        }

        const item_copy = JSON.parse(JSON.stringify(item));

        try
        {
            if (item_copy.style.name === "w:sectPr" && item_copy.style.elements[0].name === "w:headerReference")
            {
                const header_ref = item_copy.style.elements[0];
                header_ref.attributes["r:id"] = id;

            }
            else if (item_copy.style.name === "w:p" && item_copy.style.elements[0].elements[1].name === "w:sectPr")
            {
                const section = item_copy.style.elements[0].elements[1];
                if (section.elements[0].name === "w:headerReference")
                {
                    const header_ref = section.elements[0];
                    header_ref.attributes["r:id"] = id;
                }
            }

            // TODO: use general prop item or section component?
            const section = Convert(item_copy.style as Element) as PropertyItem;
            return section;
        }
        catch (error)
        {
            return Convert(item_copy.style as Element) as PropertyItem;
        }

    }
}