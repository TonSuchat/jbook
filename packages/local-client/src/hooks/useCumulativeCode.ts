import { useTypeSelector } from "./useTypeSelector";

const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    var show = (value) => {
      const root = document.querySelector('#root');
      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        }
        else root.innerHTML = JSON.stringify(value);
      }
      else root.innerHTML = value;
    }
  `;
const showFuncNoop = `var show = () => {}`;

export const useCumulativeCode = (cellId: string) => {
  return useTypeSelector(({ cells }) => {
    const orderdCells = cells.order.map((id) => cells.data[id]);
    const contents = [];
    for (let c of orderdCells) {
      if (c.type === "code") {
        if (c.id === cellId) contents.push(showFunc);
        else contents.push(showFuncNoop);
        contents.push(c.content);
      }
      if (c.id === cellId) break;
    }
    return contents;
  }).join("\n");
};
