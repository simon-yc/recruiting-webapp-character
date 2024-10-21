import React from "react";
import { getModifier } from "../utils/modifier";

interface Skill {
  name: string;
  attributeModifier: string;
  points: number;
}

interface SkillsProps {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  attributes: { [key: string]: number };
  totalSkillPoints: number;
}

const Skills: React.FC<SkillsProps> = ({ skills, setSkills, attributes, totalSkillPoints }) => {
  const incrementSkillPoints = (skillName: string) => {
    setSkills((prevSkills) => {
      const skill = prevSkills.find((s) => s.name === skillName);
      if (skill && totalSkillPoints > skill.points) {
        return prevSkills.map((s) =>
          s.name === skillName ? { ...s, points: s.points + 1 } : s
        );
      }
      return prevSkills;
    });
  };

  const decrementSkillPoints = (skillName: string) => {
    setSkills((prevSkills) => {
      const skill = prevSkills.find((s) => s.name === skillName);
      if (skill && skill.points > 0) {
        return prevSkills.map((s) =>
          s.name === skillName ? { ...s, points: s.points - 1 } : s
        );
      }
      return prevSkills;
    });
  };

  return (
    <div>
      <h2>Skills (Total Points: {totalSkillPoints})</h2>
      {skills.map((skill) => {
        const modifier = getModifier(attributes[skill.attributeModifier] || 10);
        const totalSkillValue = skill.points + modifier;
        return (
          <div key={skill.name}>
            <span>{skill.name} - points: {skill.points} modifier ({skill.attributeModifier}): {modifier} total: {totalSkillValue}</span>
            <button onClick={() => incrementSkillPoints(skill.name)}>+</button>
            <button onClick={() => decrementSkillPoints(skill.name)}>-</button>
          </div>
        );
      })}
    </div>
  );
};

export default Skills;
