import conf from "../../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";


//after user login services like handle post

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid);

        this.databases = new Databases(this.client);

        this.bucket = new Storage(this.client)
        
    }

    async createPost({title,slug,content,featuredimage,status,userid}){
        try {
            return await this.databases.createDocument(conf.appwritedatabaseid,conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            console.log("app write",error);  
        }
    }

    async updatePost(slug,{title,content,featuredimage,status}){
        try {
            return await this.databases.updateDocument(conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
        } catch (error) {
            console.log("app write",error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
            )
            return true;
        } catch (error) {
            console.log("app write",error);
            return false;
        }
    }

    async viewPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
            )
        } catch (error) {
            console.log("app Write",error);
            return false
        }
    }

    async viewAllPost(){
        try {
            // we not use list document because we have active or diactive some post that e just view only active status that why we use getdata with query
            // return await this.databases.listDocuments(
            //     conf.appwritedatabaseid,
            //     conf.appwritecollectionid,
            //     [
            //         Query.equal()
            //     ]
            // )            
            return await this.databases.listDocuments(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                [
                    Query.equal('status', 1) // Fetch only active posts
                ]
            );
        } catch (error) {
            console.log("app write",error)
        }
    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("write app",error);
            return false;
        }
    }

    async deletFile(slug){
        try {
            return await this,this.bucket.deleteFile(
                conf.appwritebucketid,
                slug
            )
            return true
        } catch (error) {
            console.log(error);
           return false 
        }
    }

    getFilePrev(slug){
        return this.bucket.getFilePreview(
            conf.appwritebucketid,
            slug
        )
    }
}

const service = new Service();
export default service;