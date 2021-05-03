export type CellTypes = 'code' | 'text'
export type CellDirection = 'up' | 'down'

export type Cell = {
    id: string;
    type: CellTypes,
    content: string
}