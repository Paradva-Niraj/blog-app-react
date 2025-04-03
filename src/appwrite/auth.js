import conf from "../../conf/conf";
import { Client,Account,ID } from "appwrite";

//user login and registration services 

export class AuthSaervice {
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid);

        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try{
            userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount)
            {
                //return userAccount; call another message
                this.login({email,password});
            }
            else{
                return userAccount;
            }
        }
        catch (error){
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logOut(){
        try{
            return this.account.deleteSessions();
        }
        catch(error)
        {
            throw error;
        }
    }
}

const authService = new AuthSaervice();

export default authService;