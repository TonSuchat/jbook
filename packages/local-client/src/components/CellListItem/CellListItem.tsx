import { FC } from "react";
import { Cell } from "../../store/state/cell";
import { CodeCell } from "../CodeCell";
import { TextEditor } from "../TextEditor";
import { ActionBar } from "../ActionBar";
import "./CellListItem.css";

type CellListItemProps = {
  cell: Cell;
};

const CellListItem: FC<CellListItemProps> = ({ cell }) => {
  const renderItem =
    cell.type === "code" ? (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    ) : (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  return <div className="cell-list-item">{renderItem}</div>;
};

export default CellListItem;
