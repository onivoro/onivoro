import { IDoxFn } from "./dox-fn.interface";

export interface IDoxFunctions {
    headerFunctions?: IDoxFn[];
    auxilaryHeaderFunctions?: IDoxFn[];
    registerFunctions?: Array<Pick<IDoxFn, 'name'> & { fn: Function }>
}
