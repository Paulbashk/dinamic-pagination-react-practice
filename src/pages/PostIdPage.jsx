import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../Components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import Comments from '../Components/Comments';
import NoMatch from './NoMatch';

const PostIdPage = () => {
    let params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsPostById(id);
        setComments(response.data);
    });    

    useEffect(() => {
        if(!params.id) {
            return <NoMatch />;
        }

        fetchPostById(params.id);
        fetchComments(params.id);
    }, []);
    
    return (
        <div style={{textAlign: 'center'}}>           
            <h1>Вы открыли страницу поста c ID = {params.id}</h1>
            {isLoading
                ? <Loader />
                : <div>{post.id}. {post.title}</div>
            }
            {isComLoading
                ? <Loader />
                : <Comments array={comments} />

            }
        </div>        
    );
}

export default PostIdPage;