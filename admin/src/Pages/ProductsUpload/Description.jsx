import React, { useState, useEffect, useRef } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/plugins.pkgd.min.css";
import "font-awesome/css/font-awesome.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";

export default function FroalaDescription({ product, update }) {
  const [content, setContent] = useState(product.description || "");
  const editorRef = useRef(null);

  const config = {
    placeholderText: "Write product description...",
    heightMin: 200,
    toolbarButtons: [
      ["bold", "italic", "underline", "strikeThrough"],
      ["formatOL", "formatUL"],
      ["textColor", "backgroundColor"],
      ["undo", "redo"],
      ["insertLink", "insertImage"],
    ],
    events: {
      initialized: function () {
        editorRef.current = this; // store editor instance
        console.log("Editor initialized with content:", this.html.get());
      },
      contentChanged: function () {
        const html = this.html ? this.html.get() : "";
        console.log("Content changed:", html);
        setContent(html);
        update("description", html);
      },
    },
  };

  // Also log the content on component mount in case it's empty
  useEffect(() => {
    console.log("Initial content:", content);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FroalaEditorComponent tag="textarea" model={content} config={config} />
  );
}
