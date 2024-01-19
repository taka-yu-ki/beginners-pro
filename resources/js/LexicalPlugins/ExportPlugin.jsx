import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export default function ExportPlugin({onChange}) {
    const [editor] = useLexicalComposerContext();
    
    useEffect(() => {
        if(onChange) {
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    const contentAsJSON = JSON.stringify(editorState);
                    onChange(contentAsJSON);
                });
            });
        }
    }, [editor, onChange]);
    
    return null;
}