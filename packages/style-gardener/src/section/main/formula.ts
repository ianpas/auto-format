import { IComponentGardener } from "../../common/type";
import { XmlComponent, ParagraphProperty, Convert, Paragraph, Clone } from "docx-ts";
import { IStyleSheetItem, IStdFormula } from "style-sheet";

export const FormulaGardener: IComponentGardener =
{
    Graft({ old, item }: { old: XmlComponent, item: IStyleSheetItem }): XmlComponent
    {
        try
        {
            //
            const p = old.PrepareXml();
            let formula = p.elements.find(e => e.name === "m:oMathPara");
            !formula && (formula = p.elements.find(e => e.name === "m:oMath"));

            //
            const formula_style = item as IStdFormula;
            p.elements = [...formula_style.pre, formula, ...formula_style.post];

            //
            const paragraph = Convert(p) as Paragraph;
            const prop = Convert(formula_style.style) as ParagraphProperty;
            paragraph.UpdateProperty(prop);

            return paragraph;
        }
        catch (error)
        {
            return Clone(old);
        }
    }
}