export interface Appartment {
    id: string | number;
    order?: number;
    code?: string;
    address?: string;
    city: string;
    coordinateX: number;
    coordinateY: number;
    price?: number;
    roomsNumber?: number;
    description?: string;
}
