import React from 'react';
import { BoxContainer, BoxTitle } from './styles';

interface DraggableBoxProps {
  title: string;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({ title }) => {
  return (
    <BoxContainer draggable>
      <BoxTitle>{title}</BoxTitle>
      {/* Box content goes here */}
    </BoxContainer>
  );
};

export default DraggableBox;
