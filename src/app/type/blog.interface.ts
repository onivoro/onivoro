import { IPage } from "./page.interface";
import { ISection } from "./section.interface";

export interface IBlog extends IPage {
    sections: ISection[];
}