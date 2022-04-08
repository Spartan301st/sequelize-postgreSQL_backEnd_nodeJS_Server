import {Post, PostAttributes} from "../models/Post";

export interface IPostRepository {
    // create one post
    createPost(title: string, body: string, accountId: string): Promise<Post>
    // get all posts
    getPostsList(): Promise<Post[]>
    // get one post
    getParticularPost(id: string): Promise<Post | null>
    // update one post
    updateParticularPost(post: PostAttributes): Promise<Post | undefined>
    // delete one post
    deleteParticularPost(id: string): Promise<number>
}

export class PostRepository implements IPostRepository {
    // create on account bound to one user
    createPost(title: string, body: string, accountId: string): Promise<Post> {
        return Post.create({
            title, 
            body, 
            accountId
        })
    }
    // all Posts
    getPostsList(): Promise<Post[]> {
        return Post.findAll()
    }

    // a particular Post according to its id
    getParticularPost(id: string): Promise<Post | null> {
        return Post.findOne({
            where: {
                id
            }
        });
    }
    // update one post
    async updateParticularPost(post: PostAttributes): Promise<Post | undefined>{
        // getting post info by its primary id; we need this to reference to the same post entry
        const foundPost = await Post.findByPk(post.id);
        // if no post was found we're returning undefined. Not required as we have checked whether a post existed before attempting to use this function
        if(!foundPost) return;
        // if an title was passed, update the title
        if(post.title) foundPost.title = post.title;
        // if a body was passed, update the body
        if(post.body) foundPost.body = post.body
        // saving the changes to the original object that we have referenced to
        return foundPost.save()
    }
    // delete one post
    deleteParticularPost(id: string): Promise<number>{
        return Post.destroy(
            {
                where: {
                    id
                }
            }
        )
    }
}