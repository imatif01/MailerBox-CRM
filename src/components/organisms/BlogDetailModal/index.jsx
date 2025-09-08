import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import Grid from 'components/atoms/Grid';
import DetailsCard from 'components/molecules/DetailsCard';
import InfoCard from 'components/molecules/InfoCard';
import Button from 'components/atoms/Button';
import { format } from 'date-fns';
import ConfirmationModal from 'components/molecules/ConfirmationModal';
import blogService from 'services/blogService';
import Toast from 'components/molecules/Toast';
import { AuthContext } from 'context/authContext';
import UpdateBlogLanguageInformationForm from 'components/organisms/UpdateBlogLanguageInformation';
import ModalContainer from 'components/molecules/ModalContainer';

function BlogDetailModal({ blog }) {
  const { refetch } = useContext(AuthContext);

  const handleDelete = async (id, language) => {
    try {
      await blogService.deleteLanguage(id, language);
      refetch();
      Toast({
        message: 'Blog language deleted successfully',
        type: 'success',
      });
    } catch (ex) {
      Toast({
        type: 'error',
        message: ex.message,
      });
    }
  };

  return (
    <>
      <DetailsCard title="General Information" gray>
        <Grid sm={4} gap={20}>
          <InfoCard title="CreatedAt" value={format(new Date(blog?.created_at), 'yyyy-MM-dd') || 'N/A'} $unStyled />
          <InfoCard title="Author" value={blog?.author?.name || 'N/A'} $unStyled />
          <InfoCard title="Category" value={blog?.category?.categoryTitle || 'N/A'} $unStyled />
          <InfoCard title="Slug" value={blog?.slug || 'N/A'} $unStyled />
        </Grid>
      </DetailsCard>

      {/* {blog?.content?.map((contentItem, index) => ( */}
      <DetailsCard key={blog?.content?.id} title={`Blog Information`} gray>
        <Grid sm={4} gap={20} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <InfoCard title="Title" value={blog?.content.title || 'N/A'} $unStyled />
            <InfoCard title="Meta Title" value={blog?.content.metaTitle || 'N/A'} $unStyled />
            <InfoCard title="Meta Description" value={blog?.content.metaDescription || 'N/A'} $unStyled />
            <InfoCard
              title="Description"
              value={<div dangerouslySetInnerHTML={{ __html: blog?.content?.description || 'N/A' }} />}
              $unStyled
            />
          </div>

          {/* <div>
            <ModalContainer
              lg
              title="Edit Blog Information"
              btnComponent={({ onClick }) => (
                <Button unStyled className="edit-btn" onClick={onClick}>
                  <i className="material-icons-outlined">edit</i>
                </Button>
              )}
              content={({ onClose }) => (
                <UpdateBlogLanguageInformationForm onClose={onClose} blogId={blog?.id} blogData={contentItem} />
              )}
            />

            {contentItem.language !== 'en' && (
              <ConfirmationModal
                title="Are you sure you want to delete this record?"
                subtitle="you can't undo this action"
                deleteModal
                onOk={() => handleDelete(blog?.id, contentItem.language)}
                btnComponent={({ onClick }) => (
                  <Button unStyled size={20} className="delete-btn" onClick={onClick}>
                    <i className="material-icons-outlined">delete_forever</i>
                  </Button>
                )}
              />
            )}
          </div> */}
        </Grid>
      </DetailsCard>
      {/* ))} */}
    </>
  );
}

export default BlogDetailModal;
