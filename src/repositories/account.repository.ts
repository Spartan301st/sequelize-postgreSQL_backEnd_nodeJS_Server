import {Account, AccountAttributes} from "../models/Account";

export interface IAccountRepository {
    // create one account
    createAccount(accountName:string, userId:string): Promise<Account>
    // read all accounts
    getAccountsList(): Promise<Account[]>
    // read one account
    getParticularAccount(id: string): Promise<Account | null>
    // update account
    updateParticularAccount(account: AccountAttributes): Promise<Account | undefined>
    // delete account
    deleteParticularAccount(id: string): Promise<number>
}

export class AccountRepository implements IAccountRepository {
    // create on account bound to one user
    createAccount(accountName:string, userId:string): Promise<Account> {
        return Account.create({
            accountName,
            userId
        })
    }
    // all accounts
    getAccountsList(): Promise<Account[]> {
        return Account.findAll()
    }

    // a particular account according to its id
    getParticularAccount(id: string): Promise<Account | null> {
        return Account.findOne({
            where: {
                id
            }
        });
    }
    // update account
    async updateParticularAccount(account: AccountAttributes): Promise<Account | undefined> {
        const foundAccount = await Account.findByPk(account.id);
        // if no account was found we're returning undefined. Not required as we have checked whether a user existed before attempting to use this function
        if(!foundAccount) return;
        // if an accountName was passed, update it
        if(account.accountName) foundAccount.accountName = account.accountName
        // saving the changes to the original object that we have referenced to
        return foundAccount.save()
    }
    // delete account
    deleteParticularAccount(id: string): Promise<number> {
        return Account.destroy({
            where: {
                id
            }
        })
    }
}