export interface IHighlightState {
    highlights: IHighlight[];
    loading: boolean;
    selectedHighlight: IHighlight | null;
}

export interface IHighlight {
    id: number;
    name: string;
}