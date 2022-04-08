import express from "express";
import {IUserRepository, UserRepository} from "../repositories/user.repository";
import {ApiError} from "../utils/error";

const router = express.Router()


const userRepository: IUserRepository = new UserRepository();

// CRUD for users

// Create
router.post("/", async (req, res) => {
    try {
        // extracting username and email from the post body
        const {userName, email} = req.body;
        // trying to create a new user
        const newUser = await userRepository.createUser(userName, email)
        // indicating the success result
        res.status(200).send("New user was successfully created")
    } catch (err: any) {
        // error message
        console.error("Failed to create a user")
        // console.error(err.message)
        res.send(err.message)
    }
    // custom validations aren't necessary as you can constraints in sequelize models
    // if both username and email where passed only then create a new user
    // if(userName && email) {
    //     // creating a user according to the passed data
    //     const newUser = await userRepository.createUser(userName, email)
    //     res.status(200).send("New user was successfully created")
    // } else if(!userName && email) {
    //     res.status(400).send("No username was indicated")
    // } else if(userName && !email) {
    //     res.status(400).send("No email was indicated")
    // }
})

// Read all
router.get('/list', async (req, res) => {
    try {
        // calling getList for users
        const users = await userRepository.getList();
        // and sending data back to the user
        res.status(200).send(users);
    } catch (err: any) {
        console.error(err.message)
    }

})

// Read one
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userRepository.getParticularUser(id);

        if (!user)
            throw new ApiError('User not found', 404);

        res.status(200).send(user);

    } catch (err: any) {
        res.send(err.message);
    }

})

// Update one
router.post('/:id/update', async (req: any, res: any) => {
    try{
        // checking if there exsits such user
        const {id} = req.params;
        const foundUser = await userRepository.getParticularUser(id);
        
        if (!foundUser) {
            throw new ApiError(`No user with id ${id} was found`, 404);
        }
        // checking if the user passed neither username nor email
        const {userName, email} = req.body;
        if (!userName && !email) {
            throw new ApiError('No username or email was passed', 400);
        }
        // in this case user has passed either username or email or both so we can update the user profile
        const user = await userRepository.updateParticularUser({id, userName, email});

        if(user) {
            res.status(200).send(user);
        } 
    } catch (err: any) {
        console.error(err.message);
    }

})
// // Delete one
router.post('/:id/delete', async (req, res) => {
    try {
        // checking if there exsits such user
        const {id} = req.params;
        const foundUser = await userRepository.getParticularUser(id);
        
        if (!foundUser) {
            throw new ApiError(`No user with id ${id} was found`, 404);
        }

        const deletedUserCount = await userRepository.deleteParticularUser(id);
        res.status(200).send(`${deletedUserCount} user was successfully removed`);

    } catch (err: any) {
        console.error(err.message);
    }
})


module.exports = router;