import { Repository } from "./RepositoryTypes";
import { Query } from "./RepositoryTypes";

export interface Posts {
    name: string; 
    description?: string;
    content?: string;
    featureImage?: string;
    author: string;
}

export interface IPostsRepository extends Repository<Posts>{}

export interface IPostsService {
    createPosts(posts: Posts): Promise<Posts>;
    findPosts(query?: Query): Promise<Posts[]>;
    findPostsById(id: string): Promise<Posts | null>
    uptadePosts(id: string, posts: Partial<Posts>): Promise<Posts | null>
    deletePosts(id: string): Promise<boolean>
}