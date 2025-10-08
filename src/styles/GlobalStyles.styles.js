import { createGlobalStyle, css } from 'styled-components/macro';
import { normalize } from 'polished';
import Variables from './variables.css';
import Fonts from './Fonts';

// prettier-ignore
const Styling = css`
  /* theme css variables */
  ${Variables}

  /* Fonts = Plus Jakarta Sans */
  ${Fonts}

  /* (normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css) */
  ${normalize()}

  /* Other Reset that aren't define in normalize.css*/
  html {
    box-sizing: border-box;
    font-size: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    color: var(--base-text-color);
    background: var(--base-background-color);
    font: var(--font-size-base) / var(--line-height-base) var(--base-font-family);
    font-weight: 500;
    position: relative;
    min-width: var(--base-min-width);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* &.nav-active {
      @media (max-width: 575px) {
        overflow: hidden;
      }
    } */

    &.panel-active {
      overflow: hidden;
      &:before {
        display: block;
      }
    }

    &:before {
      display: none;
      content: '';
      position: absolute;
      top: 0;
      bottom: -10%;
      left: 0;
      right: 0;
      backdrop-filter: blur(4px);
      background: rgba(50, 59, 75, 0.3);
      z-index: 9;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    vertical-align: top;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }


  textarea {
    resize: vertical;
    vertical-align: top;
  }

  .imgLoader {
    width: 150px;
    margin: 0 auto;
  }

  button,
  input[type='button'],
  input[type='reset'],
  input[type='file'],
  input[type='submit'] {
    cursor: pointer;
  }

  form,
  fieldset {
    margin: 0;
    padding: 0;
    border-style: none;
  }
  a {
    text-decoration: none;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    display: none;
  }

  a,
  button {
    transition: opacity var(--animation-speed) ease-in-out, background var(--animation-speed) ease-in-out,
      visibility var(--animation-speed) ease-in-out, border var(--animation-speed) ease-in-out,
      color var(--animation-speed) ease-in-out;
  }

  button {
    padding: 0;
    border: none;
    background: none;
    outline: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 1.25rem;
  }

  p {
    margin: 0;
  }

  /************* custom scrollbar styles ************/

  /* This will work on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--primary) #eceaf9;
  }

  /* Targtes on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    border-radius: 30px;
    background: #eceaf9;
  }

  *::-webkit-scrollbar-thumb {
    background: var(--primary);
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.03);
    border-radius: 30px;
  }

  /* Remove Arrows/Spinners from input type number */

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    appearance: textfield;
  }

  .react-datepicker {
    font-family: var(--base-font-sans-serif);
    border: none;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
  }
  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    background-color: var(--primary);
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: var(--dark);
    color: var(--white);
  }

  .react-datepicker__day--keyboard-selected:hover,
  .react-datepicker__month-text--keyboard-selected:hover,
  .react-datepicker__quarter-text--keyboard-selected:hover,
  .react-datepicker__year-text--keyboard-selected:hover {
    background-color: var(--primary);
  }

  .react-datepicker__day--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ),
  .react-datepicker__month-text--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ),
  .react-datepicker__quarter-text--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ),
  .react-datepicker__year-text--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ) {
    background-color: var(--primary);
    opacity: 0.5;
  }

  .react-datepicker__day--selected:hover,
  .react-datepicker__day--in-selecting-range:hover,
  .react-datepicker__day--in-range:hover,
  .react-datepicker__month-text--selected:hover,
  .react-datepicker__month-text--in-selecting-range:hover,
  .react-datepicker__month-text--in-range:hover,
  .react-datepicker__quarter-text--selected:hover,
  .react-datepicker__quarter-text--in-selecting-range:hover,
  .react-datepicker__quarter-text--in-range:hover,
  .react-datepicker__year-text--selected:hover,
  .react-datepicker__year-text--in-selecting-range:hover,
  .react-datepicker__year-text--in-range:hover {
    background-color: var(--primary);
    opacity: 0.7;
  }
  .react-datepicker__close-icon {
    &:after {
      padding: 0 !important;
      line-height: 16px !important;
      display: block !important;
      background: var(--primary) !important;
    }
  }
  .react-datepicker__header {
    background: none;
    border: none;
    padding-bottom: 0;
    padding-top: 15px;
  }
  .react-datepicker__day-name {
    color: var(--light-gray);
    font-weight: bold;
  }
  .react-datepicker-popper {
    z-index: var(--z-55);
  }
`;

const HelperClasses = css`
  .hidden {
    display: none;
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .d-block {
    display: block;
  }
  .text-center {
    text-align: center;
  }
  .font-bold {
    font-weight: bold;
  }
  .font-medium {
    font-weight: 500;
  }
  .wrapper {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }
  .text-dark {
    color: var(--secondary-text-color);
  }
  .text-primary {
    color: var(--primary-text-color);
  }
  .truncate-sm {
    @media (max-width: 575px) {
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .truncate-md {
    @media (min-width: 768px) {
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .truncate-text {
    display: inline-block;
    max-width: 300px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mb-20 {
    margin-bottom: var(--gutter);
  }

  [class^='material-icons-'],
  [class*=' material-icons-'] {
    font-size: inherit;
  }
  [data-reach-menu-popover] {
    z-index: 50;
  }

  //rc picker style
  .rc-picker-dropdown {
    box-shadow: none;
  }
  .rc-picker-time-panel-cell {
    &.rc-picker-time-panel-cell-selected {
      background: var(--primary);
    }
  }
  .rc-picker-time-panel-column {
    &:not(:last-child) {
      border-right: 1px solid #ccc;
    }
  }
  .rc-picker-panel-container {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  }
  .rc-picker-panel {
    background: #fff;
    border: none;
  }
  .rc-picker-range-separator {
    padding-left: 15px;
    padding-right: 15px;
    font-size: var(--font-size-xl);
    line-height: 1;
  }

  .rc-picker-dropdown .rc-picker-range-arrow {
    box-shadow: 2px -2px 6px #0000000f;
  }

  .rc-picker-dropdown .rc-picker-range-arrow:after {
    display: none;
  }
  .rc-picker-dropdown .rc-picker-range-arrow:before {
    border: 5px solid var(--white);
    border-color: var(--white) var(--white) transparent transparent;
  }
  .rc-picker-body {
    padding: 10px;
  }
  .rc-picker-header {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    gap: 6px;
  }
  .rc-picker-footer {
    background: none !important;
    border-top: 1px solid #ccc;
    padding: 5px 10px;
  }

  .rc-picker-datetime-panel .rc-picker-time-panel {
    border-left-color: #ccc;
  }
  .rc-picker-ok {
    button {
      background: var(--primary);
      color: var(--white);
      padding: 5px 10px;
      border-radius: 3px;
      font-size: var(--font-size-sm);
    }
  }
  .rc-picker-range .rc-picker-active-bar {
    background: var(--primary);
  }

  .rc-picker-cell-in-range > .rc-picker-cell-inner {
    background: rgba(52, 219, 161, 0.4);
  }

  .rc-picker-cell-range-start > .rc-picker-cell-inner,
  .rc-picker-cell-range-end > .rc-picker-cell-inner,
  .rc-picker-cell-selected > .rc-picker-cell-inner {
    background: var(--primary);
  }
  .rc-picker-cell-today > .rc-picker-cell-inner {
    border: 1px solid var(--primary);
  }
  .rc-picker-content thead th {
    font-size: var(--font-size-xs);
  }
  .rc-picker-cell-inner:hover {
    background: rgba(171, 233, 101, 0.4);
  }
  .rc-picker-dropdown {
    z-index: var(--z-55);
  }
  .rc-picker-header-view {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    gap: 10px;
    button {
      &:hover {
        color: var(--primary);
      }
    }
  }

  .rc-picker-clear {
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    z-index: 2;
  }
  .star-rating {
    font-size: 24px !important;
  }
`;

const GlobalStyles = createGlobalStyle`
  ${Styling}
  ${HelperClasses}
`;

export default GlobalStyles;
