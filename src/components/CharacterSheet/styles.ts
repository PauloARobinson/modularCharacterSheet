import styled from 'styled-components';

export const SheetContainer = styled.div.attrs({ className: 'print-sheet' })`
  margin: 2em auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
  background: ${({ theme }) => theme.colors.box};
  padding: 2em;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 21cm;
  min-height: 29.7cm;
  box-sizing: border-box;
`;
