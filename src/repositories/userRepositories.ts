import { IUserRepository, User} from "types/UsersTypes";
import { UserModel } from "../models/Users";
import { Query } from "types/RepositoryTypes";

export class UserRepository implements IUserRepository{

    async create(data: User): Promise<User> {
       const newUser = new UserModel(data)
       return await newUser.save()
    }

    async find(): Promise<User[]>{
        return await UserModel.find().populate("roles").exec()
    }

    async findOne(query: Query): Promise<User | null> {
        return await UserModel.findOne(query).populate("roles").exec();
    }

    async findById(id: string): Promise<User> {
        return await UserModel.findById(id).populate("roles").exec()
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        return await UserModel.findByIdAndUpdate(id, data, {new: true}).populate("roles").exec();
    }

      async delete(id: string): Promise<boolean> {
        const deleted = await UserModel.findByIdAndDelete(id).exec();
        return deleted != null;
    }
}