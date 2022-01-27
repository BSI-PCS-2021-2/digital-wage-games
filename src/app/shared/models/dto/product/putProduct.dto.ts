export interface PutProductDTO {
    id?: number;
    name?: string;
    price?: number;
    amount?: number;
    description?: string;
    releaseDate?: string;
    imgUrl?: string;
    genderId?: number;
    platformId?: number;
    publisherId?: number;
    ratingSystemId?: number;
}