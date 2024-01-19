import { useEffect } from "react";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function ImportPlugin({defaultContentAsJSON}) {
    const [editor] = useLexicalComposerContext();
    
    useEffect(() => {
        if (!defaultContentAsJSON) return;
        editor.update(() => {
            const editorState = editor.parseEditorState(defaultContentAsJSON);
            editor.setEditorState(editorState);
        });
    }, [editor, defaultContentAsJSON]);
    
    return null;
}