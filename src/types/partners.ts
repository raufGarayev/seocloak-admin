export interface IPartnersState {
    partners: {
        data: IPartner[];
        total: number;
    };
    loading: boolean;
    selectedPartner: IPartner | null;
    filters: {
        page: number;
        limit: number;
        search: string;
    };
}

export interface IPartner {
    id: number;
    name: string;
    logo: string;
}