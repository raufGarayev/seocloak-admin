export interface IGametypeState {
    gametypes: IGametype[];
    loading: boolean;
}

export interface IGametype {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    order: number;
}