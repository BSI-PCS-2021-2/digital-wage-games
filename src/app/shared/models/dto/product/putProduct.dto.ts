export interface PutProductDTO {
    id?: number;
    name?: string;
    price?: number;
    amount?: number;
    description?: string;
    releaseDate?: string;
    genderId?: number;
    platformId?: number;
    publisherId?: number;
    ratingSystemId?: number;
}