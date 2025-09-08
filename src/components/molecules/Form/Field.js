import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import Styled from 'styled-components/macro';
import FieldContext from './FieldContext';

export default class Field extends Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = FieldContext;

  cancelRegisterFunc;

  componentDidMount() {
    const { registerField } = this.context;
    this.cancelRegisterFunc = registerField(this);
  }

  componentWillUnmount() {
    if (this.cancelRegisterFunc) {
      this.cancelRegisterFunc();
    }
  }

  onStoreChange = (prevStore, curStore) => {
    const { shouldUpdate } = this.props;
    if (typeof shouldUpdate === 'function') {
      if (shouldUpdate(prevStore, curStore)) {
        this.forceUpdate();
      }
    } else {
      this.forceUpdate();
    }
  };

  getControlled = () => {
    const { name, children, ...rest } = this.props;
    const { getFieldValue, setFieldsValue, getFieldError } = this.context;

    return {
      error: getFieldError(name) ?? '',
      ...rest,
      value: getFieldValue(name) ?? '',
      onChange: event => {
        let newValue;

        if (event !== null) {
          if (event instanceof File) {
            newValue = event;
          } else if (Array.isArray(event)) {
            newValue = event;
          } else if (typeof event.target.value === 'object' && event?.target?.value !== null) {
            newValue = event?.target?.value;
          } else if (Array.isArray(event?.target?.value) || typeof event?.target?.value === 'boolean') {
            newValue = event?.target?.value ?? '';
          } else {
            newValue = event?.target?.value?.replace(/[^\S\r\n]{2,}/g, ' ') ?? '';
          }
          setFieldsValue({ [name]: newValue });
        } else {
          setFieldsValue({ [name]: '' });
        }
      },
    };
  };

  render() {
    const { children, ...rest } = this.props;
    return React.cloneElement(children, { ...this.getControlled(), ...rest });
  }
}
