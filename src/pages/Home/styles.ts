import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5em;
`;

export const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 400;
`;
