import React, { useState, useRef } from 'react';
import { SheetContainer } from './styles';
import DraggableBox from '../DraggableBox';
import html2pdf from 'html2pdf.js';
import { PDFDocument } from 'pdf-lib';

const templates: Record<string, string[]> = {
  dnd5e: ['Name', 'Race', 'Class', 'Level', 'Background', 'Alignment', 'Stats', 'Skills', 'Equipment'],
  'dnd3.5': ['Name', 'Race', 'Class', 'Level', 'Alignment', 'Stats', 'Feats', 'Skills', 'Equipment'],
  pathfinder: ['Name', 'Race', 'Class', 'Level', 'Alignment', 'Stats', 'Feats', 'Skills', 'Equipment'],
  custom: ['Name', 'Custom Field 1', 'Custom Field 2'],
};

interface CharacterSheetProps {
  system: string;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ system }) => {
  const isCustom = system === 'custom';
  const [fields, setFields] = useState<string[]>(templates[system] || templates['custom']);
  const [removedFields, setRemovedFields] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [newField, setNewField] = useState('');
  const sheetRef = useRef<HTMLDivElement>(null);
  const [pdfFieldValues, setPdfFieldValues] = useState<Record<string, string>>({});

  React.useEffect(() => {
    setFields(templates[system] || templates['custom']);
    setRemovedFields([]);
  }, [system]);

  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const onDragOver = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedFields = [...fields];
    const [removed] = updatedFields.splice(draggedIndex, 1);
    updatedFields.splice(index, 0, removed);
    setFields(updatedFields);
    setDraggedIndex(index);
  };

  const onDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleAddField = () => {
    if (newField.trim() && !fields.includes(newField.trim())) {
      setFields([...fields, newField.trim()]);
      setNewField('');
    }
  };

  const handleRemoveField = (idx: number) => {
    setRemovedFields([...removedFields, fields[idx]]);
    setFields(fields.filter((_, i) => i !== idx));
  };

  const handleRestoreField = (field: string) => {
    setFields([...fields, field]);
    setRemovedFields(removedFields.filter(f => f !== field));
  };

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

  const allPdfFields = [
    "Class and Level","Background","Player Name","CharacterName","Race ","Alignment","XP","Inspiration","STR","ProfBonus","AC","Initiative","Speed","PersonalityTraits ","STRmod","HPMax","ST Strength","DEX","HPCurrent","Ideals","DEXmod ","HPTemp","Bonds","CON","HDTotal","Check Box 12","Check Box 13","Check Box 14","CONmod","Check Box 15","Check Box 16","Check Box 17","HD","Flaws","INT","ST Dexterity","ST Constitution","ST Intelligence","ST Wisdom","ST Charisma","Acrobatics","Animal","Athletics","Deception ","History ","Insight","Intimidation","Check Box 11","Check Box 18","Check Box 19","Check Box 20","Check Box 21","Check Box 22","Wpn Name","Wpn1 AtkBonus","Wpn1 Damage","INTmod","Wpn Name 2","Wpn2 AtkBonus ","Wpn2 Damage ","Investigation ","WIS","Wpn Name 3","Wpn3 AtkBonus  ","Arcana","Wpn3 Damage ","Perception ","WISmod","CHA","Nature","Performance","Medicine","Religion","Stealth ","Check Box 23","Check Box 24","Check Box 25","Check Box 26","Check Box 27","Check Box 28","Check Box 29","Check Box 30","Check Box 31","Check Box 32","Check Box 33","Check Box 34","Check Box 35","Check Box 36","Check Box 37","Check Box 38","Check Box 39","Check Box 40","Persuasion","SleightofHand","CHamod","Survival","AttacksSpellcasting","Passive","CP","ProficienciesLang","SP","EP","GP","PP","Equipment","Features and Traits","CharacterName 2","Age","Height","Weight","Eyes","Skin","Hair","Faction Symbol Image","Allies","FactionName","Backstory","Feat+Traits","Treasure","CHARACTER IMAGE","Spellcasting Class 2","SpellcastingAbility 2","SpellSaveDC  2","SpellAtkBonus 2","SlotsTotal 19","SlotsRemaining 19","Spells 1014","Spells 1015","Spells 1016","Spells 1017","Spells 1018","Spells 1019","Spells 1020","Spells 1021","Spells 1022","Check Box 314","Check Box 3031","Check Box 3032","Check Box 3033","Check Box 3034","Check Box 3035","Check Box 3036","Check Box 3037","Check Box 3038","Check Box 3039","Check Box 3040","Check Box 321","Check Box 320","Check Box 3060","Check Box 3061","Check Box 3062","Check Box 3063","Check Box 3064","Check Box 3065","Check Box 3066","Check Box 315","Check Box 3041","Spells 1023","Check Box 251","Check Box 309","Check Box 3010","Check Box 3011","Check Box 3012","Check Box 3013","Check Box 3014","Check Box 3015","Check Box 3016","Check Box 3017","Check Box 3018","Check Box 3019","Spells 1024","Spells 1025","Spells 1026","Spells 1027","Spells 1028","Spells 1029","Spells 1030","Spells 1031","Spells 1032","Spells 1033","SlotsTotal 20","SlotsRemaining 20","Spells 1034","Spells 1035","Spells 1036","Spells 1037","Spells 1038","Spells 1039","Spells 1040","Spells 1041","Spells 1042","Spells 1043","Spells 1044","Spells 1045","Spells 1046","SlotsTotal 21","SlotsRemaining 21","Spells 1047","Spells 1048","Spells 1049","Spells 1050","Spells 1051","Spells 1052","Spells 1053","Spells 1054","Spells 1055","Spells 1056","Spells 1057","Spells 1058","Spells 1059","SlotsTotal 22","SlotsRemaining 22","Spells 1060","Spells 1061","Spells 1062","Spells 1063","Spells 1064","Check Box 323","Check Box 322","Check Box 3067","Check Box 3068","Check Box 3069","Check Box 3070","Check Box 3071","Check Box 3072","Check Box 3073","Spells 1065","Spells 1066","Spells 1067","Spells 1068","Spells 1069","Spells 1070","Spells 1071","Check Box 317","Spells 1072","SlotsTotal 23","SlotsRemaining 23","Spells 1073","Spells 1074","Spells 1075","Spells 1076","Spells 1077","Spells 1078","Spells 1079","Spells 1080","Spells 1081","SlotsTotal 24","SlotsRemaining 24","Spells 1082","Spells 1083","Spells 1084","Spells 1085","Spells 1086","Spells 1087","Spells 1088","Spells 1089","Spells 1090","SlotsTotal 25","SlotsRemaining 25","Spells 1091","Spells 1092","Spells 1093","Spells 1094","Spells 1095","Spells 1096","Spells 1097","Spells 1098","Spells 1099","SlotsTotal 26","SlotsRemaining 26","Spells 10100","Spells 10101","Spells 10102","Spells 10103","Check Box 316","Check Box 3042","Check Box 3043","Check Box 3044","Check Box 3045","Check Box 3046","Check Box 3047","Check Box 3048","Check Box 3049","Check Box 3050","Check Box 3051","Check Box 3052","Spells 10104","Check Box 325","Check Box 324","Check Box 3074","Check Box 3075","Check Box 3076","Check Box 3077","Spells 10105","Spells 10106","Check Box 3078","SlotsTotal 27","SlotsRemaining 27","Check Box 313","Check Box 310","Check Box 3020","Check Box 3021","Check Box 3022","Check Box 3023","Check Box 3024","Check Box 3025","Check Box 3026","Check Box 3027","Check Box 3028","Check Box 3029","Check Box 3030","Spells 10107","Spells 10108","Spells 10109","Spells 101010","Spells 101011","Spells 101012","Check Box 319","Check Box 318","Check Box 3053","Check Box 3054","Check Box 3055","Check Box 3056","Check Box 3057","Check Box 3058","Check Box 3059","Check Box 327","Check Box 326","Check Box 3079","Check Box 3080","Check Box 3081","Check Box 3082","Spells 101013","Check Box 3083"
  ];

  const fieldGroups: Record<string, string[]> = {
    'Character Info': [
      'CharacterName', 'Player Name', 'Class and Level', 'Background', 'Race ', 'Alignment', 'XP', 'Inspiration', 'Age', 'Height', 'Weight', 'Eyes', 'Skin', 'Hair',
    ],
    'Attributes': [
      'STR', 'STRmod', 'DEX', 'DEXmod ', 'CON', 'CONmod', 'INT', 'INTmod', 'WIS', 'WISmod', 'CHA', 'CHamod', 'ProfBonus', 'Passive',
      'HPMax', 'HPCurrent', 'HPTemp', 'HDTotal', 'HD', 'AC', 'Initiative', 'Speed',
      'ST Strength', 'ST Dexterity', 'ST Constitution', 'ST Intelligence', 'ST Wisdom', 'ST Charisma',
      'Acrobatics', 'Animal', 'Arcana', 'Athletics', 'Deception ', 'History ', 'Insight', 'Intimidation', 'Investigation ', 'Medicine', 'Nature', 'Perception ', 'Performance', 'Persuasion', 'Religion', 'SleightofHand', 'Stealth ', 'Survival',
    ],
    'Equipment': [
      'Wpn Name', 'Wpn1 AtkBonus', 'Wpn1 Damage', 'Wpn Name 2', 'Wpn2 AtkBonus ', 'Wpn2 Damage ', 'Wpn Name 3', 'Wpn3 AtkBonus  ', 'Wpn3 Damage ',
      'CP', 'SP', 'EP', 'GP', 'PP', 'Equipment', 'Treasure',
    ],
    'Other': [
      'PersonalityTraits ', 'Ideals', 'Bonds', 'Flaws', 'ProficienciesLang', 'Features and Traits', 'Backstory', 'Allies', 'FactionName', 'Faction Symbol Image', 'CHARACTER IMAGE', 'Feat+Traits',
    ],
  };

  const handleFieldChange = (field: string, value: string) => {
    setPdfFieldValues(prev => ({ ...prev, [field]: value }));
  };

  const handleExportToPdfTemplate = async () => {
    try {
      const existingPdfBytes = await fetch('/src/assets/dnd-character-sheet.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      allPdfFields.forEach(fieldName => {
        const value = pdfFieldValues[fieldName] || fieldName;
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

  const getSections = (fields: string[]) => {
    const sections: Record<string, string[]> = {
      'Character Info': [],
      'Attributes': [],
      'Equipment': [],
      'Other': [],
    };
    fields.forEach(field => {
      const lower = field.toLowerCase();
      if (["name", "race", "class", "level", "background", "alignment"].some(k => lower.includes(k))) {
        sections['Character Info'].push(field);
      } else if (["stat", "skill", "feat"].some(k => lower.includes(k))) {
        sections['Attributes'].push(field);
      } else if (["equipment", "item", "inventory"].some(k => lower.includes(k))) {
        sections['Equipment'].push(field);
      } else {
        sections['Other'].push(field);
      }
    });
    return sections;
  };

  const sections = getSections(fields);

  return (
    <>
      {isCustom && (
        <div style={{ marginBottom: '1em', display: 'flex', gap: '0.5em' }}>
          <input
            type="text"
            value={newField}
            onChange={e => setNewField(e.target.value)}
            placeholder="New field name"
          />
          <button onClick={handleAddField}>Add Field</button>
        </div>
      )}
      {removedFields.length > 0 && (
        <div style={{ marginBottom: '1em', display: 'flex', gap: '0.5em', flexWrap: 'wrap' }}>
          {removedFields.map(field => (
            <button key={field} onClick={() => handleRestoreField(field)}>
              Add back {field}
            </button>
          ))}
        </div>
      )}
      {system === 'dnd5e' && (
        <div className="no-print" style={{ marginBottom: '1em' }}>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#4F46E5',
              color: '#fff',
              padding: '0.5em 1em',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 500,
              marginRight: '1em',
            }}
          >
            Open D&D 5e Handbook (PDF)
          </a>
        </div>
      )}
      <div className="no-print" style={{ textAlign: 'right', marginBottom: '1em' }}>
        <button onClick={handleSavePdf}>Save as PDF</button>
        {system === 'dnd5e' && (
          <>
            <button style={{ marginLeft: 8 }} onClick={handleExportToPdfTemplate}>
              Export to D&D PDF Template
            </button>
            <button style={{ marginLeft: 8 }} onClick={handleLogPdfFields}>
              Log PDF Field Names
            </button>
          </>
        )}
      </div>
      <SheetContainer ref={sheetRef}>
        {Object.entries(fieldGroups).map(([section, sectionFields]) => (
          <section key={section} style={{ marginBottom: '1.5em' }}>
            <h2 style={{ fontSize: '1.2em', borderBottom: '1px solid #ccc', marginBottom: '0.5em', paddingBottom: 2 }}>{section}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
              {sectionFields.map((field) => (
                <div key={field} style={{ minWidth: 180 }}>
                  <label style={{ fontWeight: 500, color: '#4F46E5' }} htmlFor={field}>{field}</label>
                  <input
                    id={field}
                    type="text"
                    value={pdfFieldValues[field] || ''}
                    onChange={e => handleFieldChange(field, e.target.value)}
                    style={{ width: '100%', padding: '0.3em', borderRadius: 4, border: '1px solid #ccc', marginTop: 2 }}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
        {Object.entries(sections).map(([section, sectionFields]) =>
          sectionFields.length > 0 ? (
            <section key={section} style={{ marginBottom: '1.5em' }}>
              <h2 style={{ fontSize: '1.2em', borderBottom: '1px solid #ccc', marginBottom: '0.5em', paddingBottom: 2 }}>{section}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
                {sectionFields.map((field, idx) => {
                  const fieldIdx = fields.indexOf(field);
                  return (
                    <div
                      key={field}
                      draggable
                      onDragStart={() => onDragStart(fieldIdx)}
                      onDragOver={e => { e.preventDefault(); onDragOver(fieldIdx); }}
                      onDrop={onDragEnd}
                      onDragEnd={onDragEnd}
                      style={{ position: 'relative' }}
                    >
                      <DraggableBox title={field} />
                      <button
                        style={{ position: 'absolute', top: 4, right: 4, fontSize: 12 }}
                        onClick={() => handleRemoveField(fieldIdx)}
                        aria-label={`Remove ${field}`}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null
        )}
      </SheetContainer>
    </>
  );
};

export default CharacterSheet;
