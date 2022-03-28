import Link from 'next/link'
import { useMemo } from 'react'
import { Column, useTable } from 'react-table'

type Props = {
  name: string
  headerAccessor: string,
  cellAccessor: string,
  cellClassName: string
  statistic: Array<any>
}

const StatTable = ({ name, headerAccessor, cellAccessor, cellClassName, statistic }: Props) => {
  const columns: Array<Column<any>> = useMemo(
    () => [
      {
        Header: name,
        accessor: headerAccessor,
        Cell: (e) => 
          <div className="text-left">
            <Link href={e.value.replace(/\s+/g, '')} passHref>
              <a className="hover:underline">{e.value}</a>
            </Link>
          </div>,
      },
      {
        Header: '',
        accessor: cellAccessor,
        Cell: (e) => (
          <div className='flex justify-end'>
            <div
              className={`w-10 rounded-md text-white text-center 
                font-medium ${cellClassName}`}
                >
              {e.value}
            </div>
          </div>
          
        ),
      },
    ],
    []
  )
  const data: Array<any> = useMemo(() => statistic, [])

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({ columns, data })

  return (
    <div className="w-full flex flex-column mb-2 sm:basis-1/2 md:basis-1/3">
      <table
        className="w-full table-auto text-center text-sm"
        {...getTableProps()}
      >
        <thead className="bg-gray-900 text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-1.5 py-0.5 text-left"
                  {...column.getHeaderProps()}
                >
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
                  <td
                    className="px-1.5 py-0.5"
                    {...cell.getCellProps()}
                  >
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

export default StatTable
