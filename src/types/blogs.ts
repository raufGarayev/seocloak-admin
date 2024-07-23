export interface IBlogsState {
    blogs: IBlog[],
    loading: boolean,
    selectedBlog: IBlog | null
}

export interface IBlog {
    id: number,
    title: string,
    content: string,
    image: string
}