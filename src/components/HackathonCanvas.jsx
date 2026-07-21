import { useState } from "react";
import "./HackthonCanvas.css";
import {
  FaLightbulb,
  FaRocket,
  FaCogs,
  FaUsers,
  FaClock,
  FaCoins,
  FaTrophy,
} from "react-icons/fa";
const sections = [
  {
    key: "ideaSummary",
    title: "Idea Summary",
    icon: <FaLightbulb />,
  },
  {
    key: "mvp",
    title: "MVP",
    icon: <FaRocket />,
  },
  {
    key: "techStack",
    title: "Tech Stack",
    icon: <FaCogs />,
  },
  {
    key: "teamRoles",
    title: "Team Roles",
    icon: <FaUsers />,
  },
  {
    key: "plan48Hours",
    title: "48-Hour Plan",
    icon: <FaClock />,
  },
  {
    key: "monetization",
    title: "Monetization",
    icon: <FaCoins />,
  },
  {
    key: "winningTips",
    title: "Winning Tips",
    icon: <FaTrophy />,
  },
];

export default function HackathonCanvas({ content = {}, onUpdateCanvas }) {
  const [openCard, setOpenCard] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [editedContent, setEditedContent] = useState({});

  const handleEditClick = (key) => {
    setOpenCard(key);
    setEditingKey(key);
    setEditedContent({ [key]: Array.isArray(content[key]) ? content[key].join('\n') : content[key] });
  };

  const handleSaveClick = (key) => {
    const updatedValue = editedContent[key].split('\n').map(item => item.trim()).filter(item => item.length > 0);
    onUpdateCanvas(key, Array.isArray(content[key]) ? updatedValue : editedContent[key]);
    setEditingKey(null);
    setEditedContent({});
  };

  const handleCancelClick = () => {
    setEditingKey(null);
    setEditedContent({});
  };

  const renderContent = (key, value) => {
    const isEditing = editingKey === key;

    if (isEditing) {
      return (
        <textarea
          className="canvas-card__textarea"
          value={editedContent[key]}
          onChange={(e) => setEditedContent({ ...editedContent, [key]: e.target.value })}
        />
      );
    } else if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((item, index) => (
            <li key={`${item}-${index}`}>
              {item}
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <p>
          {value || "Not defined yet."}
        </p>
      );
    }
  };

  return (
    <section
     id="hackathon-canvas"
      className="hackathon-canvas"
      aria-label="Hackathon project canvas"
    >
      <header className="canvas-header">
        <p className="canvas-kicker">
          HACKMATE AI
        </p>
        <h2>
          Your Hackathon Canvas
        </h2>
        <p>
          Click any section to explore or edit your idea.
        </p>
      </header>

      <div className="canvas-grid">
        {sections.map(({ key, title, icon }) => {
          const isOpen = openCard === key;
          const isEditing = editingKey === key;

          return (
            <article
              className={`
                canvas-card
                canvas-card--${key}
                ${isOpen ? "active" : ""}
              `}
              key={key}
              onClick={() => setOpenCard(isOpen ? null : key)}
            >
              <div className="canvas-card__title">
                <span>
                  {icon}
                </span>
                <h3>
                  {title}
                </h3>
                <div className="canvas-actions">
                  {isEditing ? (
                    <>
                      <button
                        className="canvas-action-button save"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveClick(key);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="canvas-action-button cancel"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelClick();
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="canvas-action-button edit"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(key);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="canvas-expand"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenCard(isOpen ? null : key);
                    }}
                  >
                    {isOpen ? "−" : "+"}
                  </button>
                </div>
              </div>

              <div
                className={`
                  canvas-card__content
                  ${isOpen ? "show" : ""}
                `}
              >
                {(isOpen || isEditing) &&
                  renderContent(key, content[key])
                }
                {!isOpen && !isEditing && (
                  <p className="preview">
                    Click to explore →
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
