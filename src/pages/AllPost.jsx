import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPost() {
    const [posts, setPosts] = useState([]); // ✅ Fixed function name from "SetPost" to "setPosts"

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await service.viewAllPost(); // ✅ Fetch posts
                if (response && response.documents) {
                    setPosts(response.documents);
                }
                console.log(response);
                
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts(); // ✅ Call function inside useEffect()
    }, []); // ✅ Run only once when component mounts

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
                        <p>No posts available</p> // ✅ Handle case when no posts exist
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
