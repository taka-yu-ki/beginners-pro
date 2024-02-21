import { useCallback, useEffect, useState } from "react";
import { BsTextParagraph } from "react-icons/bs";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { MdFormatQuote, MdFormatListNumbered, MdFormatListBulleted, MdCode } from "react-icons/md";
import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $isHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $wrapNodes } from "@lexical/selection";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, INSERT_CHECK_LIST_COMMAND, $isListNode, ListNode } from "@lexical/list";
import { $getNearestNodeOfType } from "@lexical/utils";
import { $createCodeNode, CODE_LANGUAGE_FRIENDLY_NAME_MAP, $isCodeNode } from "@lexical/code";
import { CODE_LANGUAGE_COMMAND } from "@/LexicalPlugins/CodeHighlightPlugin";

// ツールタイプ
const SupportedBlockType = {
  paragraph: "Paragraph",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  quote: "Quote",
  number: "Numbered List",
  bullet: "Bulleted List",
  code: "Code Block",
};

// プログラミング言語の取得
const CodeLanguagesOptions = Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP).map(
  ([value, label]) => ( { value, label })
);

const button_style = "inline-flex items-center justify-center w-10 h-10 text-2xl rounded-md text-gray-400 hover:bg-gray-200 aria-checked:text-gray-600";

export default function ToolbarPlugin() {
  const [blockType, setBlockType] = useState("paragraph");
  const [codeLanguage, setCodeLanguage] = useState("");
  
  const [editor] = useLexicalComposerContext();
  
  // 標準ボタンの処理
  const formatParagraph = useCallback(() => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
  }, [blockType, editor]);
  
  // ヘッダーボタンの処理
  const formatHeading = useCallback(
    (type) => {
      if (blockType !== type) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => $createHeadingNode(type));
          }
        });
      }
    },
    [blockType, editor],
  );
  
  // 引用ボタンの処理
  const formatQuote = useCallback(() => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
  }, [blockType, editor]);
  
  // 番号リストボタンの処理
  const formatNumberedList = useCallback(() => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);
  
  // リストボタンの処理
  const formatBulletedList = useCallback(() => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);
  
  // コードボタンの処理
  const formatCode = useCallback(() => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
  }, [blockType, editor]);
  
  // 対応するボタンの切り替え
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const anchorNode = selection.anchor.getNode();
        const targetNode =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();

        if ($isHeadingNode(targetNode)) {
          const tag = targetNode.getTag();
          
          setBlockType(tag);
          
        } else if ($isListNode(targetNode)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const listType = parentList ? parentList.getListType() : targetNode.getListType();
          
          setBlockType(listType);
        } else {
          if ($isCodeNode(targetNode)) {
            setCodeLanguage(targetNode.getLanguage() || "");
          }
          
          const nodeType = targetNode.getType();
          if (nodeType in SupportedBlockType) {
            setBlockType(nodeType);
          } else {
            setBlockType("paragraph");
          }
        }
      });
    });
  }, [editor]);

  return (
    <div className="flex space-x-2 m-1 overflow-x-scroll">
      <button
        type="button"
        role="checkbox"
        title={SupportedBlockType["paragraph"]}
        aria-label={SupportedBlockType["paragraph"]}
        aria-checked={blockType === "paragraph"}
        onClick={formatParagraph}
        className={button_style}
      >
        <BsTextParagraph />
      </button>
      <button
        type="button"
        role="checkbox"
        title={SupportedBlockType["h1"]}
        aria-label={SupportedBlockType["h1"]}
        aria-checked={blockType === "h1"}
        onClick={() => formatHeading("h1")}
        className={button_style}
      >
        <LuHeading1 />
      </button>
      <button
        type="button"
        role="checkbox"
        title={SupportedBlockType["h2"]}
        aria-label={SupportedBlockType["h2"]}
        aria-checked={blockType === "h2"}
        onClick={() => formatHeading("h2")}
        className={button_style}
      >
        <LuHeading2 />
      </button>
      <button
        type="button"
        role="checkbox"
        title={SupportedBlockType["h3"]}
        aria-label={SupportedBlockType["h3"]}
        aria-checked={blockType === "h3"}
        onClick={() => formatHeading("h3")}
        className={button_style}
      >
        <LuHeading3 />
      </button>
      <button
        type="button"
        role="checkbox"
        title={SupportedBlockType["quote"]}
        aria-label={SupportedBlockType["quote"]}
        aria-checked={blockType === "quote"}
        onClick={formatQuote}
        className={button_style}
      >
        <MdFormatQuote />
      </button>
      <button
        type="button"
        role="checkbox"
        title={SupportedBlockType["number"]}
        aria-label={SupportedBlockType["number"]}
        aria-checked={blockType === "number"}
        onClick={formatNumberedList}
        className={button_style}
      >
        <MdFormatListNumbered />
      </button>
      <button
        type="button"
        role="checkbox"
        title={SupportedBlockType["bullet"]}
        aria-label={SupportedBlockType["bullet"]}
        aria-checked={blockType === "bullet"}
        onClick={formatBulletedList}
        className={button_style}
      >
        <MdFormatListBulleted />
      </button>
      <button
        type="button"
        role="checkbox"
        title={SupportedBlockType["code"]}
        aria-label={SupportedBlockType["code"]}
        aria-checked={blockType === "code"}
        onClick={formatCode}
        className={button_style}
      >
       <MdCode />
      </button>
      {blockType === "code" && (
          <select
            aria-label="code languages"
            value={codeLanguage}
            onChange={event =>
              editor.dispatchCommand(CODE_LANGUAGE_COMMAND, event.target.value)
            }
            className="py-2 pl-2 pr-8 rounded-md border border-gray-300 cursor-pointer"
          >
            <option value="">選択する...</option>
            {CodeLanguagesOptions.map(item => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
      )}
    </div>
  );
}
