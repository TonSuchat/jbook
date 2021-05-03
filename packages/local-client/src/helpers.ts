import { v4 as uuidv4 } from "uuid";

export const generateId = () => uuidv4();

export const findOrderIndex = (order: string[], findIndex: string) =>
  order.findIndex((o) => o === findIndex);
