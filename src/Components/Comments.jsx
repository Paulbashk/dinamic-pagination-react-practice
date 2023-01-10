import React from 'react';

const Comments = ({array}) => {
    return (
        <div className='comments' style={{marginTop: '60px'}}>
            <h2 style={{marginBottom: '30px'}}></h2>
            {array.map(comment =>
                <div className='comment' key={comment.email}>
                    <h3>{comment.email}</h3>
                    <p>{comment.body}</p>
                </div>
            )}
        </div>
    );
}

export default Comments;