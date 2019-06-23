import { XmlComponent } from "../xml-components/xml-component";
import { Paragraph } from "../paragraph/paragraph";
import { Element, PlainText, IsSectionSeparator } from "xml-util";

export class Body extends XmlComponent 
{

    constructor()
    {
        super("w:body");
    }

    public IsEmpty(e: XmlComponent): boolean
    {
        if (e.Name() !== "w:p")
        {
            return false;
        }

        if (!e.root.find(
            child => (child instanceof XmlComponent) &&
                ((child as XmlComponent).Name() === "w:r" || (child as XmlComponent).Name().includes("Math")))
            && !IsSectionSeparator(e.PrepareXml())
        )
        {
            return true;
        }

        return false;
    }

    public Normalize()
    {
        this.m_Root.forEach((e, i) =>
        {
            if (this.IsEmpty(e as XmlComponent))
            {
                this.m_Root[i] = null;
            }
            else if (e instanceof Paragraph)
            {
                (e as Paragraph).Normalize();
            }
        })
    }

    public PrepareXml(): Element
    {
        this.Normalize();
        return super.PrepareXml();
    }

}