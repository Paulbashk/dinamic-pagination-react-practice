import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PostItem from './PostItem';

const PostList = ({posts, callback, title}) => {

    return posts.length === 0
        ?
            (
                <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
            )
        :
            (
                <div className="PostList" key='1' style={{marginBottom: '30px'}}>
                    <h1 style={{textAlign: 'center'}}>{title}</h1>
                    <TransitionGroup>
                        {[...posts].map((post, number) => 
                            <CSSTransition
                                key={post.id}
                                timeout={500}
                                classNames="post"
                            >
                                <PostItem callback={callback} post={post} number={number+1}/>
                            </CSSTransition>
                        )} 
                    </TransitionGroup>               
                </div>    
            );    
        
}

export default PostList;