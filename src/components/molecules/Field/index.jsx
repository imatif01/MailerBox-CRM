import React, { forwardRef, useState } from 'react';

// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import Label from 'components/atoms/Label';
import Input from 'components/atoms/Input';
import InputIcon from 'components/atoms/InputIcon';
import FakeLabel from 'components/atoms/FakeLabel';
import FakeInput from 'components/atoms/FakeInput';
import { StyledFormGroup } from 'styles/helpers.styles';
import { Error, InputHolder } from './Field.styles';
import DatePicker from '../DatePicker';
import UploadFile from 'components/organisms/Dropzone';

const defaultProps = {
  type: 'text',
};

const Field = forwardRef(
  (
    {
      accept,
      rules,
      error,
      name,
      invalid,
      label,
      type,
      prefix,
      suffix,
      rounded,
      noMargin,
      margin,
      button,
      searchField,
      onClickSuffix,
      makeSuffixPointable,
      onlyRead,
      labelIcon,
      disabled,
      datePicker,
      clear,
      clrWhite,
      ...props
    },
    ref,
  ) => {
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const inputProps = {
      id: props.id ?? name,
      name,
      type,
      accept,
      invalid,
      error,
      'aria-describedby': `${name}Error`,
      ...props,
    };
    const renderInputFirst = type === 'checkbox' || type === 'radio';
    return (
      <StyledFormGroup
        $invalid={invalid || error}
        noMargin={noMargin}
        css={`
          margin-bottom: ${margin};
        `}>
        {renderInputFirst && label && (
          <Label
            htmlFor={inputProps.id}
            labelIcon={labelIcon}
            onlyRead={onlyRead}
            clear={clear}
            css="display: flex !important; align-items:center; margin-bottom:0 !important;">
            <Input
              {...inputProps}
              ref={ref}
              disabled={disabled}
              $invalid={invalid || error}
              checked={inputProps?.value}
              // eslint-disable-next-line no-shadow
              onChange={({ target: { name, checked } }) => inputProps?.onChange?.({ target: { name, value: checked } })}
            />
            <FakeInput>{type === 'checkbox' && <i className="icon-check material-icons-outlined">check</i>}</FakeInput>
            <FakeLabel required={rules?.filter(({ required }) => required).length}>{label}</FakeLabel>
          </Label>
        )}

        {renderInputFirst || (
          <>
            {label && (
              <Label
                onClear={() =>
                  inputProps?.onChange?.({ target: { name, value: type === 'datepicker' ? [null, null] : '' } })
                }
                clear={clear}
                labelIcon={labelIcon}
                htmlFor={inputProps.id}
                required={rules?.filter(({ required }) => required).length}
                clrWhite={clrWhite}>
                {label}
              </Label>
            )}
            <InputHolder $searchField={searchField}>
              {/* input left icon */}
              {prefix && (
                <InputIcon
                  disabled={disabled}
                  prefix={prefix}
                  invalid={invalid || error}
                  css={type === 'search' && 'color: var(--primary); font-size: 25px; left: 11px;'}>
                  {prefix}
                </InputIcon>
              )}

              {/* password field */}
              {type === 'password' ? (
                <>
                  <Input
                    ref={ref}
                    {...inputProps}
                    $prefix={prefix}
                    $suffix={suffix}
                    $invalid={invalid || error}
                    type={isRevealPwd ? 'text' : 'password'}
                    $rounded={rounded}
                    disabled={disabled}
                    $button={button && true}
                    autoComplete="on"
                    clrWhite={clrWhite}
                  />
                  <InputIcon
                    disabled={disabled}
                    suffix
                    css="cursor: pointer"
                    onClick={() => setIsRevealPwd(prevState => !prevState)}>
                    {isRevealPwd ? (
                      <i className="material-icons-outlined">visibility</i>
                    ) : (
                      <i className="material-icons-outlined">visibility_off</i>
                    )}
                  </InputIcon>
                </>
              ) : type === 'datepicker' ? (
                <DatePicker {...inputProps} prefix={prefix} $invalid={invalid || error} />
              ) : type === 'chooseFile' ? (
                <UploadFile {...inputProps}  />
              ) : (
                <>
                  {/* any other input type */}
                  <Input
                    ref={ref}
                    {...inputProps}
                    $prefix={prefix}
                    disabled={disabled}
                    $suffix={suffix}
                    $invalid={invalid || error}
                    $rounded={rounded}
                    $button={button && true}
                    clrWhite={clrWhite}
                  />
                  {/* input right icon */}
                  {suffix && (
                    <InputIcon
                      suffix={suffix}
                      makeSuffixPointable={makeSuffixPointable}
                      onClick={onClickSuffix}
                      disabled={disabled}
                      invalid={invalid || error}>
                      {suffix}
                    </InputIcon>
                  )}
                  {button && (
                    <div
                      css={`
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 10px;
                      `}>
                      {button}
                    </div>
                  )}
                </>
              )}
            </InputHolder>
          </>
        )}
        {invalid ||
          (error && (
            <Error id={`${name}Error`} role="alert">
              {error}
            </Error>
          ))}
      </StyledFormGroup>
    );
  },
);

Field.defaultProps = defaultProps;

export default Field;
