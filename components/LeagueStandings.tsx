import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import { Column, useTable } from 'react-table'

type Props = {
  name: string
  standings: Array<Team>
}

type Team = {
  rank: number
  name: string
  id: number
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

export const LeagueStandings = ({ name, standings }: Props) => {
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
          formsJSX.push(SingleForm('W', '/', 'bg-green-600'))
          break
        case 'D':
          formsJSX.push(SingleForm('D', '/', 'bg-gray-400'))
          break
        case 'L':
          formsJSX.push(SingleForm('L', '/', 'bg-orange-600'))
          break
        default:
          formsJSX.push(SingleForm(result, '/', 'bg-gray-400'))
      }
    }

    return <>{formsJSX.map((formJSX) => formJSX)}</>
  }, [])

  const columns: Array<Column<Team>> = useMemo(
    () => [
      {
        Header: '',
        accessor: 'rank',
        Cell: (e) => {
          let classNames = ''
          if (e.value < 5) classNames = 'bg-green-600 rounded-md text-white'  
          else if (e.value === 5) classNames = 'bg-blue-400 rounded-md text-white'
          else if (e.value > 17) classNames = 'bg-orange-400 rounded-md text-white'
          return <div className={`w-6 text-center font-medium ${classNames}`}>{e.value}</div>
        },
      },
      {
        Header: <div className="text-left">Team</div>,
        accessor: 'name',
        Cell: (e) => (
          <div className="text-left">
            <Link href={e.value.replace(/\s+/g, '')} passHref>
              <a className="hover:underline">{e.value}</a>
            </Link>
          </div>
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
        Cell: (e) => <div className='font-medium'>{e.value}</div>
      },
      {
        Header: '',
        accessor: 'form',
        Cell: (e) => (
          <div className="flex justify-end space-x-1">{Form(e.value)}</div>
        ),
      },
    ],
    []
  )
  const data: Array<Team> = useMemo(() => standings, [])

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({ columns, data })

  return (
    <>
      <h1 className="mb-1 text-2xl font-semibold">{name} Table</h1>
      <div className="mb-4 w-full overflow-x-auto">
        <table
          className="w-full table-auto text-center text-sm"
          {...getTableProps()}
        >
          <thead className="bg-gray-900 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="px-1.5 py-0.5" {...column.getHeaderProps()}>
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
                    <td className="px-1 py-0.5" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default LeagueStandings
