import React, { useState } from 'react';
import 'styled-components/macro';
import Skeleton from 'react-loading-skeleton';
import { TableRow } from 'components/atoms/TableRow';
import TableCell from 'components/atoms/TableCell';
import { StyledTable, TableHolder, TBody, TableScroll, Thead, NoRecordFound } from './Table.styles';
import { useParams } from 'react-router-dom';

// TODO:Remove nested ternary and add loading
function Table({
  loading,
  columnNames,
  rowsData,
  height,
  center,
  sm,
  headSm,
  onClick = () => {},
  noPadding,
  width,
  responsive = true,
  enquiries_data,
  positions_data,
  ...props
}) {
  return (
    <>
      <TableHolder responsive={responsive} noPadding={noPadding}>
        <TableScroll $height={height}>
          <StyledTable $width={width} responsive={responsive} {...props}>
            <Thead responsive={responsive}>
              <TableRow responsive={responsive}>
                {columnNames.map((item, index) => (
                  <TableCell responsive={responsive} heading key={index} center={center} headSm={headSm}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </Thead>
            <TBody responsive={responsive}>
              {loading ? (
                Array(10)
                  .fill()
                  .map((item, i) => (
                    <TableRow key={i} responsive={responsive}>
                      {columnNames?.map(index => (
                        <TableCell responsive={responsive} key={index}>
                          <Skeleton width={100} height={15} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : rowsData?.length ? (
                rowsData?.map((row, index) => {
                  return (
                    <TableRow
                      customBg={row[10]}
                      key={index}
                      onClick={() => onClick(row, index)}
                      responsive={responsive}>
                      {(enquiries_data ? row.slice(0, row.length - 1) : row)?.map((el, i) => (
                        <TableCell responsive={responsive} data-th={columnNames[i]} key={i} center={center} sm={sm}>
                          {el}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <tr
                  css={`
                    @media (max-width: 991px) {
                      grid-column: span 2 / span 2;
                    }
                  `}>
                  <td
                    colSpan={columnNames?.length}
                    className="text-center"
                    css={`
                      @media (max-width: 991px) {
                        display: block;
                      }
                    `}>
                    <NoRecordFound>No Record Found</NoRecordFound>
                  </td>
                </tr>
              )}
            </TBody>
          </StyledTable>
        </TableScroll>
      </TableHolder>
    </>
  );
}

export default Table;
