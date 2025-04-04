import service from "../appwrite/config";
import { Container,PostCard } from "../components";
import { useState,useEffect } from "react";

function Home() {
    const [posts, setPosts] = useState([]); // ✅ Fixed function name from "SetPost" to "setPosts"

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await service.viewAllPost(); // ✅ Fetch posts
                if (response && response.documents) {
                    setPosts(response.documents);
                }
                // console.log(response);
                
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts(); // ✅ Call function inside useEffect()
    }, []); // ✅ Run only once when component mounts

    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
        return (<div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </Container>
    </div>)
}
export default Home