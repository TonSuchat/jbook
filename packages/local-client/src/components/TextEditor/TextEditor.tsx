import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useRef, FC } from "react";
import { Cell } from "../../store/state/cell";
import { useActions } from "../../hooks/useActions";
import "./TextEditor.css";

type TextEditorProps = {
  cell: Cell;
};

const TextEditor: FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      )
        return;
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () =>
      document.removeEventListener("click", listener, { capture: true });
  }, []);

  return (
    <>
      {editing ? (
        <div className="text-editor" ref={ref}>
          <MDEditor
            value={cell.content}
            onChange={(value) => updateCell(cell.id, value || "")}
          />
        </div>
      ) : (
        <div className="text-editor" onClick={() => setEditing(true)}>
          <div className="card-content">
            <MDEditor.Markdown source={cell.content || "Click to edit"} />
          </div>
        </div>
      )}
    </>
  );
};

export default TextEditor;
