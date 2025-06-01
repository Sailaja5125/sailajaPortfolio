import React, { useState } from "react";
import { BlogContext } from "./BlogContext";

export function BlogProvider({ children }) {
  const [text, setText] = useState("");

  return (
    <BlogContext.Provider value={{ text, setText }}>
      {children}
    </BlogContext.Provider>
  );
}
