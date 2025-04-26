import styled from 'styled-components';

export const BoxContainer = styled.div`
  min-width: 120px;
  min-height: 80px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid #ccc;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  padding: 1em;
  margin: 0.5em 0;
  cursor: grab;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const BoxTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5em;
  color: ${({ theme }) => theme.colors.primary};
`;
