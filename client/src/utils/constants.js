const charFields = [
  { label: "Name", type: "input", state: "name" },
  { label: "Age", type: "input", state: "age" },
  { label: "Occupation", type: "textarea", state: "occupation" },
  { label: "Abilities", type: "textarea", state: "abilities" },
  { label: "Appearance", type: "textarea", state: "appearance" },
  { label: "Goals", type: "textarea", state: "goals" },
];
const storyFields = [
  { label: "Title", type: "input", state: "title" },
  { label: "Genre", type: "input", state: "genre" },
  { label: "Description", type: "textarea", state: "description" },
];
const sceneFields = [
  { label: "Title", type: "input", state: "title" },
  { label: "Location", type: "textarea", state: "location" },
  { label: "Additional Participants", type: "textarea", state: "participants" },
  { label: "Summary", type: "textarea", state: "summary" },
  { label: "Notes", type: "textarea", state: "notes" },
];
const ideaFields = [
  { label: "Title", type: "input", state: "title" },
  { label: "Text", type: "textarea", state: "text" },
];

export { charFields, storyFields, sceneFields, ideaFields };
