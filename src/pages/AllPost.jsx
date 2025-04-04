import { use, useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import authService from "../appwrite/auth";

function AllPost() {
    const [posts, setPosts] = useState([]); 
  

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const user = await authService.getCurrentUser();
                // console.log(user);
                
                if (user) {
                    const response = await service.viewMyPost(user.$id);
                    if (response && response.documents) {
                        setPosts(response.documents);
                    }
                    // console.log(response);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
    
        fetchPosts();
    }, []);

    return ( 
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard post={post} />
                            </div>
                        ))
                    ) : (
                        <p>Add Your posts </p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;