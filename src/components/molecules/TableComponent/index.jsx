// import React, { useState } from 'react';
// import 'styled-components/macro';
// import Skeleton from 'react-loading-skeleton';
// import { TableRow } from 'components/atoms/TableRow';
// import TableCell from 'components/atoms/TableCell';
// import { StyledTable, TableHolder, TBody, TableScroll, Thead, NoRecordFound } from './TableComponent.styles';
// import { useParams } from 'react-router-dom';

// // TODO:Remove nested ternary and add loading
// function TableComponent({
//   loading,
//   columnNames,
//   rowsData,
//   height,
//   center,
//   sm,
//   headSm,
//   onClick = () => {},
//   noPadding,
//   width,
//   responsive = true,
//   enquiries_data,
//   positions_data,
//   ...props
// }) {
//   return (
//     <>
//       <TableHolder responsive={responsive} noPadding={noPadding}>
//         <TableScroll $height={height}>
//           <StyledTable $width={width} responsive={responsive} {...props}>
//             <Thead responsive={responsive}>
//               <TableRow responsive={responsive}>
//                 {columnNames.map((item, index) => (
//                   <TableCell responsive={responsive} heading key={index} center={center} headSm={headSm}>
//                     {item}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </Thead>
//             <TBody responsive={responsive}>
//               {loading ? (
//                 Array(10)
//                   .fill()
//                   .map((item, i) => (
//                     <TableRow key={i} responsive={responsive}>
//                       {columnNames?.map(index => (
//                         <TableCell responsive={responsive} key={index}>
//                           <Skeleton width={100} height={15} />
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//               ) : rowsData?.length ? (
//                 rowsData?.map((row, index) => (
//                   <TableRow key={index} onClick={() => onClick(row)} responsive={responsive}>
//                     {row?.map((el, i) => (
//                       <TableCell responsive={responsive} data-th={columnNames[i]} key={i} center={center} sm={sm}>
//                         {el}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <tr
//                   css={`
//                     @media (max-width: 991px) {
//                       grid-column: span 2 / span 2;
//                     }
//                   `}>
//                   <td
//                     colSpan={columnNames?.length}
//                     className="text-center"
//                     css={`
//                       @media (max-width: 991px) {
//                         display: block;
//                       }
//                     `}>
//                     <NoRecordFound>No Record Found</NoRecordFound>
//                   </td>
//                 </tr>
//               )}
//             </TBody>
//           </StyledTable>
//         </TableScroll>
//       </TableHolder>
//     </>
//   );
// }

// export default TableComponent;

// import React from 'react';
// import 'styled-components/macro';
// import Skeleton from 'react-loading-skeleton';
// import { TableRow } from 'components/atoms/TableRow';
// import TableCell from 'components/atoms/TableCell';
// import { StyledTable, TableHolder, TBody, TableScroll, Thead, NoRecordFound } from './TableComponent.styles';
// import { useParams } from 'react-router-dom';

// function TableComponent({
//   loading,
//   columnNames,
//   rowsData,
//   height,
//   center,
//   sm,
//   headSm,
//   onClick = () => {},
//   noPadding,
//   width,
//   responsive = true,
//   enquiries_data,
//   positions_data,
//   ...props
// }) {
//   const getStatusColor = status => {
//     switch (status) {
//       case 'Pending':
//         return '#FFCDD2'; // Red
//       case 'Cold Leads':
//         return '#BBDEFB'; // Blue
//       case 'Warm Leads':
//         return '#FFF9C4'; // Yellow
//       default:
//         return 'inherit'; // Default color
//     }
//   };

//   return (
//     <>
//       <TableHolder responsive={responsive} noPadding={noPadding}>
//         <TableScroll $height={height}>
//           <StyledTable $width={width} responsive={responsive} {...props}>
//             <Thead responsive={responsive}>
//               <TableRow responsive={responsive}>
//                 {columnNames.map((item, index) => (
//                   <TableCell responsive={responsive} heading key={index} center={center} headSm={headSm}>
//                     {item}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </Thead>
//             <TBody responsive={responsive}>
//               {loading ? (
//                 Array(10)
//                   .fill()
//                   .map((item, i) => (
//                     <TableRow key={i} responsive={responsive}>
//                       {columnNames?.map(index => (
//                         <TableCell responsive={responsive} key={index}>
//                           <Skeleton width={100} height={15} />
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//               ) : rowsData?.length ? (
//                 rowsData?.map((row, index) => (
//                   <TableRow key={index} onClick={() => onClick(row)} responsive={responsive}>
//                     {row?.map((el, i) => {
//                       if (columnNames[i] === 'Status') {
//                         return (
//                           <TableCell
//                             key={i}
//                             responsive={responsive}
//                             data-th={columnNames[i]}
//                             style={{ backgroundColor: getStatusColor(el) }}>
//                             {el}
//                           </TableCell>
//                         );
//                       } else {
//                         return (
//                           <TableCell responsive={responsive} data-th={columnNames[i]} key={i} center={center} sm={sm}>
//                             {el}
//                           </TableCell>
//                         );
//                       }
//                     })}
//                   </TableRow>
//                 ))
//               ) : (
//                 <tr
//                   css={`
//                     @media (max-width: 991px) {
//                       grid-column: span 2 / span 2;
//                     }
//                   `}>
//                   <td
//                     colSpan={columnNames?.length}
//                     className="text-center"
//                     css={`
//                       @media (max-width: 991px) {
//                         display: block;
//                       }
//                     `}>
//                     <NoRecordFound>No Record Found</NoRecordFound>
//                   </td>
//                 </tr>
//               )}
//             </TBody>
//           </StyledTable>
//         </TableScroll>
//       </TableHolder>
//     </>
//   );
// }

// export default TableComponent;

import React from 'react';
import 'styled-components/macro';
import Skeleton from 'react-loading-skeleton';
import { TableRow } from 'components/atoms/TableRow';
import TableCell from 'components/atoms/TableCell';

// import { TableCell } from 'components/atoms/TableCell'; // Import TableCell from your components
import { StyledTable, TableHolder, TBody, TableScroll, Thead, NoRecordFound } from './TableComponent.styles';
import { useParams } from 'react-router-dom';

function TableComponent({
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
  minHeight,
  ...props
}) {
  const getStatusColor = status => {
    switch (status) {
      case 'Assigned':
        return '#BBDEFB'; // Red
      case 'Upcoming':
        return '#FFCDD2'; // Red
      case 'Completed':
        return '#BBDEFB'; // Blue
      case 'Cancelled':
        return '#FF6666'; // red
      case 'Pending':
        return '#FFF9C4'; // Yellow
      default:
        return 'Pending'; // Default color
    }
  };

  return (
    <>
      <TableHolder responsive={responsive} noPadding={noPadding} $minHeight={minHeight}>
        <TableScroll $height={height}>
          <StyledTable $width={width} responsive={responsive} {...props}>
            <Thead responsive={responsive}>
              <TableRow responsive={responsive}>
                {columnNames.map((item, index) => (
                  <TableCell
                    responsive={responsive}
                    heading
                    key={index}
                    center={center}
                    headSm={headSm}
                    // style={{ padding: '0.8rem 1.8rem' }}
                  >
                    <div
                      style={
                        {
                          // fontSize: '16px',
                          // fontWeight: 700,
                          // color: '#28B781',
                          // padding: '2px',
                        }
                      }>
                      {item}
                    </div>
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
                        <TableCell
                          responsive={responsive}
                          key={index}
                          style={{ fontSize: '14px', fontWeight: 600, color: '#424954' }}>
                          <Skeleton width={100} height={15} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : rowsData?.length ? (
                rowsData?.map((row, index) => (
                  <TableRow key={index} onClick={() => onClick(row)} responsive={responsive}>
                    {row?.map((el, i) => {
                      if (columnNames[i] === 'Status') {
                        return (
                          <TableCell
                            key={i}
                            responsive={responsive}
                            data-th={columnNames[i]}
                            // style={{ padding: '0.8rem 1.8rem' }}
                          >
                            <div
                              className="tablerow"
                              style={{
                                backgroundColor: getStatusColor(el),
                                color: '#424954',
                                padding: '2px 8 px',
                                borderRadius: '30px',
                                textAlign: 'center',
                              }}>
                              {el}
                            </div>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            responsive={responsive}
                            data-th={columnNames[i]}
                            key={i}
                            center={center}
                            sm={sm}
                            // style={{ padding: '0.8rem 1.8rem' }}
                          >
                            <div className="tablerow">{el}</div>
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))
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
                      /* @media (max-width: 480px) {
                        font-size: 9px;
                      } */
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

export default TableComponent;
