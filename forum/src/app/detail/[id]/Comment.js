'use client'
import { useEffect, useState } from "react";

export default function Content({ _id }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const fetchComments = () => {
        fetch(`/api/comment/list?id=${_id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('그녀석입니다만!!!!!!!', data);
                setComments(data);
            });
    };

    useEffect(() => {
        fetchComments();
    }, [setComments]);

    return (
        <div>
            <div>
                <hr />
                {comments.length > 0 ? (
                    comments.map((item, i) => (
                        <div key={i} style={{ display: 'flex' }}>
                            <h4 style={{ marginRight: '10px' }}>{item.username}</h4>
                            <p>{item.content}</p>
                        </div>
                    ))
                ) : (
                    <div>댓글이 없다</div>
                )}
            </div>
            <input value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={() => {
                fetch('/api/post/comment/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment: comment, _id: _id })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('server에서 받은 댓글부대', data);
                        setComment('');
                        fetchComments(); 
                    });
            }}>댓글전송</button>
        </div>
    );
}
