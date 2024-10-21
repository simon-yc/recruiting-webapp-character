const GITHUB_USERNAME = "simon-yc";

export const saveCharacter = async (attributes: any, skills: any) => {
  const characterData = { attributes, skills };
  try {
    const response = await fetch(
      `https://recruiting.verylongdomaintotestwith.ca/api/{${GITHUB_USERNAME}}/character`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterData),
      }
    );
    if (!response.ok) throw new Error("Failed to save character");
    alert("Character saved successfully!");
  } catch (error) {
    console.error(error);
    alert("Error saving character: " + error.message);
  }
};

export const loadCharacter = async (setAttributes: any, setSkills: any) => {
  try {
    const response = await fetch(
      `https://recruiting.verylongdomaintotestwith.ca/api/{${GITHUB_USERNAME}}/character`
    );
    if (!response.ok) throw new Error("Failed to load character");
    const data = await response.json();
    const { attributes, skills } = data.body;
    setAttributes(attributes);
    setSkills(skills);
  } catch (error) {
    console.error(error);
    alert("Error loading character: " + error.message);
  }
};
