import React, { useState } from 'react'

export default function TextForm(props) {
    
    const [text, setText] = useState('');

    const handleUpClick = () => {
        // console.log("Uppercase was clicked");
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Uppercase!", "success");
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lowercase!", "success");
    }

    const handleClearText = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text has been cleared!", "success");
    }

    const handleCopyText = () => {
        var copyText = document.getElementById("textBox");
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
        props.showAlert("Copied to clipboard!", "success");
    }

    const toSentenceCase = () => {
        let newText = text
            .split(". ")
            .map((e) => e.toLowerCase().charAt(0).toUpperCase() + e.slice(1))
            .join(". ");
        setText(newText);
        props.showAlert("Converted to SentenceCase!", "success");
    }

    const handleExtraSpaces = () => {
        let newText = text.replace(/ +/g, ' ').trim();
        setText(newText);
        props.showAlert("Extra spaces has been removed!", "success");
    }

    const handleOnChange = (event) => {
        // console.log("On Change");
        setText(event.target.value);
        countWords(event.target.value);
    }

    const [wordCount, setWordCount] = useState(0);

    const countWords = (count) => {
        let c = 0;
        let str = count.split(" ");
        for (let i = 0; i < str.length; i++) {
            if (str.length === 0) {
                setWordCount(0);
            }
            if (str[i] !== "") {
                c++;
            }
        }
        setWordCount(c);
    }

    return (
        <>
            <div style={{ color: props.mode === 'dark' ? 'white' : '#042740' }}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{
                        backgroundColor: props.mode === 'dark' ? 'grey' : 'white',
                        color: props.mode === 'dark' ? 'white' : '#042740'
                    }} id="textBox" rows="5"></textarea>
                </div>
                <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert To Uppercase</button>
                <button className="btn btn-primary mx-1" onClick={handleLoClick}>Convert To Lowercase</button>
                <button className="btn btn-primary mx-1" onClick={handleClearText}>Clear Text</button>
                <button className="btn btn-primary mx-1" onClick={handleCopyText}>Copy Text</button>
                <button className="btn btn-primary mx-1" onClick={toSentenceCase}>Convert to SentenceCase</button>
                <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>

                <div className="my-3">
                    <h2>Your text summary</h2>
                    <p>{wordCount} words and {text.length} characters</p>
                    <p>{0.008 * wordCount} Minutes read</p>
                    <h2>Preview</h2>
                    <p>{text.length > 0 ? text : "Enter something in the textbox to preview it here"}</p>
                </div>
            </div>
        </>
    )
}
