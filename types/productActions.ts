export interface CreateCommentParams {
    slug : string;
    comment : {
        content: string;
        author : string;
        date : string;
    }
}

export interface GetAllProductsParams {
    category?:string;
    page?:number;
    sortBy?:string;
    search?:string;
}