import { PostsService } from "@services/PostsServices";
import { Request, Response } from "express";
import { PostsRepository as PostsRepositoryClass } from "repositories/postsRepositories";
import { IPostsRepository, IPostsService, Posts } from "types/PostsTypes";

const postsRepository = new PostsRepositoryClass();
const postsService = new PostsService(postsRepository); 

export const findPosts = async (req: Request, res: Response) => {
    console.log('req findPosts:>>', req.currentUser);
    
    try {

        const posts = await postsService.findPosts()
        if(posts.length == 0) return res.status(404).json({message: "No Posts Found. "})
        res.json(posts);

    } catch(error) {
        console.log('error :>>', error);
        res.status(500).json(error);
    }
}

export const findPostsById = async (req: Request, res: Response) => {
    try {

        const Posts = await postsService.findPostsById(req.params.id)
        if(!Posts) return res.status(404).json({message: "Not posts Found. "})
        res.json(Posts);

    } catch(error) {
        console.log('error :>>', error);
        res.status(500).json(error);
    }
}
export const createPosts = async (req: Request, res: Response) => {
    try {

        const newPosts: Posts = req.body; 
        const result = await postsService.createPosts(newPosts)

        res.status(201).json(result);

    } catch(error) {
        console.log('error :>>', error);
        res.status(400).json(error);
    }
}

export const uptadePosts = async (req: Request, res: Response) => {
    try {

        const Posts = await postsService.uptadePosts(req.params.id, req.body)
        if(!Posts) return res.status(404).json({message: "Not posts Found. "})
        
        res.json(Posts)
    } catch(error) {
        console.log('error :>>', error);
        res.status(400).json(error);
    }
}

export const deletePosts = async (req: Request, res: Response) => {
    try {

        const Posts = await postsService.deletePosts(req.params.id)
        if(!Posts) return res.status(404).json({message: "Not posts Found. "})
        
        res.json(Posts)
    } catch(error) {
        console.log('error :>>', error);
        res.status(400).json(error);
    }
}   
