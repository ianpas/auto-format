import { XmlComponent } from "../xml-components/xml-component";
import { ParagraphProperty } from "./paragraph-prop";
import { Run } from "./run/run";
import { Element, PlainText } from "xml-util";

export class Paragraph extends XmlComponent
{
    protected m_Property: ParagraphProperty;
    protected m_KeepStyle: boolean = false;

    constructor()
    {
        super("w:p");
    }

    public GetProperty(): ParagraphProperty
    {
        // property must be the first child element of paragraph?
        if (!this.m_Property)
        {
            const property = this.m_Root.find(child => child instanceof ParagraphProperty);
            if (property)
            {
                this.m_Property = property as ParagraphProperty;
                return this.m_Property
            }
            this.m_Property = new ParagraphProperty();
            this.m_Root.unshift(this.m_Property);
        }
        return this.m_Property;
    }

    public UpdateProperty(property: XmlComponent)
    {

        // if prop is added in importing phrase and this.m_Property is not set
        const index = this.m_Root.findIndex(child => child instanceof ParagraphProperty);
        if (index !== -1)
        {
            delete this.m_Root[index];
        }
        this.m_Property = property;
        this.m_Root.unshift(this.m_Property);
    }

    public KeepStyle()
    {
        this.m_KeepStyle = true;
    }

    public Normalize()
    {
        if (!this.m_KeepStyle)
        {
            this.m_Root.forEach(e =>
            {
                if (e instanceof Run)
                {
                    (e as Run).Normalize();
                }
            })
        }
    }

    public PrepareXml(): Element
    {
        return super.PrepareXml();
    }
}