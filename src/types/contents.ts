export interface IContentState {
    contents: IContent[];
    loading: boolean;
    selectedContent: IContent | null;
}

export interface IContent {
    id: number;
    name: string;
    text: string;
    type: 1 | 2;
}