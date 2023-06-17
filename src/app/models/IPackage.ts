import { Iprovider } from "./iprovider";

export interface IPackageView {
    id:number;
    name:string;
    type:string;
    price:number;
    purchasePrice:number,
    note:string;
    isActive:boolean;
    provider:Iprovider;
}

export interface IPackageAdd{
    name:string;
    type:string;
    price:number;
    note:string;
    providerId:number
}
