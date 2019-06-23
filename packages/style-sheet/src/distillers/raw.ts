import { IDistiller, IStyleSheetItem, } from "../common/type";
import { Element } from "xml-util";

export interface IStdRaw extends IStyleSheetItem
{
}

export const RawDistiller: IDistiller =
{
    Distill(e: Element): IStdRaw
    {
        return { style: e }
    }
};