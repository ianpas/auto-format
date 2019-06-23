import { IComponentGardener } from "../../common/type";
import { XmlComponent, Clone, ParagraphProperty, Convert, Table, TableProperty } from "docx-ts";
import { IStyleSheetItem, IStdTable } from "style-sheet";
import { Element } from "xml-util";

export const TableGardener: IComponentGardener =
{
    Graft({ old, item }: { old: XmlComponent, item: IStyleSheetItem }): XmlComponent
    {
        try
        {
            const table = Clone(old) as Table;
            const table_style = item as IStdTable;

            const table_prop = Convert(table_style.style as Element) as TableProperty;
            table.UpdateProperty(table_prop);

            const paragraph_prop = Convert(table_style.paragraph_style as Element) as ParagraphProperty;
            table.UpdateCellProperty(paragraph_prop);

            return table;
        }
        catch (error)
        {
            return Clone(old);;
        }
    }
}