import React, { useState } from 'react';
import './SkillMatrix.css';

const SkillMatrix = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: 'Skill 1', rating: 3 },
    { id: 2, name: 'Skill 2', rating: 2 },
    { id: 3, name: 'Skill 3', rating: 4 },
    // Add more skills here
  ]);

  const handleSkillChange = (id, newSkill) => {
    const updatedSkills = skills.map((skill) =>
      skill.id === id ? { ...skill, name: newSkill } : skill
    );
    setSkills(updatedSkills);
  };

  const handleRatingChange = (id, newRating) => {
    const updatedSkills = skills.map((skill) =>
      skill.id === id ? { ...skill, rating: newRating } : skill
    );
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    const newSkill = { id: Date.now(), name: 'New Skill', rating: 1 };
    setSkills([...skills, newSkill]);
  };

  const handleRemoveSkill = (id) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id);
    setSkills(updatedSkills);
  };

  const renderCircleParts = (rating) => {
    const colors = ['green', 'green', 'green', 'green'];
    const circleParts = [];

    for (let i = rating - 1; i >= 0; i--) {
      const partColor = colors[i];
      const partStyle = {
        backgroundColor: partColor,
        transform: `rotate(${i * 270}deg)`
      };
      circleParts.push(<div key={i} className="circle-part" style={partStyle} />);
    }

    return circleParts;
  };

  return (
    <div className="skill-matrix">
      {skills.map((skill) => (
        <div key={skill.id} className="skill-circle">
          <input
            type="text"
            value={skill.name}
            onChange={(event) => handleSkillChange(skill.id, event.target.value)}
          />
          <div className="circle">{renderCircleParts(skill.rating)}</div>
          <div className="rating-buttons">
            <button
              onClick={() =>
                handleRatingChange(skill.id, Math.max(skill.rating - 1, 1))
              }
            >
              -
            </button>
            <button
              onClick={() =>
                handleRatingChange(skill.id, Math.min(skill.rating + 1, 4))
              }
            >
              +
            </button>
          </div>
          <button className="remove-skill" onClick={() => handleRemoveSkill(skill.id)}>
            Remove
          </button>
        </div>
      ))}
      <button className="add-skill-button" onClick={handleAddSkill}>
        Add Skill
      </button>
    </div>
  );
};

export default SkillMatrix;
