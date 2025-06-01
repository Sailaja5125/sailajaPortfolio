import React, { useContext, useState } from "react";
import { Editor } from "primereact/editor";
import { BlogContext } from "../context/BlogContext";
export default function TextEditor(){
    const {text, setText} = useContext(BlogContext);
    const handleChange = (e)=>{
          setText(e.htmlValue)
    }
    return (
        <div className="card">
            <Editor value={text} onTextChange={handleChange} style={{ height: '200vh', margin:4 }} placeholder="Write your Blog Here ..."/>
        </div>
    )
}
