'use client';

import Link from "next/link";

export default function ListItem({ result }) {

    const handleDelete = (_id) => {
        fetch(`/api/post/delete/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="list-bg">
        {
            result.map((item) => {
                return (
                   <div className="list-item" key={item._id}>
                    <Link prefetch={false} href={`/detail/${item._id}`}>{item.title}</Link>    
                    <p>{item.content}</p>
                    <Link href={`/edit/${item._id}`} className="list-btn">✏️</Link>
                    <span onClick={() => handleDelete(item._id)}>🗑️</span>
                   </div>
                )
            })
        }
      </div>
    )
}
