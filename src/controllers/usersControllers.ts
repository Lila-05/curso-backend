import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepositories";
import { IUserRepository, IUserService, User } from "../types/UsersTypes";
import { Request, Response, NextFunction } from "express";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const findUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await userService.findUsers();
        if(users.length == 0) {
            res.status(404).json({message: "No users Found. "});
            return;
        }
        res.json(users);
    } catch(error) {
        console.log('error :>>', error);
        res.status(500).json(error);
    }
}

export const findUsersById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await userService.findUsersById(req.params.id);
        if(!users) {
            res.status(404).json({message: "Not user Found. "});
            return;
        }
        res.json(users);
    } catch(error) {
        console.log('error :>>', error);
        res.status(500).json(error);
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newUser: User = req.body; 
        const result = await userService.createUser(newUser);
        res.status(201).json(result);
    } catch(error) {
        console.log('error :>>', error);
        res.status(400).json(error);
    }
}

export const uptadeUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await userService.uptadeUser(req.params.id, req.body);
        if(!users) {
            res.status(404).json({message: "Not user Found. "});
            return;
        }
        res.json(users);
    } catch(error) {
        console.log('error :>>', error);
        res.status(400).json(error);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await userService.deleteUser(req.params.id);
        if(!users) {
            res.status(404).json({message: "Not user Found. "});
            return;
        }
        res.json(users);
    } catch(error) {
        console.log('error :>>', error);
        res.status(400).json(error);
    }
}