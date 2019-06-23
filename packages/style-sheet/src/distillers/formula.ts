import { IDistiller, IStyleSheetItem, } from "../common/type";
import { Element } from "xml-util";

export interface IStdFormula extends IStyleSheetItem
{
    pre: Array<Element>;
    post: Array<Element>;
}

export const FormulaDistiller: IDistiller =
{
    Distill(e: Element): IStdFormula
    {
        try
        {
            let formula_index = e.elements.findIndex(e => e.name === "m:oMathPara");
            formula_index === -1 && (formula_index = e.elements.findIndex(e => e.name === "m:oMath"));

            // start from 1, to exclude style def
            const style = e.elements.find(e => e.name === "w:pPr") || null;
            const pre = e.elements.slice(1, formula_index);
            const post = e.elements.slice(formula_index + 1);

            return { style, pre, post };
        }
        catch (error)
        {
            return null;
        }
    }
};