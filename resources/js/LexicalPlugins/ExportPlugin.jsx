import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isRootTextContentEmpty } from "@lexical/text";

export default function ExportPlugin({onChange}) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if(onChange) {
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    const isEmpty = $isRootTextContentEmpty(editor.isComposing());
                    if (isEmpty) {
                        onChange("");
                    } else {
                        const contentAsJSON = JSON.stringify(editorState);
                        onChange(contentAsJSON);
                    }
                });
            });
        }
    }, [editor, onChange]);
    
    return null;
}