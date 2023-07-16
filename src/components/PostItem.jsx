import React from "react";
import { MyButton } from "./UI/button/MyButton";
import '../styles/App.css'

export const PostItem = (props) => {
    return (
        <div className='post'>
            <div className='post_content'>
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
                <div className='post-btns'>
                    <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
                </div>
            </div>
        </div>
    );
}