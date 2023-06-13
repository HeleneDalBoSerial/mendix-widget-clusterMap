export interface Appartment {
    id: string | number;
    order?: number;
    name?: string;
    address?: string;
    city: string;
    coordinateX: number;
    coordinateY: number;
    price?: number;
    roomsNumber?: number;
    description?: string;
}
