import React, { useContext, useState } from "react";
import { Editor } from "primereact/editor";
import { BlogContext } from "../context/BlogContext";
export default function BlogEditor(props){
    const {text, setText} = useContext(BlogContext);
    
    const handleChange = (e)=>{
          setText(e.htmlValue)
          console.log(text)
    }

    return (
        <div className="card">
            <Editor value={props.value} onTextChange={handleChange} style={{ height: '200vh', margin:4 }} placeholder="Write your Blog Here ..."/>
        </div>
    )
}
