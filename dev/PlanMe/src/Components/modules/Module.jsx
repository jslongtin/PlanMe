import { useState } from 'react'

import './module.css'


// ref : https://chat.openai.com/chat
function Module() {
    const [text, setText] = useState("");
    // useState(false) = valeure par default
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    
    const handleTextChange = (event) => {
        setText(event.target.value)
    }
    const handleBoldClick = () => {
        document.execCommand('bold', false, null);
        setBold(!bold)
    };

    const handleItalicClick = () => {
        document.execCommand('italic', false, null);
        setItalic(!italic)
    };

    const handleUnderlineClick = () => {
        document.execCommand('underline', false, null);
        setUnderline(!underline)
    };
    return (
        <div className="module">
            <div className="toolbar">
                <button className={bold ? "active" : ""} onClick={handleBoldClick}>B</button>
                <button className={italic ? "active" : ""} onClick={handleItalicClick}>I</button>
                <button  className={underline ? "active" : ""}  onClick={handleUnderlineClick}>U</button>
            </div>
            <div
                className="editor"
                contentEditable="true"
                dangerouslySetInnerHTML={{ __html: text }}
                onInput={handleTextChange}
            />
        </div>
    )
}

export default Module