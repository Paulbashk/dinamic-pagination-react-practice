import React, {useState} from 'react';
import MyButton from './UI/button/MyButton';
import {Link, useNavigate} from 'react-router-dom';

const PostItem = (props) => {
    let navigate = useNavigate();
    
    return (
        <div className="post" key={props.post.id}>
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div className="post__text">
                    {props.post.body} 
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>Открыть</MyButton>
                <MyButton onClick={() => props.callback(props.post)}>Удалить</MyButton>
            </div>
        </div>
    );
}

export default PostItem;