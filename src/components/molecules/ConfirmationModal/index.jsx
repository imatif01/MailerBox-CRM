import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import Heading from 'components/atoms/Heading';
import Button from 'components/atoms/Button';
import Modal from 'components/molecules/Modal';
import { BtnHolder, Subtitle } from './ConfirmationModal.styles';
import { useEffect } from 'react';

function ConfirmationModal({
  cancelText = 'Cancel',
  btnComponent,
  title,
  subtitle,
  deleteModal,
  confirmationModal,
  children,
  onOk = async () => {},
}) {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const body = document.body;
    body.style.overflow = isVisible ? 'hidden' : 'auto';
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isVisible]);
  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };
  // useEffect(() => {
  //   if (!isVisible) {
  //     onModalClose();
  //   }
  // }, [isVisible]);
  return (
    <>
      {btnComponent && btnComponent({ onClick: showModal })}
      <Modal isOpen={isVisible} setIsOpen={setIsVisible}>
        <>
          <Heading level={3} css="margin-bottom: 10px; font-weight: 500;">
            {title}
          </Heading>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {children ?? null}
          <BtnHolder>
            <Button type="outline" width={130} onClick={handleCancel}>
              {cancelText}
            </Button>
            {deleteModal && (
              <Button
                loading={loading}
                type="danger"
                width={130}
                onClick={async () => {
                  setLoading(true);
                  await onOk();
                  handleCancel();
                  setLoading(false);
                }}>
                {deleteModal.length === undefined ? 'Yes' : deleteModal}
              </Button>
            )}
            {confirmationModal && (
              <Button
                type="primary"
                width={130}
                onClick={async () => {
                  setLoading(true);
                  await onOk();
                  handleCancel();
                  setLoading(false);
                }}
                loading={loading}>
                {confirmationModal}
              </Button>
            )}
          </BtnHolder>
        </>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
