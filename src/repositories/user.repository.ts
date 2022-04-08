import {User, UserAttributes} from "../models/User";

// an interface for user repo
export interface IUserRepository {
    // for creating new user
    createUser(userName: string, email: string): Promise<User>
    // so basically this function should return a promise of type user array
    getList(): Promise<User[]>;
    // getting one user
    getParticularUser(id: string): Promise<User | null>
    // // updating one user
    updateParticularUser(user: UserAttributes): Promise<User | undefined>
    // // deleting one user
    deleteParticularUser(id: string): Promise<number>
}

// a class that contains a function for getting all the user info
export class UserRepository implements IUserRepository {
    // for creating new user
    createUser(userName: string, email: string): Promise<User> {
        return User.create({
            userName,
            email
        })
    }
    // here function searches for all the available accounts and returns them
    getList(): Promise<User[]> {
        return User.findAll();
    }
    
    // for one user
    getParticularUser(id: string): Promise<User | null> {
        const foundUser = User.findOne({
            where: {
                id
            }
        })
        return foundUser;
    }
    // updating one user
    async  updateParticularUser(user: UserAttributes): Promise<User | undefined> {
        // getting user info by its primary id; we need this to reference to the same user entry
        const foundUser = await User.findByPk(user.id);
        // if no user was found we're returning undefined. Not required as we have checked whether a user existed before attempting to use this function
        if(!foundUser) return;
        // if an email was passed, update the email
        if(user.email) foundUser.email = user.email;

        // if a username was passed, update the username
        if(user.userName) foundUser.userName = user.userName
        // saving the changes to the original object that we have referenced to
        return foundUser.save()
    }
         
    // delete user
    deleteParticularUser(id: string): Promise<number> {
        return User.destroy({
            where: {
                id
            }
        })
    }
    
}