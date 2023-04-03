import { useState } from 'react'

import './module.css'



function Module() {
    const [text, setText] = useState("");
    const textChange = (event) =>{
    
    
    }
    return (
        <div className="module">
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
    )
}

export default Module