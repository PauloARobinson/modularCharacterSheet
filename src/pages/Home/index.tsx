import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Title, Subtitle } from './styles';
import TemplateSelector from '../../components/TemplateSelector';
import CharacterSheet from '../../components/CharacterSheet';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [selectedSystem, setSelectedSystem] = useState('dnd5e');

  return (
    <Container>
      <Title>{t('welcome')}</Title>
      <Subtitle>{t('choose_rpg')}</Subtitle>
      <TemplateSelector value={selectedSystem} onChange={setSelectedSystem} />
      <CharacterSheet system={selectedSystem} />
    </Container>
  );
};

export default Home;
