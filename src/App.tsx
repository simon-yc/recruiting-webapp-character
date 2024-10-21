import React, { useState, useEffect } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
import { getModifier } from "./utils/modifier";
import { saveCharacter, loadCharacter } from "./services/api";
import Attributes from "./components/Attributes";
import Skills from "./components/Skills";
import Classes from "./components/Classes";

const App: React.FC = () => {
  const [attributes, setAttributes] = useState(() =>
    ATTRIBUTE_LIST.reduce((acc, attr) => {
      acc[attr] = 10;
      return acc;
    }, {} as { [key: string]: number })
  );

  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [skills, setSkills] = useState(
    SKILL_LIST.map((skill) => ({ ...skill, points: 0 }))
  );
  const [totalSkillPoints, setTotalSkillPoints] = useState<number>(0);

  useEffect(() => {
    const intelligenceModifier = getModifier(attributes["Intelligence"] || 10);
    setTotalSkillPoints(10 + 4 * intelligenceModifier);
  }, [attributes]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Builder</h1>
      </header>
      <section className="App-section">
        <Attributes attributes={attributes} setAttributes={setAttributes} />
        <Skills skills={skills} setSkills={setSkills} attributes={attributes} totalSkillPoints={totalSkillPoints} />
        <Classes selectedClass={selectedClass} setSelectedClass={setSelectedClass} attributes={attributes} />
        <button onClick={() => saveCharacter(attributes, skills)}>Save Character</button>
        <button onClick={() => loadCharacter(setAttributes, setSkills)}>Load Character</button>
      </section>
    </div>
  );
};

export default App;
