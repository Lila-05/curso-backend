import { UserService } from "../../services/userService";
import { UserRepository } from "../../repositories/userRepositories";
import { IUserRepository, IUserService, User } from "../../types/UsersTypes";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email}:User = req.body;
        const userExists = await userService.findUsersByEmail(email);
        if (userExists) {
            res.status(400).json({message: "Email already exists!"});
            return;
        }
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
        return;
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json(error);
        return;
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwtSecret = process.env.JWT_SECRET as string;
    try {
        const {email, password}: User = req.body;
        const user = await userService.findUsersByEmail(email);
        if(!user) {
            res.status(400).json({message: "Invalid user or password"});
            return;
        }
        const comparePass = await user.comparePassword(password);
        if(!comparePass) {
            res.status(400).json({message: "Invalid user or password"});
            return;
        }
        const token = jwt.sign({ id: user.id, email: user.email, username: user.username}, jwtSecret, {expiresIn: "1h"});
        res.json(token);
        return;
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json(error);
        return;
    }
};