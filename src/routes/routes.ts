import { Router } from "express";
import { createRoles, deleteRoles, findRoles, findRolesById, uptadeRoles } from "../controllers/rolesControllers";
import { createUser, deleteUser, findUsers, findUsersById, uptadeUser } from "../controllers/usersControllers";
import { loginUser, registerUser } from "../controllers/auth/authController";
import { createPosts, deletePosts, findPosts, findPostsById, uptadePosts } from "../controllers/postsControllers";
import { getPermissions, verifyToken } from "../middlewares/auth";
import { checkRoles } from "../middlewares/roles";



const router = Router()

export default () => {
    router.get("/health", (req, res) => {
        res.send("Api is Healthy!");
    });


    // Auth Routes
    router.post("/auth/register", checkRoles, registerUser);
    router.post("/auth/login", loginUser);

    // Users Routes
    router.get("/users", verifyToken, getPermissions, findUsers);
    router.get("/users/:id", verifyToken, getPermissions, findUsersById);
    router.post("/users", verifyToken, getPermissions, checkRoles, createUser);
    router.put("/users/:id", verifyToken, getPermissions, uptadeUser);
    router.delete("/users/:id", verifyToken, getPermissions, deleteUser);


    // Roles Routes
    router.get("/roles", getPermissions, findRoles);
    router.get("/roles/:id", verifyToken, getPermissions, findRolesById);
    router.post("/roles", getPermissions, createRoles);
    router.put("/roles/:id", verifyToken, getPermissions, uptadeRoles)
    router.delete("/roles/:id", getPermissions, deleteRoles)

    // Posts Routes
    router.get("/posts", findPosts);
    router.get("/posts/:id", findPostsById);
    router.post("/posts", verifyToken, getPermissions, createPosts);
    router.put("/posts/:id", verifyToken, getPermissions, uptadePosts)
    router.delete("/posts/:id", verifyToken, getPermissions, deletePosts)
    
    return router;
};
