import styled from 'styled-components';

export const SelectorContainer = styled.div`
  margin: 2em 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5em;
`;

export const Select = styled.select`
  padding: 0.5em 1em;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid #ccc;
  font-size: 1em;
`;
