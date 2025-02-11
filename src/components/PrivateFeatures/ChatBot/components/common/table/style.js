import styled from "styled-components";

export default styled.div`
  height: 100%;
  .chatbot-table-view {
    --table-spacing: 0.55em;
    & * {
      box-sizing: border-box;
    }
    --table-bg-color: #ffffff;
    --table-hover-color: #f6f8f9;
    --cell-border-radius: 10px;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 var(--table-spacing);
    & thead {
      position: sticky;
      top: calc(.9 * var(--table-spacing));
      z-index: 99;
      & th {
        & > * {
          padding: 0.5em 0.75em;
          margin: 0 -1px;
          margin-bottom: 2px;
        }
      }
    }
    & tbody tr {
      background: white;
      outline: 8px solid var(--chatbot-light-grey);
      border-radius: 20px;
      &:not(.disable-hover) {
        cursor: pointer;
      }
      &:not(.disable-hover):hover {
        background: #f6f8f9;
      }
    }
    & thead tr {
      background: white;
      outline: var(--table-spacing) solid var(--chatbot-light-grey);
      border-radius: 20px;
    }
    & tbody td {
      border-style: none solid solid none;
      & > * {
        padding: 1.25em 0.75em;
      }
    }
    .table-sort-button {
      border-radius: 0.25em;
      &:hover {
        background-color: var(--chatbot-light-grey);
      }
    }
    .onhover-header-cell {
      cursor: pointer;
      &:hover {
        background-color: var(--chatbot-grey);
      }
    }
  }
`;
