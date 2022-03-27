import { useMemo } from 'react'
import { Column, useTable } from 'react-table'

type Props = {
  name: string
  accessor: string
  statistic: Array<any>
}

const LeagueStatTable = ({ name, accessor, statistic }: Props) => {
  const columns: Array<Column<any>> = useMemo(
    () => [
      {
        Header: name,
        accessor: 'name',
      },
      {
        Header: '',
        accessor: accessor
      },
    ],
    []
  )
  const data: Array<any> = useMemo(() => statistic, [])

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({ columns, data })

  return (
    <div className="flex-column w-full">
      <h1 className="mb-2 text-2xl font-semibold">League Statistics</h1>
      <table
        className="w-full table-auto text-center text-sm lg:w-1/2"
        {...getTableProps()}
      >
        <thead className="bg-gray-900 text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="py-0.5" {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr
                className="even:bg-gray-100 hover:bg-gray-300"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td className="py-0.5" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LeagueStatTable
