import { XmlComponent } from "../xml-components/xml-component";
import { TableProperty } from "./table-prop";
import { Paragraph } from "../paragraph/paragraph";

export class Table extends XmlComponent
{
    protected m_Property: TableProperty;

    constructor()
    {
        super("w:tbl");
    }

    public GetProperty(): TableProperty
    {
        // property must be the first child element of table?
        if (!this.m_Property)
        {
            const property = this.m_Root.find(child => child instanceof TableProperty);
            if (property)
            {
                this.m_Property = property as TableProperty;
                return this.m_Property
            }
            this.m_Property = new TableProperty();
            this.m_Root.unshift(this.m_Property);
        }
        return this.m_Property;
    }

    public UpdateProperty(property: XmlComponent)
    {

        // if prop is added in importing phrase and this.m_Property is not set
        const index = this.m_Root.findIndex(child => child instanceof TableProperty);
        if (index !== -1)
        {
            delete this.m_Root[index];
        }
        this.m_Property = property;
        this.m_Root.unshift(this.m_Property);
    }

    public UpdateCellProperty(property: XmlComponent)
    {
        this.m_Root.forEach(e =>
        {
            if (e && e instanceof XmlComponent)
            {
                const row = e as XmlComponent;
                if (row.Name() === "w:tr")
                {
                    for (const column of row)
                    {
                        if (column.Name() === "w:tc")
                        {
                            for (const cell of column)
                            {
                                if (cell instanceof Paragraph)
                                {
                                    cell.UpdateProperty(property);
                                }
                            }
                        }
                    }
                }
            }
        })

    }
}