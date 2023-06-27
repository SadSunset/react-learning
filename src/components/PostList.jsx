import React from "react";
import { PostItem } from "./PostItem";

export const PostList = ({post, title, remove}) => {
    if (!post.length)
        return (
            <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>
        )
    else
        return (
            <div>
                <h1 style={{ textAlign: "center", color: "green" }}>{title}</h1>
                {post.map((post, index) =>
                    <PostItem number={index + 1} post={post} key={post.id} remove={remove}/>
                )}
            </div>
        )
}