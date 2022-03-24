import React, { useMemo } from 'react'
import { useTable, Column, useSortBy } from 'react-table'

interface Props {
  standings: Array<Data>
}

interface Data {
  rank: number,
  team: string,
  played: number,
  wins: number,
  draws: number,
  losses: number,
  goalsFor: number,
  goalsAgainst: number,
  goalsDiff: number,
  points: number,
  form: string
}

export const StandingsTable = ({ standings }: Props) => {
  const columns: Array<Column<Data>> = useMemo(() => [
    {
      Header: 'Rank',
      accessor: 'rank',
    },
    {
      Header: 'Team',
      accessor: 'team',
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
    },
  ], [])
  const data: Array<Data> = useMemo(() => standings, [])

  const { 
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows
  } = useTable({ columns, data }, useSortBy)

  return (
    <table className='table-auto w-full lg:w-1/2 text-center text-sm' 
      {...getTableProps()}>
      <thead className='bg-gray-900 text-white'>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            { headerGroup.headers.map((column) => (
              <th className='py-0.5' {...column.getHeaderProps()}>
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
            <tr className='even:bg-gray-100 hover:bg-gray-300' {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td className='py-0.5' {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default StandingsTable