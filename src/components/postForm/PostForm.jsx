import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index"
import service from '../../appwrite/config'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: '',
            content: post?.content || '',
            status: post?.status || '1',
        }
    })


    const naviagte = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        data.status = String(data.status);
        if (post) {
            console.log("helloo");
            
            var dataimage = null
            const file = await service.uploadfile(data.image[0]);
            // change image to cloudynary
            if (data.image[0]) {
                const formData = new FormData();
                formData.append("file", data.image[0]);
                formData.append("upload_preset", "blogimage");
                // console.log(formData);
                var dataimage = null
                try {
                    const response = await fetch("https://api.cloudinary.com/v1_1/dbe31jkg1/image/upload", {
                        method: "POST",
                        body: formData,
                    });

                    dataimage = await response.json();

                    if (dataimage.secure_url) {
                        console.log("✅ Uploaded Image URL:", dataimage.secure_url);
                        // return dataimage.secure_url;
                    } else {
                        console.error("❌ Upload failed:", dataimage);
                        return null;
                    }
                } catch (error) {
                    console.error("❌ Upload error:", error);
                    return null;
                }

            }

            if (file) {
                service.deletFile(post.featuredimage)
            }
            data.imageurl=dataimage.secure_url;
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
            if (dbPost) {
                naviagte(`/post/${dbPost.$id}`)
            }

        }
        else {
            console.log("je");
            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append("upload_preset", "blogimage");
            // console.log(formData);
            var dataimage = null
            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dbe31jkg1/image/upload", {
                    method: "POST",
                    body: formData,
                });

                dataimage = await response.json();

                if (dataimage.secure_url) {
                    console.log("✅ Uploaded Image URL:", dataimage.secure_url);
                    // return dataimage.secure_url;
                } else {
                    console.error("❌ Upload failed:", dataimage);
                    return null;
                }
            } catch (error) {
                console.error("❌ Upload error:", error);
                return null;
            }


            const file = await service.uploadfile(data.image[0]);

            if (file) {
                console.log("create post");

                const fileId = file.$id
                data.featuredimage = fileId
                data.imageurl = dataimage.secure_url;
                const dbPost = await service.createPost({
                    ...data,
                    userid: userData.$id,
                })
                if (dbPost) {
                    naviagte(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .replace(/\s+/g, '-');
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe && subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    value={getValues("slug")}
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content") || ""} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={post.imageurl} alt={post.title} className="rounded-xl" />
                    </div>
                )}
                <Select
                    options={[
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" }
                    ]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full mt-4">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
        // <h1>form for post</h1>
    );
}

export default PostForm;