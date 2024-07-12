'use client'

export default function Error({error, reset}){
    return (
        <div>
            <h4>{error}</h4>
            <button onClick={()=> { reset() }}>리셋</button>
        </div>
        
    )
}