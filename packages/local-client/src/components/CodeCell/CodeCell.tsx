import { FC, useEffect } from "react";
import { CodeEditor } from "../CodeEditor";
import { Preview } from "../Preview";
import { Resizable } from "../Resizable";
import { ProgressBar } from "../ProgressBar";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { Cell } from "../../store/state/cell";
import { useActions } from "../../hooks/useActions";
import "./CodeCell.css";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";

type CodeCellProps = {
  cell: Cell;
};

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const bundle = useTypeSelector(({ bundles }) => bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);
  const { updateCell, createBundle } = useActions();

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.content, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="preview-wrapper">
          {!bundle || bundle.loading ? (
            <ProgressBar />
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
