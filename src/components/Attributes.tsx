import React from "react";
import { ATTRIBUTE_LIST } from "../consts";
import { getModifier } from "../utils/modifier";

interface AttributesProps {
  attributes: { [key: string]: number };
  setAttributes: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

const Attributes: React.FC<AttributesProps> = ({ attributes, setAttributes }) => {
  const getTotalAttributes = () => ATTRIBUTE_LIST.reduce(
    (total, attr) => total + (attributes[attr] || 0),
    0
  );

  const incrementAttribute = (attr: string) => {
    setAttributes((prev) => {
      if (getTotalAttributes() >= 70) {
        alert("Total attributes cannot exceed 70.");
        return prev;
      }
      return { ...prev, [attr]: Math.min(prev[attr] + 1, 70) };
    });
  };

  const decrementAttribute = (attr: string) => {
    setAttributes((prev) => ({ ...prev, [attr]: Math.max(prev[attr] - 1, 0) }));
  };

  return (
    <div>
      <h2>Attributes</h2>
      {ATTRIBUTE_LIST.map((attribute) => (
        <div key={attribute}>
          <span>{attribute}: {attributes[attribute] || 0} (Modifier: {getModifier(attributes[attribute] || 10)})</span>
          <button onClick={() => incrementAttribute(attribute)}>+</button>
          <button onClick={() => decrementAttribute(attribute)}>-</button>
        </div>
      ))}
    </div>
  );
};

export default Attributes;
