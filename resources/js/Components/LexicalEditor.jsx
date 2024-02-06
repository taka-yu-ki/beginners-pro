import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import AutoFocusPlugin from "@/LexicalPlugins/AutoFocusPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list"; 
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import ToolbarPlugin from "@/LexicalPlugins/ToolbarPlugin";
import CodeHighlightPlugin from "@/LexicalPlugins/CodeHighlightPlugin";
import ExportPlugin from "@/LexicalPlugins/ExportPlugin";
import ImportPlugin from "@/LexicalPlugins/ImportPlugin";

const theme = {
    heading: {
        h1: "text-4xl",
        h2: "text-2xl",
        h3: "text-xl",
    },
    quote: "px-4 ml-5 mb-2 border-l-4 border-gray-300 text-gray-500",
    list: {
        ul: "ml-4 list-inside list-disc",
        ol: "ml-4 list-inside list-decimal",
        listitem: "my-1 ml-8",
        nested: {
            listitem: "list-none",
        },
    },
    code: "relative px-2 py-2 pl-12 my-2 bg-slate-100 font-mono block leading-relaxed text-base overflow-x-auto before:content-[attr(data-gutter)] before:text-gray-600 before:absolute before:top-0 before:left-0 before:p-2 before:bg-slate-400 before:min-w-8 before:h-full before:text-right",
    codeHighlight: {
        atrule: "text-blue-700",
        attr: "text-blue-700",
        boolean: "text-red-500",
        builtin: "text-indigo-600",
        cdata: "text-gray-600",
        char: "text-indigo-600",
        class: "text-pink-600",
        "class-name": "text-pink-600",
        comment: "text-gray-600",
        constant: "text-red-500",
        deleted: "text-red-500",
        doctype: "text-gray-600",
        entity: "text-yellow-600",
        function: "text-pink-600",
        important: "text-orange-500",
        inserted: "text-indigo-600",
        keyword: "text-blue-700",
        namespace: "text-orange-500",
        number: "text-red-500",
        operator: "text-yellow-600",
        prolog: "text-gray-600",
        property: "text-red-500",
        punctuation: "text-gray-500",
        regex: "text-orange-500",
        selector: "text-indigo-600",
        string: "text-indigo-600",
        symbol: "text-red-500",
        tag: "text-red-500",
        url: "text-yellow-600",
        variable: "text-orange-500",
    },
};

export default function LexicalEditor({onChange = "", data, isEditable}) {
    const initialConfig = {
        namespace: "MyEditor",
        onError: (error) => console.error(error),
        nodes: [
            HeadingNode,
            QuoteNode,
            ListItemNode,
            ListNode,
            CodeNode,
            CodeHighlightNode
        ],
        theme: theme,
        editable: isEditable,
    };
    
    return (
        <div>
            {isEditable ? (
                <div className="mt-1 border border-gray-300 rounded-md shadow-sm">
                    <LexicalComposer initialConfig={initialConfig}>
                        <ToolbarPlugin />
                        <div className="relative p-6 border-t border-gray-300" style={{ minHeight: "300px" }}>
                            <RichTextPlugin
                                contentEditable={<ContentEditable className="outline-none" />}
                                placeholder={<div className="absolute text-gray-500 top-6 left-6 pointer-events-none user-select-none">学習を記録しよう</div>}
                                ErrorBoundary={LexicalErrorBoundary}
                            />
                            <AutoFocusPlugin />
                        </div>
                        <HistoryPlugin />
                        <TabIndentationPlugin />
                        <ListPlugin />
                        <CodeHighlightPlugin />
                        <ExportPlugin onChange={onChange} />
                        <ImportPlugin defaultContentAsJSON={data}/>
                    </LexicalComposer>
                </div>
            ) : (
            <div className="border border-gray-300 rounded-md">
                <LexicalComposer initialConfig={initialConfig}>
                    <div className="relative p-6">
                        <RichTextPlugin
                            contentEditable={<ContentEditable className="outline-none" />}
                        />
                    </div>
                    <CodeHighlightPlugin />
                    <ImportPlugin defaultContentAsJSON={data}/>
                </LexicalComposer>
            </div>
            )}
        </div>
    );
}