import { FC, Fragment } from "react";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { AddCell } from "../AddCell";
import { CellListItem } from "../CellListItem";
import "./CellList.css";

const CellList: FC = () => {
  const cells = useTypeSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previouseCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previouseCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
