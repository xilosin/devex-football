import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import { Column, useTable } from 'react-table'

type Props = {
  name: string
  standings: Array<Data>
}

type Data = {
  rank: number
  team: string
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalsDiff: number
  points: number
  form: string
}

export const StandingsTable = ({ name, standings }: Props) => {
  const Form = useCallback((formString: string) => {
    const SingleForm = (formChar: string, route: string, bgColor: string) => {
      return (
        <Link href={route} passHref>
          <a
            className={`w-6 cursor-pointer rounded-md 
              px-1 text-center font-medium text-white 
              hover:underline ${bgColor}`}
          >
            {formChar}
          </a>
        </Link>
      )
    }

    let formsJSX: Array<JSX.Element> = []

    for (let result of formString) {
      switch (result) {
        case 'W':
          formsJSX.push(SingleForm('W', '/', 'bg-green-500'))
          break
        case 'D':
          formsJSX.push(SingleForm('D', '/', 'bg-gray-500'))
          break
        case 'L':
          formsJSX.push(SingleForm('L', '/', 'bg-red-500'))
          break
        default:
          formsJSX.push(SingleForm(result, '/', 'bg-gray-500'))
      }
    }

    return (
      <div className="flex justify-center space-x-1">
        {formsJSX.map((formJSX) => formJSX)}
      </div>
    )
  }, [])

  const columns: Array<Column<Data>> = useMemo(
    () => [
      {
        Header: 'Rank',
        accessor: 'rank',
      },
      {
        Header: 'Team',
        accessor: 'team',
        Cell: (e) => (
          <Link href={e.value} passHref>
            <a className="hover:underline">{e.value}</a>
          </Link>
        ),
      },
      {
        Header: 'P',
        accessor: 'played',
      },
      {
        Header: 'W',
        accessor: 'wins',
      },
      {
        Header: 'D',
        accessor: 'draws',
      },
      {
        Header: 'L',
        accessor: 'losses',
      },
      {
        Header: 'GF',
        accessor: 'goalsFor',
      },
      {
        Header: 'GA',
        accessor: 'goalsAgainst',
      },
      {
        Header: 'GD',
        accessor: 'goalsDiff',
      },
      {
        Header: 'Pts',
        accessor: 'points',
      },
      {
        Header: 'Form',
        accessor: 'form',
        Cell: (e) => Form(e.value),
      },
    ],
    []
  )
  const data: Array<Data> = useMemo(() => standings, [])

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({ columns, data })

  return (
    <div className="flex-column w-full">
      <h1 className="mb-2 text-2xl font-semibold">{name} Table</h1>
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

export default StandingsTable
