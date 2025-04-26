import { createGlobalStyle } from 'styled-components';

export const PrintStyles = createGlobalStyle`
  @media print {
    body {
      background: #fff !important;
    }
    #root {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: unset;
    }
    .print-sheet {
      width: 21cm;
      min-height: 29.7cm;
      max-width: 21cm;
      margin: 0;
      box-shadow: none !important;
      background: #fff !important;
      color: #000 !important;
      page-break-after: always;
      padding: 1.5cm 1.2cm;
    }
    button, select, input, label, .no-print {
      display: none !important;
    }
  }
`;
