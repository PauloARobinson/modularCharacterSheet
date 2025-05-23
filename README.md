# Modular Character Sheet

A modular, customizable character sheet app for tabletop RPGs (D&D 5e, D&D 3.5e, Pathfinder, and custom systems). Supports PDF export and filling a D&D 5e PDF template.

## Features
- Select RPG system (D&D 5e, D&D 3.5e, Pathfinder, Custom)
- Add, remove, and reorder fields (custom sheets)
- Fill grouped character data and export to a D&D 5e PDF template
- Export/print as PDF
- English i18n

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. Clone this repository or download the source code.
2. Open a terminal in the project folder.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App (Development)
Start the development server:
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Usage
- Select your RPG system at the top.
- Fill in your character's information in the grouped fields.
- For D&D 5e, you can export your data to a fillable PDF template by clicking **Export to D&D PDF Template**.
- You can also print or save your sheet as a PDF using the **Save as PDF** button.

## Customization
- To add more RPG systems or fields, edit the relevant files in `src/components/CharacterSheet/`.
- To update the PDF template, replace the file in `src/assets/dnd-character-sheet.pdf`.

## License
MIT
