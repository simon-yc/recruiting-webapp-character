import React from "react";
import { CLASS_LIST, ATTRIBUTE_LIST } from "../consts";

interface ClassesProps {
  selectedClass: string | null;
  setSelectedClass: React.Dispatch<React.SetStateAction<string | null>>;
  attributes: { [key: string]: number };
}

const Classes: React.FC<ClassesProps> = ({ selectedClass, setSelectedClass, attributes }) => {
  const isEligibleForClass = (className: string): boolean => {
    const requirements = CLASS_LIST[className];
    return ATTRIBUTE_LIST.every((attr) => attributes[attr] >= (requirements[attr] || 0));
  };

  return (
    <div>
      <h2>Classes</h2>
      {Object.keys(CLASS_LIST).map((className) => (
        <div
          key={className}
          style={{ cursor: "pointer", color: isEligibleForClass(className) ? "green" : "white" }}
          onClick={() => setSelectedClass(className)}
        >
          {className}
        </div>
      ))}
      {selectedClass && (
        <div>
          <h3>{selectedClass} Requirements</h3>
          {Object.entries(CLASS_LIST[selectedClass]).map(([attr, value]) => (
            <div key={attr}>
              {attr}: {value as number}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;
