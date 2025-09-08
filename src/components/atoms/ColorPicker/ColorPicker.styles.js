import styled from 'styled-components/macro';

export const ColorField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: 'relative';

  .btnColor {
    width: 180px;
    height: 40px;
    overflow: hidden;
    border-radius: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000 !important;
    cursor: pointer;
    border: 1px solid rgba(74, 85, 104, 0.1);
    .btn-text {
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      z-index: 5;
      font-size: 14px;
      background: none;
      pointer-events: none;
    }

    .LDWSf {
      position: initial;
    }

    .inputbox {
      position: absolute;
      padding: 0;
      border: 0;
      outline: none;
      margin: 0;
      background: none;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      transform: scale(1.5);
    }
    &.btn-black {
      color: #fff !important;
      background-color: #000;
    }
  }
`;
export const ColorHolder = styled.div`
  top: -39px;
  position: absolute;
  left: 50%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  padding: 5px;
  gap: 6px;
  background: #8b878763;
  transform: translateX(-50%);
  border-radius: 5px;
  z-index: 5 !important;
  &::after {
    content: '';
    z-index: -1 !important;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    bottom: -7px;
    width: 15px;
    height: 15px;
    /* background: red; */
  }
`;
export const Color = styled.div`
  width: 35px;
  height: 35px;
  background: ${({ $color }) => ($color === 'black' ? '#000' : 'var(--white)')};
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;
