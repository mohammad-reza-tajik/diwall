export interface CreateCommentParams {
    slug : string;
    comment : {
        content: string;
        author : string;
        date : string;
    }
}