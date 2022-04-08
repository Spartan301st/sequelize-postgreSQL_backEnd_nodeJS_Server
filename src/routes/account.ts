import express from "express";
import {IAccountRepository, AccountRepository} from "../repositories/account.repository";
import {ApiError} from "../utils/error";

const router = express.Router()

const accountRepository: IAccountRepository = new AccountRepository();

// CRUD for accounts

// Create
router.post("/", async (req: any, res: any) => {
    try {
        // extracting accountName and userId from the post body
        const {accountName, userId} = req.body;
        // creating a account according to the passed data
        const newAccount = await accountRepository.createAccount(accountName, userId)
        // res.status(200).send(`New account was successfully created bound to user ${userId}`)
        res.status(200).send("New account was successfully created")
        
        
    } catch(err: any) {
        console.error("Failed to create an account")
        console.error(err.message)
    }
})

// endpoint to get all the accounts
router.get('/list', async (req: any, res: any) => {
    try{
        const accounts = await accountRepository.getAccountsList();
        res.status(200).send(accounts)
    } catch (err: any) {
        console.error(err.message)
    }
    
})
// to get particular account with the given id
router.get("/:id", async (req: any, res: any) => {
    try{
        const {id} = req.params;
        const account = await accountRepository.getParticularAccount(id);
        res.status(200).send(account)
    } catch (err: any) {
        console.error(err.message)
    }
    
})

// Update one
router.post('/:id/update', async (req: any, res: any) => {
    try{
        // checking if there exsits such account
        const {id} = req.params;
        const foundAccount = await accountRepository.getParticularAccount(id);
        
        if (!foundAccount) {
            throw new ApiError(`No account with id ${id} was found`, 404);
        }
        // checking if the user passed neither username nor email
        const {accountName, userId} = req.body;
        if (!accountName) {
            throw new ApiError('No account name was passed', 400);
        }
        // in this case user has passed either username or email or both so we can update the user profile
        const user = await accountRepository.updateParticularAccount({id, accountName, userId});
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
        // checking if there exsits such Account
        const {id} = req.params;
        const foundAccount = await accountRepository.getParticularAccount(id);
        
        if (!foundAccount) {
            throw new ApiError(`No account with id ${id} was found`, 404);
        }

        const deletedAccountCount = await accountRepository.deleteParticularAccount(id);
        res.status(200).send(`${deletedAccountCount} user was successfully removed`);

    } catch (err: any) {
        console.error(err.message);
    }
})

module.exports = router