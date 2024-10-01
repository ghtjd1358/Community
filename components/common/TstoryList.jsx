import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRssPosts } from '../../redux/features/blogSlice';

const MyTistoryPosts = () => {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector(state => state.blog);
    // console.log('posts', posts)

    useEffect(() => {
        dispatch(fetchRssPosts());
    }, [dispatch]);

    // let content;

    // if (status === 'loading') {
    //     content = <p>Loading...</p>;
    // } else if (status === 'failed') {
    //     content = <p>Error: {error}</p>;
    // } else if (posts.length === 0) {
    //     content = <p>No posts found.</p>;
    // } else {
    //     posts.map((post, index) => (
    //         <div key={index}>
    //             <h2>{post.title}</h2>
    //             <p>{new Date(post.pubDate).toLocaleDateString()}</p>
    //             <a href={post.link} target="_blank" rel="noopener noreferrer">Read More</a>
    //         </div>
    //     ));
    // }

    return (
        <div>
            <h1>asdf</h1>
        </div>
    );
};

export default MyTistoryPosts;
