import React, {useState} from 'react';
import MyButton from './UI/button/MyButton';
import MyInp from './UI/input/MyInp';

const PostForm = ({callback}) => {
    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e) => {
        e.preventDefault();

        const newPost = {
            ...post, id: Date.now()
        };

        callback(newPost);
        setPost({title: '', body: ''});
      }

    return (
        <form>
            <h2>Форма создания поста</h2>
            <MyInp 
            value={post.title}
            onChange={event => setPost({...post, title: event.target.value})}
            type="text" 
            placeholder='Название поста'/>
            <MyInp 
            value={post.body}
            onChange={event => setPost({...post, body: event.target.value})}
            type="text" 
            placeholder='Описание поста'/>
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>             
    );
}

export default PostForm;