import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ post }) { // ✅ Accept "post" object instead of separate props
    return (
        <Link to={`/post/${post.$id}`}>
            <div className="w-full bg-gray-100 rounded-b-xl p-4 hover:shadow-lg transition">
                <div className="w-full flex justify-center mb-4">
                    <img src={service.getFilePrev(post.featuredimage)} alt={post.title} className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{post.title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
