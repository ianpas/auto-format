import { IDistiller, IStyleSheetItem, } from "../common/type";
import { Element } from "xml-util";

export interface IStdToc extends IStyleSheetItem
{
}

export const TocDistiller: IDistiller =
{
    Distill(e: Element): IStdToc
    {
        try
        {
            const backup = JSON.parse(JSON.stringify(e)) as Element;
            const content = backup.elements.find(e => e.name === "w:sdtContent");

            //
            content.elements = content.elements.filter((e, i) =>
            {
                if (e.elements && e.elements.find(e => e.name === "w:hyperlink") && i !== 1)
                {
                    return false;
                }

                return true;
            });

            //
            content.elements[1].elements.pop();
            return { style: backup };
        }
        catch (error)
        {
            return null;
        }
    }
};