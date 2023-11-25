import { _tab as tab, _tbody as tbody, _td as td, _th as th, _thead as thead, _tr as tr } from './tags';

export function table(columns: string[], rows: Array<any[]>) {
  return tab([
    thead([tr(columns.map((c) => th([c])))]),
    tbody(
      rows.map((row, i) =>
        tr(
          row.map((cell) => td([cell])),
          i % 2 ? 'bg-gray' : ''
        )
      )
    ),
  ]);
}
