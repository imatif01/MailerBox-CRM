// import React, { useEffect, useState } from 'react';

// import Modal from 'components/molecules/Modal';

// function ModalContainer({
//   btnComponent,
//   content,
//   title,
//   xl,
//   lg,
//   sm,
//   isClosable,
//   onModalClose = () => {},
//   isOpen,
//   imgPreview,
//   width,
//   helpModal,
//   onClick,
// }) {
//   const [isVisible, setIsVisible] = useState(false);
//   const toggleBodyScroll = shouldHide => {
//     console.log('details', shouldHide);
//     document.body.style.overflow = shouldHide ? 'hidden' : 'auto';
//   };
//   const showModal = () => {
//     setIsVisible(true);
//   };

//   const handleCancel = () => {
//     onModalClose();
//     setIsVisible(false);
//   };

//   useEffect(() => {
//     toggleBodyScroll(isVisible);

//     return () => {
//       // Clean-up function to ensure scroll is enabled when component unmounts
//       // or modal state changes
//       toggleBodyScroll(false);
//     };
//   }, [isVisible]);

//   useEffect(() => {
//     if (!isVisible) {
//       onModalClose();
//     }
//   }, [isVisible, onModalClose]);
//   console.log('title', title);
//   console.log('content', content);
//   console.log('onClick', onClick);

//   return (
//     <>
//       {btnComponent && btnComponent({ onClick: showModal })}
//       <Modal
//         title={title}
//         isOpen={isVisible}
//         setIsOpen={x => {
//           setIsVisible(x);
//         }}
//         onClose={() => {
//           onModalClose();
//         }}
//         xl={xl}
//         lg={lg}
//         sm={sm}
//         width={width}
//         isClosable={isClosable}
//         helpModal={helpModal}
//         imgPreview={imgPreview}>
//         {content({ onClose: handleCancel })}
//       </Modal>
//     </>
//   );
// }

// export default ModalContainer;

import React, { useEffect, useState } from 'react';

import Modal from 'components/molecules/Modal';

function ModalContainer({
  btnComponent,
  content,
  title,
  xl,
  lg,
  sm,
  isClosable,
  onModalClose = () => {},
  isOpen,
  imgPreview,
  width,
  helpModal,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleBodyScroll = shouldHide => {
    document.body.style.overflow = shouldHide ? 'hidden' : 'auto';
  };
  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    onModalClose();
    setIsVisible(false);
  };

  useEffect(() => {
    toggleBodyScroll(isVisible);

    return () => {
      toggleBodyScroll(false);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      onModalClose();
    }
  }, [isVisible, onModalClose]);

  return (
    <>
      {btnComponent && btnComponent({ onClick: showModal })}
      <Modal
        title={title}
        isOpen={isVisible}
        setIsOpen={x => {
          setIsVisible(x);
        }}
        onClose={() => {
          onModalClose();
        }}
        xl={xl}
        lg={lg}
        sm={sm}
        width={width}
        isClosable={isClosable}
        helpModal={helpModal}
        imgPreview={imgPreview}>
        {content({ onClose: handleCancel })}
      </Modal>
    </>
  );
}

export default ModalContainer;
