import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { formatBytes } from 'helpers/common';
import Button from 'components/atoms/Button';
import { UploadFileWrapper, SelectedFiles } from './dropzone.styles';
import Toast from 'components/molecules/Toast';
import Modal from 'components/molecules/Modal';

import DnDProvider from 'components/organisms/DragDND/DnDProvider';
import SortableFileItem from 'components/organisms/DragDND/sortableItem';

const UploadFile = ({
  invalid,
  error,
  multiple = false,
  maxFiles = 1,
  accept = { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
  onChange,
  fileSize = 15,
  displayFile,
  ...props
}) => {
  const [originalFiles, setOriginalFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewModal, setPreviewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const handleChange = newFiles => {
    if (!newFiles.length) {
      return;
    }

    const existingFiles = newFiles.filter(file =>
      selectedFiles.some(selected => selected.name === file.name && selected.path === file.path),
    );

    if (existingFiles.length > 0) {
      existingFiles.forEach(file => {
        Toast({
          type: 'warning',
          message: `${file.name} has already been uploaded.`,
        });
      });
    }

    const uniqueFiles = newFiles.filter(file => !selectedFiles.some(selected => selected.name === file.name));

    if (multiple) {
      const oversizedFiles = uniqueFiles.filter(file => file.size / (1024 * 1024) > fileSize);

      if (oversizedFiles.length > 0) {
        oversizedFiles.forEach(file => {
          Toast({
            type: 'error',
            message: `${file.name} has size greater than ${fileSize} MB!`,
          });
        });

        return;
      }
    } else {
      const [singleFile] = uniqueFiles;
      const fileLengthMB = singleFile.size / (1024 * 1024);

      if (fileLengthMB > fileSize) {
        Toast({
          type: 'error',
          message: `File must not be greater than ${fileSize} MB!`,
        });

        return;
      }
    }

    const updatedFiles = uniqueFiles.map(file => {
      if (!(file instanceof File)) {
        return file.preview;
      }
      const updatedFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      });
      return updatedFile;
    });

    if (multiple) {
      setOriginalFiles(prevFiles => [...prevFiles, ...updatedFiles]);
      onChange([...originalFiles.map(({ preview }) => preview), ...updatedFiles]);
    } else {
      onChange(updatedFiles[0]);
    }

    setSelectedFiles(prev => {
      if (multiple) {
        const totalFiles = [...prev, ...updatedFiles];
        return totalFiles.slice(0, maxFiles);
      }

      return updatedFiles;
    });
  };

  const getExtensions = () =>
    Object.values(accept)
      .flat()
      .join(', ')
      .replace(/, ([^,]*)$/, ' and $1');

  const handleDelete = fileToDelete => {
    setSelectedFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(file => file.preview !== fileToDelete.preview);

      const filteredFiles = updatedFiles.map(file => {
        if (!(file instanceof File)) {
          return file.preview;
        }
        return file;
      });
      onChange(filteredFiles.length > 0 ? filteredFiles : null);

      return updatedFiles;
    });

    if (multiple) {
      setOriginalFiles(prevFiles => {
        const updatedFiles = prevFiles.filter(file => file.preview !== fileToDelete.preview);

        const filteredFiles = updatedFiles.map(file => {
          if (!(file instanceof File)) {
            return file.preview;
          }
          return file;
        });

        onChange(filteredFiles.length > 0 ? filteredFiles : null);

        return updatedFiles;
      });
    }
  };

  const handleFilePreview = file => {
    setSelectedFile(file);
    setPreviewModal(true);
  };

  const handleDragEnd = reorderedFiles => {
    setOriginalFiles(reorderedFiles);

    setSelectedFiles(reorderedFiles);

    const filteredFiles = reorderedFiles.map(file => {
      if (!(file instanceof File)) {
        return file.preview;
      }
      return file;
    });
    onChange(filteredFiles);
  };

  useEffect(() => {
    if (displayFile) {
      const newFiles = multiple
        ? displayFile.map(file => ({
            name: 'Tap to preview',
            preview: file,
            timeStamp: Date.now() + Math.floor(Math.random() * 1000),
          }))
        : [
            {
              name: 'Tap to preview',
              preview: displayFile,
            },
          ];

      setSelectedFiles(newFiles);
      setOriginalFiles(newFiles);
    }
  }, [displayFile, multiple]);

  return (
    <>
      <Modal isOpen={previewModal} setIsOpen={setPreviewModal} lg>
        <div className="preview-img">{selectedFile && <img src={selectedFile.preview} alt="preview" />}</div>
      </Modal>

      <UploadFileWrapper $disabled={selectedFiles.length >= maxFiles} $invalid={invalid || error}>
        <Dropzone
          style={{
            border: '1px solid red',
          }}
          disabled={selectedFiles.length >= maxFiles}
          maxFiles={maxFiles}
          accept={accept}
          file
          multiple={multiple}
          onDrop={acceptedFiles => handleChange(acceptedFiles)}
          {...props}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} style={{ textAlign: 'center', margin: ' 0 0 30px' }}>
              <div>
                <div style={{ marginBottom: '5px' }}>
                  <i className="icon material-icons-outlined">cloud_upload</i>
                </div>
                <h4>Drop {multiple ? 'files' : 'file'} here or click to upload.</h4>
                <p style={{ fontSize: '16px' }}>
                  File must be in {getExtensions()} format.
                  {multiple && !!maxFiles && <span> You can upload up to {maxFiles} files.</span>}
                </p>
              </div>

              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>

        {selectedFiles.length > 0 && (
          <SelectedFiles>
            <DnDProvider items={selectedFiles} onDragEnd={handleDragEnd}>
              {selectedFiles.map(file => (
                <SortableFileItem id={file?.preview} key={file.preview} item={file}>
                  <div className="files">
                    <img
                      data-no-dnd="true"
                      onClick={() => handleFilePreview(file)}
                      data-dz-thumbnail=""
                      width={60}
                      height={60}
                      style={{ borderRadius: '5px', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
                      alt={file.name}
                      src={file.preview}
                      loading="lazy"
                    />
                    {file.name}
                    <p style={{ marginBottom: '0' }}>
                      <strong>{file.formattedSize}</strong>
                    </p>
                  </div>
                  <Button data-no-dnd="true" color="danger" onClick={() => handleDelete(file)}>
                    Delete
                  </Button>
                </SortableFileItem>
              ))}
            </DnDProvider>
          </SelectedFiles>
        )}
      </UploadFileWrapper>
    </>
  );
};

UploadFile.propTypes = {
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  accept: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  fileSize: PropTypes.number,
  displayFile: PropTypes.string,
};

export default UploadFile;
