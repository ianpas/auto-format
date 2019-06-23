import { IComponentGardener } from "../../common/type";
import { XmlComponent, Clone, PropertyItem } from "docx-ts";

export const UnknownGardener: IComponentGardener =
{
    Graft({ old }: { old: XmlComponent }): XmlComponent
    {
        try
        {
            const unknown = Clone(old) as PropertyItem;
            return unknown;
        }
        catch (error)
        {
            return null;
        }
    }
}