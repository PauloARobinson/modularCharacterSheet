import React from 'react';
import { SelectorContainer, Label, Select } from './styles';

const systems = [
  { value: 'dnd5e', label: 'D&D 5e' },
  { value: 'dnd3.5', label: 'D&D 3.5e' },
  { value: 'pathfinder', label: 'Pathfinder' },
  { value: 'custom', label: 'Custom' },
];

interface TemplateSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ value, onChange }) => {
  return (
    <SelectorContainer>
      <Label htmlFor="rpg-system">RPG System</Label>
      <Select
        id="rpg-system"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {systems.map((sys) => (
          <option key={sys.value} value={sys.value}>{sys.label}</option>
        ))}
      </Select>
    </SelectorContainer>
  );
};

export default TemplateSelector;
