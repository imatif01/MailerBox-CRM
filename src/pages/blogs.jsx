import React from 'react';
import TableLayout from 'components/atoms/TableLayout';
import Table from 'components/molecules/Table';
import blogService from 'services/blogService';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from 'context/authContext';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { ActionBtnHolder } from 'styles/helpers.styles';
import ModalContainer from 'components/molecules/ModalContainer';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import Tooltip from 'components/atoms/Tooltip';
import Button from 'components/atoms/Button';
import BlogForm from 'components/organisms/BlogForm';
import Toast from 'components/molecules/Toast';
import BlogDetailModal from 'components/organisms/BlogDetailModal';
import AddNewLanguageBlogForm from 'components/organisms/addNewBlogLanguage';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    itemsPerPage: 10,
    searchText: '',
    startDate: '',
    endDate: '',
    filterText: '',
    filterCategory: '',
  });
  const {refetch, hasPermission } = useContext(AuthContext);

  const { blogs_data, blogs_loading } = blogService.GetBlogs(searchQuery, refetch);
  const onDeleteBlog = async id => {
    try {
      await blogService.deleteBlog(id);
      refetch();
      Toast({
        message: 'Post deleted successfully',
        type: 'success',
      });
    } catch (ex) {
      Toast({
        type: 'error',
        message: ex.message,
      });
    }
  };
  const actionBtns = _ => (
    <ActionBtnHolder numOfBtns={4}>
      {hasPermission('post.view') && (
        <ModalContainer
          lg
          title="Post Detail"
          btnComponent={({ onClick }) => (
            <Tooltip title={`Details (${_?.content?.title.slice(0, 15)}`} type="dark">
              <Button unStyled css="color: var(--primary);" onClick={onClick}>
                <i className="material-icons-outlined">description</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <BlogDetailModal onClose={onClose} blog={_} />}
        />
      )}
      {hasPermission('blogs.update') && (
        <ModalContainer
          lg
          title="Edit Post"
          btnComponent={({ onClick }) => (
            <Tooltip title="Edit" type="dark">
              <Button unStyled className="edit-btn" onClick={onClick}>
                <i className="material-icons-outlined">edit</i>
              </Button>
            </Tooltip>
          )}
          content={({ onClose }) => <BlogForm onClose={onClose} isEdit={true} blogData={_} />}
        />
      )}

      {/* {
        // hasPermission('post.view-comments')
        _?.content?.length < 4 && (
          <ModalContainer
            lg
            title="Add In New Language"
            btnComponent={({ onClick }) => (
              <Tooltip title="Add in New Language" type="dark">
                <Button unStyled css="color: var(--primary);" onClick={onClick}>
                  <i className="material-icons-outlined">comments</i>
                </Button>
              </Tooltip>
            )}
            content={({ onClose }) => (
              <AddNewLanguageBlogForm
                id={_?.id}
                onClose={onClose}
                currentLanguages={_?.content?.map(ele => ele?.language)}
              />
            )}
          />
        )
      } */}
      {hasPermission('blogs.delete') && (
        <ConfirmationModal
          title="Are you sure you want to delete this record?"
          subtitle="you can't undo this action"
          deleteModal
          onOk={() => onDeleteBlog(_._id)}
          btnComponent={({ onClick }) => (
            <Tooltip title="Delete" type="dark">
              <Button unStyled size={20} className="delete-btn" onClick={onClick}>
                <i className="material-icons-outlined">delete_forever</i>
              </Button>
            </Tooltip>
          )}
        />
      )}
    </ActionBtnHolder>
  );
  const { totalCount, blogs_rows } = useMemo(
    () => ({
      blogs_rows: blogs_data?.blogs?.map(_ => [
        format(new Date(_.created_at), 'yyyy-MM-dd'),
        _?.title,
        _.author?.name,
        _.category?.title,
        actionBtns(_),
      ]),
      totalCount: blogs_data.totalItems,
    }),
    [blogs_data],
  );
  const columnNames = [`Created at`, `Title`, `Author`, `Category`, ``];

  return (
    <TableLayout
      exportBtn={undefined}
      onChangeFilters={filters => {
        setSearchQuery(_ => ({
          ..._,
          ...filters,
        }));
      }}
      currentPage={searchQuery.page}
      totalCount={totalCount}
      pageSize={searchQuery.pageSize}>
      <Table width={1200} loading={blogs_loading} rowsData={blogs_rows} columnNames={columnNames} noPadding />
    </TableLayout>
  );
}
