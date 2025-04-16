import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ post }) {
    const [imgSrc, setImgSrc] = useState("");

    // useEffect(() => {
    //     if (post?.featuredimage) {
    //         // const src = service.getFilePrev(post.featuredimage);
    //         // // console.log("Image preview URL:", src);
    //         // setImgSrc(src);
            
    //     }
    // }, [post]);

    return (
        <Link to={`/post/${post.$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition">
                <div className="w-full flex justify-center mb-4">
                    <img
                        src={post.imageurl || "https://via.placeholder.com/150"} // Fallback if imgSrc is empty
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>
                <h2 className="text-xl font-bold">{post.title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
