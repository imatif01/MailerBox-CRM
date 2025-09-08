import styled from 'styled-components/macro';
export const StyledTableLayout = styled.div``;

export const UserProfileWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
  margin: 10px auto 10px;
  position: relative;
  cursor: pointer;
  input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

export const PPImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UploadIcon = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
