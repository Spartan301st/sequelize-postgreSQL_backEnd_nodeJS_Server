import express from "express";
import {IPostRepository, PostRepository} from "../repositories/post.repository";
import {ApiError} from "../utils/error";

const router = express.Router()

const postRepository: IPostRepository = new PostRepository();

// CRUD for posts

// Create
router.post("/", async (req: any, res: any) => {
    try {
        // extracting username and email from the post body
        const {title, body, accountId} = req.body;
        // creating a user according to the passed data
        const newAccount = await postRepository.createPost(title, body, accountId)
        // res.status(200).send(`New account was successfully created bound to user ${userId}`)
        res.status(200).send(newAccount)
    }catch(err: any) {
        console.error("Failed to create a user")
        console.error(err.message)
    }
})

// endpoint to get all posts
router.get("/list", async (req: any, res: any) => {
    try{
        const posts = await postRepository.getPostsList();
        res.status(200).send(posts)
    } catch (err: any) {
        console.error(err.message)
    }
    
})
// to get particular post with the given id
router.get("/:id", async (req: any, res: any) => {
    try{
        const {id} = req.params;
        const post = await postRepository.getParticularPost(id);
        res.status(200).send(post)
    } catch (err: any) {
        console.error(err.message)
    }
})

// Update one
router.post('/:id/update', async (req: any, res: any) => {
    try{
        // checking if there exsits such Post
        const {id} = req.params;
        const foundPost = await postRepository.getParticularPost(id);
        
        if (!foundPost) {
            throw new ApiError(`No Post with id ${id} was found`, 404);
        }
        // checking if the user passed neither username nor email
        const {title, body, accountId} = req.body;
        if (!title && !body) {
            throw new ApiError('No Post name was passed', 400);
        }
        // in this case user has passed either username or email or both so we can update the user profile
        const post = await postRepository.updateParticularPost({id, title, body, accountId});
        if(post) {
            res.status(200).send(post);
        } 
    } catch (err: any) {
        console.error(err.message);
    }

})

// Delete one
router.post('/:id/delete', async (req, res) => {
    try {
        // checking if there exsits such post
        const {id} = req.params;
        const foundPost = await postRepository.getParticularPost(id);
        
        if (!foundPost) {
            throw new ApiError(`No Post with id ${id} was found`, 404);
        }

        const deletedPostCount = await postRepository.deleteParticularPost(id);
        res.status(200).send(`${deletedPostCount} Post was successfully removed`);

    } catch (err: any) {
        console.error(err.message);
    }
})

module.exports = router