import React, { useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";

// Froala base CSS
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

// Froala full plugins CSS
import "froala-editor/css/plugins.pkgd.min.css";

// Font Awesome for icons
import "font-awesome/css/font-awesome.css";

// Import Froala JS (editor + plugins)
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";

export default function FroalaDescription({ product, update }) {
  const [content, setContent] = useState(product.description || "");

  const config = {
    placeholderText: "Write product description...",
    heightMin: 200,

    // Enable all toolbar buttons you want (lists included)
    toolbarButtons: [
      ["bold", "italic", "underline", "strikeThrough"],
      ["formatOL", "formatUL"],
      ["textColor", "backgroundColor"],
      ["undo", "redo"],
      ["insertLink", "insertImage"],
    ],

    // Sync content changes
    events: {
      contentChanged: function (e, editor) {
        const html = editor.html.get();
        setContent(html);
        update("description", html);
      },
    },
  };

  return (
    <div>
      <FroalaEditorComponent tag="textarea" model={content} config={config} />
    </div>
  );
}
