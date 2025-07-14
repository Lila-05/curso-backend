import { RolesService } from "../services/RolesServices";
import { NextFunction, Request, Response } from "express";
import { RolesRepository } from "../repositories/rolesRepositories";
import { IRolesRepository, IRolesService } from "../types/RolesTypes";

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository); 

export const checkRoles = async (req: Request, res: Response, next: NextFunction) => {
    // Si no viene un role, crear un role "user" por default
    const roles: string[] = req.body && req.body?.roles ? req.body.roles : []
    const role = Array.isArray(roles) && roles.length != 0 ? roles : ["user"]
    console.log("req.body :>>", role);

    try {
        // Si viene el role, revisar en la bd que ese role exista
        const findRoles = await rolesService.findRoles({name: {$in: role}})

        // Si el role no existe retornamos un error 
        if(findRoles.length == 0) {
            res.status(404).send("Role not found");
            return;
        }

        // Si el role existe, continuar
        req.body.roles = findRoles.map(x => x._id);

        console.log('req.body.roles :>>', req.body.roles);
        
        next();
    } catch (error) {
        console.log('error :>>', error);
        res.status(500).json(error);
        return;
    }
}