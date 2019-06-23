import { XmlComponent } from "../../xml-components/xml-component";

export class RunProperty extends XmlComponent
{
    private m_WhiteList = new Set(["w:noProof","w:vertAlign"]);

    constructor()
    {
        super("w:rPr");
    }

    public Normalize()
    {
        this.m_Root.forEach((v, i) =>
        {
            if (v instanceof XmlComponent &&
                !this.m_WhiteList.has((v as XmlComponent).Name()))
            {
                this.m_Root[i] = null;
            }
        });
    }
}