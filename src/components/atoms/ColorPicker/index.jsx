/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react';
import useOutsideAlerter from '../../../hooks/useOutsideAlert';
import { ColorHolder, Color, ColorField } from './ColorPicker.styles';

const ColorPicker = ({ onChange = () => {} }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [fontColor, setFontColor] = useState('#000000');
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setShowPicker(false);
  });
  const handleColor = color => {
    setFontColor(color);
    onChange(color);
    setShowPicker(false);
  };
  return (
    <ColorField ref={wrapperRef}>
      <div
        className={`btnColor ${fontColor === '#000000' ? 'btn-black' : ''}`}
        onClick={() => {
          setShowPicker(prev => !prev);
        }}>
        <div className="btn-text">
          <span className="text">Font Color</span>
          <span className="material-icons-outlined">colorize</span>
        </div>
      </div>
      {showPicker && (
        <ColorHolder>
          <Color
            onClick={() => {
              handleColor('#ffffff');
            }}
          />
          <Color
            $color="black"
            onClick={() => {
              handleColor('#000000');
            }}
          />
        </ColorHolder>
      )}
    </ColorField>
  );
};

export default ColorPicker;
