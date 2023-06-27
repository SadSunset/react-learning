import React from "react";
import { PostItem } from "./PostItem";
import { TransitionGroup } from "react-transition-group";
import {CSSTransition} from "react-transition-group";

export const PostList = ({post, title, remove}) => {
    if (!post.length)
        return (
            <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>
        )
    else
        return (
            <div>
                <h1 style={{ textAlign: "center", color: "green" }}>{title}</h1>
                <TransitionGroup>
                    {post.map((post, index) =>
                        <CSSTransition
                            key={post.id}
                            timeout={500}
                            classNames="post"
                        >
                        <PostItem number={index + 1} post={post} key={post.id} remove={remove} />
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        )
}