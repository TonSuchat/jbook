import { FC } from "react";
import { useActions } from "../../hooks/useActions";
import "./AddCell.css";

type AddCellProps = {
  previouseCellId: string | null;
  forceVisible?: boolean;
};

const AddCell: FC<AddCellProps> = ({
  previouseCellId,
  forceVisible = false,
}) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previouseCellId || "", "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previouseCellId || "", "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>

      <div className="divider" />
    </div>
  );
};

export default AddCell;
