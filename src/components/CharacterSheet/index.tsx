import React, { useState, useRef } from 'react';
import { SheetContainer } from './styles';
import html2pdf from 'html2pdf.js';
import { PDFDocument } from 'pdf-lib';
import allClasses from '../../allClasses.json';
import allSpells from '../../allSpells.json';
import levelExperience from '../../levelExperience.json';
import abilityModifiers from '../../abilityModifiers.json';

const allPdfFields = [
  "ClassLevel", "Background", "PlayerName", "CharacterName", "Race ", "Alignment", "XP", "Inspiration", "STR", "ProfBonus", "AC", "Initiative", "Speed", "PersonalityTraits ", "STRmod", "HPMax", "ST Strength", "DEX", "HPCurrent", "Ideals", "DEXmod ", "HPTemp", "Bonds", "CON", "HDTotal", "Check Box 12", "Check Box 13", "Check Box 14", "CONmod", "Check Box 15", "Check Box 16", "Check Box 17", "HD", "Flaws", "INT", "ST Dexterity", "ST Constitution", "ST Intelligence", "ST Wisdom", "ST Charisma", "Acrobatics", "Animal", "Athletics", "Deception ", "History ", "Insight", "Intimidation", "Check Box 11", "Check Box 18", "Check Box 19", "Check Box 20", "Check Box 21", "Check Box 22", "Wpn Name", "Wpn1 AtkBonus", "Wpn1 Damage", "INTmod", "Wpn Name 2", "Wpn2 AtkBonus ", "Wpn2 Damage ", "Investigation ", "WIS", "Wpn Name 3", "Wpn3 AtkBonus  ", "Arcana", "Wpn3 Damage ", "Perception ", "WISmod", "CHA", "Nature", "Performance", "Medicine", "Religion", "Stealth ", "Check Box 23", "Check Box 24", "Check Box 25", "Check Box 26", "Check Box 27", "Check Box 28", "Check Box 29", "Check Box 30", "Check Box 31", "Check Box 32", "Check Box 33", "Check Box 34", "Check Box 35", "Check Box 36", "Check Box 37", "Check Box 38", "Check Box 39", "Check Box 40", "Persuasion", "SleightofHand", "CHamod", "Survival", "AttacksSpellcasting", "Passive", "CP", "ProficienciesLang", "SP", "EP", "GP", "PP", "Equipment", "Features and Traits", "CharacterName 2", "Age", "Height", "Weight", "Eyes", "Skin", "Hair", "Faction Symbol Image", "Allies", "FactionName", "Backstory", "Feat+Traits", "Treasure", "CHARACTER IMAGE", "Spellcasting Class 2", "SpellcastingAbility 2", "SpellSaveDC  2", "SpellAtkBonus 2", "SlotsTotal 19", "SlotsRemaining 19", "Spells 1014", "Spells 1015", "Spells 1016", "Spells 1017", "Spells 1018", "Spells 1019", "Spells 1020", "Spells 1021", "Spells 1022", "Check Box 314", "Check Box 3031", "Check Box 3032", "Check Box 3033", "Check Box 3034", "Check Box 3035", "Check Box 3036", "Check Box 3037", "Check Box 3038", "Check Box 3039", "Check Box 3040", "Check Box 321", "Check Box 320", "Check Box 3060", "Check Box 3061", "Check Box 3062", "Check Box 3063", "Check Box 3064", "Check Box 3065", "Check Box 3066", "Check Box 315", "Check Box 3041", "Spells 1023", "Check Box 251", "Check Box 309", "Check Box 3010", "Check Box 3011", "Check Box 3012", "Check Box 3013", "Check Box 3014", "Check Box 3015", "Check Box 3016", "Check Box 3017", "Check Box 3018", "Check Box 3019", "Spells 1024", "Spells 1025", "Spells 1026", "Spells 1027", "Spells 1028", "Spells 1029", "Spells 1030", "Spells 1031", "Spells 1032", "Spells 1033", "SlotsTotal 20", "SlotsRemaining 20", "Spells 1034", "Spells 1035", "Spells 1036", "Spells 1037", "Spells 1038", "Spells 1039", "Spells 1040", "Spells 1041", "Spells 1042", "Spells 1043", "Spells 1044", "Spells 1045", "Spells 1046", "SlotsTotal 21", "SlotsRemaining 21", "Spells 1047", "Spells 1048", "Spells 1049", "Spells 1050", "Spells 1051", "Spells 1052", "Spells 1053", "Spells 1054", "Spells 1055", "Spells 1056", "Spells 1057", "Spells 1058", "Spells 1059", "SlotsTotal 22", "SlotsRemaining 22", "Spells 1060", "Spells 1061", "Spells 1062", "Spells 1063", "Spells 1064", "Check Box 323", "Check Box 322", "Check Box 3067", "Check Box 3068", "Check Box 3069", "Check Box 3070", "Check Box 3071", "Check Box 3072", "Check Box 3073", "Spells 1065", "Spells 1066", "Spells 1067", "Spells 1068", "Spells 1069", "Spells 1070", "Spells 1071", "Check Box 317", "Spells 1072", "SlotsTotal 23", "SlotsRemaining 23", "Spells 1073", "Spells 1074", "Spells 1075", "Spells 1076", "Spells 1077", "Spells 1078", "Spells 1079", "Spells 1080", "Spells 1081", "SlotsTotal 24", "SlotsRemaining 24", "Spells 1082", "Spells 1083", "Spells 1084", "Spells 1085", "Spells 1086", "Spells 1087", "Spells 1088", "Spells 1089", "Spells 1090", "SlotsTotal 25", "SlotsRemaining 25", "Spells 1091", "Spells 1092", "Spells 1093", "Spells 1094", "Spells 1095", "Spells 1096", "Spells 1097", "Spells 1098", "Spells 1099", "SlotsTotal 26", "SlotsRemaining 26", "Spells 10100", "Spells 10101", "Spells 10102", "Spells 10103", "Check Box 316", "Check Box 3042", "Check Box 3043", "Check Box 3044", "Check Box 3045", "Check Box 3046", "Check Box 3047", "Check Box 3048", "Check Box 3049", "Check Box 3050", "Check Box 3051", "Check Box 3052", "Spells 10104", "Check Box 325", "Check Box 324", "Check Box 3074", "Check Box 3075", "Check Box 3076", "Check Box 3077", "Spells 10105", "Spells 10106", "Check Box 3078", "SlotsTotal 27", "SlotsRemaining 27", "Check Box 313", "Check Box 310", "Check Box 3020", "Check Box 3021", "Check Box 3022", "Check Box 3023", "Check Box 3024", "Check Box 3025", "Check Box 3026", "Check Box 3027", "Check Box 3028", "Check Box 3029", "Check Box 3030", "Spells 10107", "Spells 10108", "Spells 10109", "Spells 101010", "Spells 101011", "Spells 101012", "Check Box 319", "Check Box 318", "Check Box 3053", "Check Box 3054", "Check Box 3055", "Check Box 3056", "Check Box 3057", "Check Box 3058", "Check Box 3059", "Check Box 327", "Check Box 326", "Check Box 3079", "Check Box 3080", "Check Box 3081", "Check Box 3082", "Spells 101013", "Check Box 3083"
];

interface CharacterSheetProps {
}

const CharacterSheet: React.FC<CharacterSheetProps> = () => {
  const [pdfFieldValues, setPdfFieldValues] = useState<Record<string, string>>({});
  const [currentFieldIdx, setCurrentFieldIdx] = useState(0);
  const [isWizardDone, setIsWizardDone] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [characterLevel, setCharacterLevel] = useState<string>('');
  const [availableSpells, setAvailableSpells] = useState<any[]>([]);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Group all ability scores and modifiers into a single wizard step
  const allStatsAndMods = [
    'STR', 'STRmod',
    'DEX', 'DEXmod',
    'CON', 'CONmod',
    'INT', 'INTmod',
    'WIS', 'WISmod',
    'CHA', 'CHamod',
  ];
  const wizardFields = allPdfFields
    .filter(f => !f.toLowerCase().includes('check box') && !f.toLowerCase().includes('image'))
    .reduce((acc, f) => {
      if (f === 'STR') {
        acc.push(allStatsAndMods);
        return acc;
      }
      if (allStatsAndMods.includes(f)) {
        return acc;
      }
      if (f === 'ClassLevel') {
        acc.push(['Class', 'Level']);
        return acc;
      }
      acc.push(f);
      return acc;
    }, [] as (string | string[])[]);
  const currentField = wizardFields[currentFieldIdx];
  const isCheckboxField = (field: string) => field.toLowerCase().startsWith('check box');

  // Map PDF field codes to user-friendly labels for translation
  const fieldLabels: Record<string, string> = {
    ClassLevel: 'Class and Level',
    Background: 'Background',
    PlayerName: 'Player Name',
    CharacterName: 'Character Name',
    Race: 'Race',
    Alignment: 'Alignment',
    XP: 'Experience Points',
    Inspiration: 'Inspiration',
    STR: 'Strength',
    ProfBonus: 'Proficiency Bonus',
    AC: 'Armor Class',
    Initiative: 'Initiative',
    Speed: 'Speed',
    PersonalityTraits: 'Personality Traits',
    STRmod: 'Strength Modifier',
    HPMax: 'Max HP',
    'ST Strength': 'Saving Throw: Strength',
    DEX: 'Dexterity',
    HPCurrent: 'Current HP',
    Ideals: 'Ideals',
    DEXmod: 'Dexterity Modifier',
    HPTemp: 'Temporary HP',
    Bonds: 'Bonds',
    CON: 'Constitution',
    HDTotal: 'Total Hit Dice',
    CONmod: 'Constitution Modifier',
    HD: 'Hit Dice',
    Flaws: 'Flaws',
    INT: 'Intelligence',
    'ST Dexterity': 'Saving Throw: Dexterity',
    'ST Constitution': 'Saving Throw: Constitution',
    'ST Intelligence': 'Saving Throw: Intelligence',
    'ST Wisdom': 'Saving Throw: Wisdom',
    'ST Charisma': 'Saving Throw: Charisma',
    Acrobatics: 'Acrobatics',
    Animal: 'Animal Handling',
    Athletics: 'Athletics',
    Deception: 'Deception',
    History: 'History',
    Insight: 'Insight',
    Intimidation: 'Intimidation',
    Investigation: 'Investigation',
    WIS: 'Wisdom',
    Arcana: 'Arcana',
    Perception: 'Perception',
    WISmod: 'Wisdom Modifier',
    CHA: 'Charisma',
    Nature: 'Nature',
    Performance: 'Performance',
    Medicine: 'Medicine',
    Religion: 'Religion',
    Stealth: 'Stealth',
    Persuasion: 'Persuasion',
    SleightofHand: 'Sleight of Hand',
    CHamod: 'Charisma Modifier',
    Survival: 'Survival',
    AttacksSpellcasting: 'Attacks & Spellcasting',
    Passive: 'Passive Perception',
    CP: 'Copper Pieces',
    ProficienciesLang: 'Proficiencies & Languages',
    SP: 'Silver Pieces',
    EP: 'Electrum Pieces',
    GP: 'Gold Pieces',
    PP: 'Platinum Pieces',
    Equipment: 'Equipment',
    'Features and Traits': 'Features & Traits',
    'CharacterName 2': 'Character Name (Alt)',
    Age: 'Age',
    Height: 'Height',
    Weight: 'Weight',
    Eyes: 'Eyes',
    Skin: 'Skin',
    Hair: 'Hair',
    'Faction Symbol Image': 'Faction Symbol',
    Allies: 'Allies',
    FactionName: 'Faction Name',
    Backstory: 'Backstory',
    'Feat+Traits': 'Feats & Traits',
    Treasure: 'Treasure',
    'CHARACTER IMAGE': 'Character Image',
    // ...add more as needed...
  };

  // Helper to get label for a field
  const getFieldLabel = (field: string) => fieldLabels[field] || field;

  React.useEffect(() => {
    if (!selectedClass) {
      setAvailableSpells([]);
      return;
    }
    // Filter allSpells by class name in spell.classes
    const spells = allSpells.filter(
      (spell: any) =>
        spell.classes && spell.classes.some((cls: any) => cls.name.toLowerCase() === selectedClass.toLowerCase())
    );
    setAvailableSpells(spells);
  }, [selectedClass]);

  // Update pdfFieldValues.ClassLevel whenever class or level changes
  React.useEffect(() => {
    if (selectedClass && characterLevel) {
      setPdfFieldValues(prev => ({ ...prev, ClassLevel: `${selectedClass} ${characterLevel}` }));
    } else {
      setPdfFieldValues(prev => ({ ...prev, ClassLevel: '' }));
    }
  }, [selectedClass, characterLevel]);

  // Auto-update XP and proficiency bonus when Level changes
  React.useEffect(() => {
    const level = parseInt(pdfFieldValues['Level'] || '');
    if (!isNaN(level)) {
      const entry = levelExperience.find((e: any) => e.level === level);
      if (entry) {
        setPdfFieldValues(prev => ({
          ...prev,
          XP: entry.xp.toString(),
          ProfBonus: entry.proficiencyBonus.toString(),
        }));
      }
    }
  }, [pdfFieldValues['Level']]);

  // Auto-update ability modifiers when stat changes
  React.useEffect(() => {
    const stats = [
      { stat: 'STR', mod: 'STRmod' },
      { stat: 'DEX', mod: 'DEXmod ' },
      { stat: 'CON', mod: 'CONmod' },
      { stat: 'INT', mod: 'INTmod' },
      { stat: 'WIS', mod: 'WISmod' },
      { stat: 'CHA', mod: 'CHamod' },
    ];
    let updates: Record<string, string> = {};
    stats.forEach(({ stat, mod }) => {
      const score = parseInt(pdfFieldValues[stat] || '');
      if (!isNaN(score)) {
        const entry = abilityModifiers.find((e: any) => score >= e.min && score <= e.max);
        if (entry) {
          updates[mod] = (entry.modifier >= 0 ? '+' : '') + entry.modifier;
        }
      }
    });
    if (Object.keys(updates).length > 0) {
      setPdfFieldValues(prev => ({ ...prev, ...updates }));
    }
  }, [pdfFieldValues['STR'], pdfFieldValues['DEX'], pdfFieldValues['CON'], pdfFieldValues['INT'], pdfFieldValues['WIS'], pdfFieldValues['CHA']]);

  const handleSavePdf = () => {
    if (sheetRef.current) {
      html2pdf()
        .set({
          margin: 0,
          filename: 'character-sheet.pdf',
          image: { type: 'jpeg', quality: 2 },
          html2canvas: { scale: 8 },
          jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
        })
        .from(sheetRef.current)
        .save();
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setPdfFieldValues(prev => ({ ...prev, [field]: value }));
    // If class or level changes, update ClassLevel
    if (field === 'Class' || field === 'Level') {
      const updatedClass = field === 'Class' ? value : pdfFieldValues['Class'] || '';
      const updatedLevel = field === 'Level' ? value : pdfFieldValues['Level'] || '';
      setPdfFieldValues(prev => ({ ...prev, ClassLevel: `${updatedClass} ${updatedLevel}`.trim() }));
    }
  };

  const handleExportToPdfTemplate = async () => {
    try {
      const existingPdfBytes = await fetch('/src/assets/dnd-character-sheet.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
      // Concatenate class and level for ClassLevel
      const classLevel = (pdfFieldValues['Class'] ? pdfFieldValues['Class'] : '') + (pdfFieldValues['Level'] ? ' ' + pdfFieldValues['Level'] : '');
      const pdfValuesWithClassLevel = { ...pdfFieldValues, ClassLevel: classLevel.trim() };
      allPdfFields.forEach(fieldName => {
        const value = pdfValuesWithClassLevel[fieldName] || fieldName;
        try {
          const field = form.getTextField(fieldName);
          field.setText(value);
        } catch (e) {
          try {
            const cb = form.getCheckBox(fieldName);
            if (value && value !== fieldName) cb.check();
            else cb.uncheck();
          } catch (e2) {
          }
        }
      });

      form.flatten();
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'dnd-character-sheet-filled.pdf';
      link.click();
    } catch (err) {
      alert('Failed to export PDF: ' + err);
    }
  };

  const handleLogPdfFields = async () => {
    try {
      const existingPdfBytes = await fetch('/src/assets/dnd-character-sheet.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      const fieldNames = fields.map(f => f.getName());
      console.log('PDF Field Names:', fieldNames);
      alert('Field names logged to console.');
    } catch (err) {
      alert('Failed to read PDF fields: ' + err);
    }
  };

  // Improved: get base name and number for numbered fields (handles e.g. 'Spells 1014')
  function parseNumberedField(field: string) {
    if (typeof field !== 'string') return null;
    const match = field.match(/^(.*?)(\s+)(\d+)$/);
    if (match) {
      return { base: match[1].trim(), num: parseInt(match[3], 10) };
    }
    return null;
  }

  // Improved: If a numbered field is skipped, skip all subsequent fields with the same base
  function getNextWizardFieldIdx(idx: number, values: Record<string, string>) {
    let i = idx + 1;
    const skippedBases = new Set<string>();
    const currField = wizardFields[idx];
    if (typeof currField === 'string') {
      const currParsed = parseNumberedField(currField);
      if (currParsed && (!values[currField] || values[currField].trim() === '')) {
        skippedBases.add(currParsed.base);
      }
    }
    while (i < wizardFields.length) {
      const nextField = wizardFields[i];
      if (typeof nextField !== 'string') {
        i++;
        continue;
      }
      const nextParsed = parseNumberedField(nextField);
      if (nextParsed && skippedBases.has(nextParsed.base)) {
        i++;
        continue;
      }
      break;
    }
    return i;
  }

  const handleWizardSave = (value: string) => {
    setPdfFieldValues(prev => {
      const newValues = { ...prev, [currentField]: value };
      // If the next field is a checkbox, check it if value is not empty
      const nextField = allPdfFields[allPdfFields.indexOf(currentField) + 1];
      if (nextField && nextField.toLowerCase().startsWith('check box') && value && value.trim() !== '') {
        newValues[nextField] = 'true';
      }
      const nextIdx = getNextWizardFieldIdx(currentFieldIdx, newValues);
      if (nextIdx < wizardFields.length) {
        setCurrentFieldIdx(nextIdx);
      } else {
        setIsWizardDone(true);
      }
      return newValues;
    });
  };

  const handleWizardSkip = () => {
    setPdfFieldValues(prev => {
      const newValues = { ...prev };
      const nextIdx = getNextWizardFieldIdx(currentFieldIdx, newValues);
      if (nextIdx < wizardFields.length) {
        setCurrentFieldIdx(nextIdx);
      } else {
        setIsWizardDone(true);
      }
      return newValues;
    });
  };

  // Define logical groups of PDF fields for the wizard
  const wizardFieldGroups: string[][] = [
    // Character Info
    ['CharacterName', 'PlayerName', 'Background', 'Race ', 'Alignment', 'Age', 'Height', 'Weight', 'Eyes', 'Skin', 'Hair'],
    // Class and Level
    ['Class', 'Level'],
    // Ability Scores and Modifiers
    ['STR', 'STRmod', 'DEX', 'DEXmod ', 'CON', 'CONmod', 'INT', 'INTmod', 'WIS', 'WISmod', 'CHA', 'CHamod'],
    // Proficiency Bonus, XP, Inspiration
    ['ProfBonus', 'XP', 'Inspiration'],
    // Combat Stats
    ['AC', 'Initiative', 'Speed', 'HPMax', 'HPCurrent', 'HPTemp', 'HDTotal', 'HD'],
    // Personality
    ['PersonalityTraits ', 'Ideals', 'Bonds', 'Flaws'],
    // Skills (grouped for brevity, you can split further if desired)
    ['Acrobatics', 'Animal', 'Arcana', 'Athletics', 'Deception ', 'History ', 'Insight', 'Intimidation', 'Investigation ', 'Medicine', 'Nature', 'Perception ', 'Performance', 'Persuasion', 'Religion', 'SleightofHand', 'Stealth ', 'Survival'],
    // Saving Throws
    ['ST Strength', 'ST Dexterity', 'ST Constitution', 'ST Intelligence', 'ST Wisdom', 'ST Charisma'],
    // Equipment & Currency
    ['CP', 'SP', 'EP', 'GP', 'PP', 'Equipment'],
    // Attacks & Spellcasting
    ['AttacksSpellcasting', 'Wpn Name', 'Wpn1 AtkBonus', 'Wpn1 Damage', 'Wpn Name 2', 'Wpn2 AtkBonus ', 'Wpn2 Damage ', 'Wpn Name 3', 'Wpn3 AtkBonus  ', 'Wpn3 Damage '],
    // Features & Traits
    ['Features and Traits', 'Feat+Traits', 'Backstory', 'Allies', 'FactionName', 'Faction Symbol Image', 'Treasure'],
    // Spellcasting (add more if needed)
    ['Spellcasting Class 2', 'SpellcastingAbility 2', 'SpellSaveDC  2', 'SpellAtkBonus 2'],
  ];

  // Flatten for field lookup
  const wizardFieldsFlat = wizardFieldGroups.flat();

  const currentGroupIdx = currentFieldIdx;
  const currentGroup = wizardFieldGroups[currentGroupIdx];

  return (
    <>
      <div className="no-print" style={{ textAlign: 'right', marginBottom: '1em' }}>
        <button onClick={handleSavePdf}>Save as PDF</button>
        <button style={{ marginLeft: 8 }} onClick={handleExportToPdfTemplate}>
          Export to D&D PDF Template
        </button>
        <button style={{ marginLeft: 8 }} onClick={handleLogPdfFields}>
          Log PDF Field Names
        </button>
      </div>
      <SheetContainer ref={sheetRef}>
        {!isWizardDone ? (
          <div style={{ maxWidth: 700, margin: '2em auto', textAlign: 'center' }}>
            <h2 style={{ color: '#4F46E5' }}>Step {currentGroupIdx + 1} of {wizardFieldGroups.length}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
              {currentGroup.map((field) => (
                <div key={field} style={{ minWidth: 120 }}>
                  <label htmlFor={`wizard-field-${field}`} style={{ fontWeight: 500, fontSize: 18 }}>{getFieldLabel(field)}</label>
                  {field === 'Class' ? (
                    <select
                      id={`wizard-field-${field}`}
                      value={pdfFieldValues['Class'] || ''}
                      onChange={e => setPdfFieldValues(prev => ({ ...prev, Class: e.target.value }))}
                      style={{ width: '100%', padding: '0.5em', borderRadius: 4, border: '1px solid #ccc', margin: '1em 0' }}
                    >
                      <option value="">Select a class</option>
                      {allClasses.map((cls: any) => (
                        <option key={cls.index} value={cls.name}>{cls.name}</option>
                      ))}
                    </select>
                  ) : field === 'Level' ? (
                    <input
                      id={`wizard-field-${field}`}
                      type="number"
                      min={1}
                      max={20}
                      value={pdfFieldValues['Level'] || ''}
                      onChange={e => setPdfFieldValues(prev => ({ ...prev, Level: e.target.value }))}
                      style={{ width: '100%', padding: '0.5em', borderRadius: 4, border: '1px solid #ccc', margin: '1em 0' }}
                    />
                  ) : (
                    <input
                      id={`wizard-field-${field}`}
                      type="text"
                      value={pdfFieldValues[field] || ''}
                      onChange={e => setPdfFieldValues(prev => ({ ...prev, [field]: e.target.value }))}
                      style={{ width: '100%', padding: '0.5em', borderRadius: 4, border: '1px solid #ccc', margin: '1em 0' }}
                      disabled={field.endsWith('mod')}
                    />
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <button onClick={() => {
                setCurrentFieldIdx(idx => idx + 1);
                // Optionally, you can add validation or save logic here
              }} style={{ padding: '0.5em 1.5em' }}>Save</button>
              <button onClick={() => setCurrentFieldIdx(idx => idx + 1)} style={{ padding: '0.5em 1.5em' }}>Skip</button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', margin: '2em 0' }}>
            <h2 style={{ color: '#4F46E5' }}>All fields complete!</h2>
            <button onClick={handleExportToPdfTemplate} style={{ padding: '0.7em 2em', fontSize: 18 }}>
              Download D&D PDF
            </button>
          </div>
        )}
      </SheetContainer>
    </>
  );
};

export default CharacterSheet;
