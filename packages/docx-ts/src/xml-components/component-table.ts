import { Document } from "../document/document";
import { Body } from "../document/body";
import { Paragraph } from "../paragraph/paragraph";
import { Run } from "../paragraph/run/run";
import { Text } from "../paragraph/run/run-components/text";
import { ParagraphProperty } from "../paragraph/paragraph-prop";
import { RunProperty } from "../paragraph/run/run-prop";
import { Table } from "../table/table";
import { TableProperty } from "../table/table-prop";

// table for most important component
export const ComponentTable: { [index: string]: { class: any } } =
{
    "w:document": { class: Document },
    "w:body": { class: Body },
    "w:p": { class: Paragraph },
    "w:pPr": { class: ParagraphProperty },
    "w:r": { class: Run },
    "w:rPr": { class: RunProperty },
    "w:t": { class: Text },
    "w:tbl": { class: Table },
    "w:tblPr": { class: TableProperty }

}