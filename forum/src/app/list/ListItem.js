'use client';

import Link from "next/link";

export default function ListItem({ result }) {

    const handleDelete = (_id, e) => {
        fetch(`/api/post/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('데이터라라라라', data);
            e.target.parntElement.style.opacity = 0;
            setTimeout(()=>{
                e.target.parntElement.style.display = 'none';
            },1000)
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
                    <span onClick={(e) => handleDelete(item._id, e.target)}>🗑️</span>
                   </div>
                )
            })
        }
      </div>
    )
}
