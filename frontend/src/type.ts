export interface searchChefsProps{
    lat?: number | undefined;
    lng?: number | undefined;
    minPrice: number;
    maxPrice: number;
    categories: string;
    canTakePartyOrders: boolean;
    search: string;
}

