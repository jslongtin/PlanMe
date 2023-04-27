import { useState } from 'react'

import './module.css'


// ref : https://chat.openai.com/chat

// FIXME real time update des plusieurs selecteurs a revoir , it's whack
function Module(props) {

    return (
        <div className="module">
            {props.children}
        </div>
    )
}

export default Module