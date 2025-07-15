import { Repository, Query} from "./RepositoryTypes";
import { Roles } from "./RolesTypes";

export interface User extends Document {
    _id: any;
    name: string; 
    username: string;
    email: string; 
    password: string;
    roles?: Roles[];
    permissions?: string[];
    comparePassword(password: string): Promise<boolean>;
}

export interface IUserRepository extends Repository<User>{
    findOne(query: Query): Promise<User | null>;
}

export interface IUserService {
    createUser(user: User): Promise<User>;
    findUsers(query?: Query): Promise<User[]>;
    findUsersById(id: string): Promise<User | null>
    findUsersByEmail(email: string): Promise<User | null>
    uptadeUser(id: string, user: Partial<User>): Promise<User | null>
    deleteUser(id: string): Promise<boolean>
}