import { IIdentifiable } from "./identifiable.interface";

export interface IPlayer extends IIdentifiable {
    name: string;
    room: string;
    vote?: number;
}
