import { Element } from "xml-util";

export interface IStyleSheetItem
{
    style: Element;
}

export interface IStyleSheet
{
    Get(type: string): IStyleSheetItem;
}

export interface IDistiller
{
    Distill(e: Element, type?: string): IStyleSheetItem;
}