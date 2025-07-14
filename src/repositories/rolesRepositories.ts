import { IRolesRepository, Roles } from "types/RolesTypes"
import { RolesModel } from "../models/Roles"
import { Query } from "types/RepositoryTypes"

export class RolesRepository implements IRolesRepository {

    async create(data: Roles): Promise<Roles> {
        const newRoles = new RolesModel(data)
        return await newRoles.save()
    }

    async find(query?: Query): Promise<Roles[]> {
        return await RolesModel.find(query || {}).exec()
    }

    async findById(id: string): Promise<Roles> {
        return await RolesModel.findById(id).exec()
    }

    async update(id: string, data: Partial<Roles>): Promise<Roles> {
        return await RolesModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await RolesModel.findByIdAndDelete(id).exec();
        return deleted != null;
    }
}