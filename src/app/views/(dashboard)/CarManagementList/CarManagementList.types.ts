import { ListResponse } from "@/app/types";

export interface Cars {
    [key: string]: string | number;
    id: number;
    brand: string;
    model: string;
    licensePlate: string;
    rentalRate: number;
}

export interface CarsList extends ListResponse {
    data: Cars[],

}