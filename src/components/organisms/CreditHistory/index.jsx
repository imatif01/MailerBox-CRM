import React, { useState, useMemo, useContext } from 'react';
import { format } from 'date-fns';
import Pagination from 'components/molecules/Pagination';
import { CreditHistoySection } from './CreditHistory.style';
import customerService from 'services/customerService';
import { AuthContext } from 'context/authContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CreditHistory = ({ id }) => {
  const { refetch } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 5,
    getAll: false,
  });

  const { credit_history_data, credit_history_loading } = customerService.GetCustomerCreditHistory(
    id,
    searchQuery,
    refetch,
  );

  const columnNames = ['Date', 'Credits', 'Reason'];

  const { totalCount, credit_history_rows } = useMemo(
    () => ({
      credit_history_rows:
        credit_history_data?.creditHistory?.map(_ => ({
          id: _?.id,
          date: format(new Date(_.created_at), 'yyyy-MM-dd'),
          credits: _?.creditsUsed > 0 ? _?.creditsUsed : _?.newUpdatedCredits - _?.previousCredits,
          type: _.type,
          reason: _.reason,
        })) || [],
      totalCount: credit_history_data.totalItems || 0,
    }),
    [credit_history_data],
  );

  return (
    <CreditHistoySection>
      <div className="table-holder">
        <table>
          <thead>
            <tr>
              {columnNames?.map(ele => (
                <th key={ele}>{ele}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {credit_history_loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={_}>
                    <td>
                      <Skeleton width={100} />
                    </td>
                    <td>
                      <Skeleton width={50} />
                    </td>
                    <td>
                      <Skeleton width={150} />
                    </td>
                  </tr>
                ))
              : credit_history_rows.map((transaction, index) => (
                  <tr key={transaction?.id}>
                    <td>{transaction?.date}</td>
                    <td className={transaction?.type === 'credits_added' ? 'green-text' : 'red-text'}>
                      {transaction?.type === 'credits_added' ? '+' : '-'} {transaction?.credits}
                    </td>
                    <td>{transaction?.reason}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={searchQuery?.page}
          totalCount={totalCount}
          pageSize={searchQuery?.pageSize}
          onPageChange={_ =>
            setSearchQuery(prev => ({
              ...prev,
              page: _,
            }))
          }
        />
      </div>
    </CreditHistoySection>
  );
};

export default CreditHistory;
