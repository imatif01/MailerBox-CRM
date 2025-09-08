import { useRef, useEffect, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import ReactDOM from 'react-dom';
import { Flex } from '../../../styles/helpers.styles';
import { Background, ModalWrapper, ModalContent, CloseModalButton, ModalHeading } from './Modal.styles';

const modalRoot = document.getElementById('modal-root');

function Modal({
  isOpen,
  setIsOpen = () => {},
  title,
  children,
  sm,
  lg,
  xl,
  isClosable,
  imgPreview,
  width,
  helpModal,
  bgOpacity,
}) {
  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target && isClosable) {
      setIsOpen(false);
      document.body.style.overflow = 'visible';
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && isOpen && isClosable) {
        setIsOpen(false);
        document.body.style.overflow = 'visible';
      }
    },
    [setIsOpen, isOpen],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return ReactDOM.createPortal(
    isOpen ? (
      <Background onClick={closeModal} ref={modalRef}>
        <ModalWrapper isOpen={isOpen} $xl={xl} $lg={lg} $sm={sm} $width={width} imgPreview={imgPreview}>
          <ModalContent
            bgOpacity={bgOpacity}
            style={{
              background: helpModal ? 'var(--dark)' : 'var(--white)',
            }}>
            <Flex
              justify="space-between"
              align="middle"
              nowrap
              css={`
                ${!imgPreview && 'margin-bottom: 1.875rem;'}
                ${!title && 'margin-bottom: 0;'}
              `}>
              {!imgPreview && title && <ModalHeading level={2}>{title}</ModalHeading>}
              {isClosable !== false && (
                <CloseModalButton
                  className="btn-close"
                  type="secondary"
                  shape="circle"
                  onClick={() => {
                    setIsOpen(!isOpen);
                    document.body.style.overflow = 'visible';
                  }}
                  size={35}
                  css="flex-shrink:0;"
                  absolute={!title ? true : undefined}>
                  <i className="material-icons-outlined">close</i>
                </CloseModalButton>
              )}
            </Flex>
            {children}
          </ModalContent>
        </ModalWrapper>
      </Background>
    ) : null,
    modalRoot,
  );
}

export default Modal;
