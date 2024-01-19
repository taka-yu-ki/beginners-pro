import { useEffect } from "react";
import { createCommand, COMMAND_PRIORITY_CRITICAL, $getSelection, $isRangeSelection } from "lexical";
import { registerCodeHighlighting , $isCodeNode, CodeNode } from "@lexical/code";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const CODE_LANGUAGE_COMMAND = createCommand();

const registerCodeLanguageSelecting = (editor) => {
    return editor.registerCommand(
        CODE_LANGUAGE_COMMAND,
        (language, editor) => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return false;
            
            const anchorNode = selection.anchor.getNode();
            const targetNode = $isCodeNode(anchorNode)
                ? anchorNode
                : $getNearestNodeOfType(anchorNode, CodeNode);
            if (!targetNode) return false;
            
            editor.update(() => {
                targetNode.setLanguage(language);
            });
            
            return true;
        },
        COMMAND_PRIORITY_CRITICAL
    );
};

export default function CodeHighlightPlugin() {
    const [editor] = useLexicalComposerContext();
    
    useEffect(() => {
        return mergeRegister(
            registerCodeHighlighting(editor),
            registerCodeLanguageSelecting(editor)
        );
    }, [editor]);
    
    return null;
}