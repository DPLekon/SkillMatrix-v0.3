import React, { useState } from 'react';
import './SkillMatrix.css';

const SkillMatrix = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ledoc User',
      skills: [
        { id: 1, name: 'Skill 1', rating: 1 },
        { id: 2, name: 'Skill 2', rating: 2 },
        { id: 3, name: 'Skill 3', rating: 3 },
        { id: 4, name: 'Skill 4', rating: 4 },
      ],
    },
    {
      id: 2,
      name: 'Ledoc User 2',
      skills: [
        { id: 1, name: 'Skill 1', rating: 3 },
        { id: 2, name: 'Skill 2', rating: 4 },
        { id: 3, name: 'Skill 3', rating: 2 },
        { id: 4, name: 'Skill 4', rating: 0 },
      ],
    },
    {
      id: 3,
      name: 'Ledoc User 3',
      skills: [
        { id: 1, name: 'Skill 1', rating: 4 },
        { id: 2, name: 'Skill 2', rating: 4 },
        { id: 3, name: 'Skill 3', rating: 3 },
        { id: 4, name: 'Skill 4', rating: 4 },
      ],
    },
    // Add more users here
  ]);

  const handleUserNameChange = (userId, newName) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, name: newName } : user
    );
    setUsers(updatedUsers);
  };

  const handleSkillChange = (userId, skillId, newSkill) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const updatedSkills = user.skills.map((skill) =>
          skill.id === skillId ? { ...skill, name: newSkill } : skill
        );
        return { ...user, skills: updatedSkills };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleRatingChange = (userId, skillId, newRating) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const updatedSkills = user.skills.map((skill) =>
          skill.id === skillId ? { ...skill, rating: newRating } : skill
        );
        return { ...user, skills: updatedSkills };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleAddSkill = (userId) => {
    const newSkill = { id: Date.now(), name: 'New Skill', rating: 1 };
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const updatedSkills = [...user.skills, newSkill];
        return { ...user, skills: updatedSkills };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleRemoveSkill = (userId, skillId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const updatedSkills = user.skills.filter((skill) => skill.id !== skillId);
        return { ...user, skills: updatedSkills };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: 'New Ledoc User',
      skills: [
        { id: 1, name: 'New Skill', rating: 0},
        { id: 2, name: 'New Skill', rating: 0},
        { id: 3, name: 'New Skill', rating: 0},
        { id: 4, name: 'New Skill', rating: 0},
      ],
    };
    setUsers([...users, newUser]);
  };

  const handleRemoveUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const renderCircleParts = (rating) => {
    const colors = ['#3a5b78', '#3a5b78', '#3a5b78', '#3a5b78'];
    const circleParts = [];

    for (let i = rating - 1; i >= 0; i--) {
      const partColor = colors[i];
      const partStyle = {
        backgroundColor: partColor,
        transform: `rotate(${i * 270}deg)`,
      };
      circleParts.push(<div key={i} className="circle-part" style={partStyle} />);
    }

    return circleParts;
  };

return (
  <div className="skill-matrix">
    {users.map((user, index) => (
      <div key={user.id} className="user-skills">
        <div className="user-name">
          <input
            type="text"
            value={user.name}
            onChange={(event) => handleUserNameChange(user.id, event.target.value)}
          />
            <button
              className="remove-user"
              onClick={() => handleRemoveUser(user.id)}
            >
              Remove User
            </button>
        </div>
        <div className="skill-circles">
          {user.skills.map((skill) => (
            <div key={skill.id} className="skill-circle">
              {index !== 0 ? (
                <input
                  type="text"
                  style={{ display: 'none' }}
                  value={skill.name}
                  onChange={(event) =>
                    handleSkillChange(user.id, skill.id, event.target.value)
                  }
                />
              ) : (
                <input
                  type="text"
                  value={skill.name}
                  onChange={(event) =>
                    handleSkillChange(user.id, skill.id, event.target.value)
                  }
                />
              )}
              <div className="circle">{renderCircleParts(skill.rating)}</div>
              <div className="rating-buttons">
                <button
                  onClick={() =>
                    handleRatingChange(
                      user.id,
                      skill.id,
                      Math.max(skill.rating - 1, 0)
                    )
                  }
                >
                  -
                </button>
                <button
                  onClick={() =>
                    handleRatingChange(
                      user.id,
                      skill.id,
                      Math.min(skill.rating + 1, 4)
                    )
                  }
                >
                  +
                </button>
              </div>
              <button
                  className="remove-skill"
                  onClick={() => handleRemoveSkill(user.id, skill.id)}
                >
                  Remove Skill
              </button>
            </div>
          ))}
      </div>
          <button className="add-skill-button" onClick={() => handleAddSkill(user.id)}>
            Add Skill
          </button>
      </div>
    ))}
    <button className="add-user-button" onClick={handleAddUser}>
      Add User
    </button>
  </div>
);
};

export default SkillMatrix;