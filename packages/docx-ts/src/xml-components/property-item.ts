import { XmlComponent } from "./xml-component";

// property item is the default with assumption that has no child element, but it can have children
// it can also be general tag that not important enough to deserve a standalone class
export class PropertyItem extends XmlComponent
{
    constructor(tag: string)
    {
        super(tag);
    }
}