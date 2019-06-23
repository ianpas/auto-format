import { XmlComponent } from "../../xml-components/xml-component";
import { RunProperty } from "./run-prop";

export class Run extends XmlComponent
{
    constructor()
    {
        super("w:r");
    }

    public Normalize()
    {
        const prop = this.m_Root.find(e => e instanceof RunProperty);
        prop && (prop as RunProperty).Normalize();
    }
}