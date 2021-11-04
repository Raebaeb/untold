import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createScene, editScene, getAllCharacters, getScene } from "../../services";

const SceneForm = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [summary, setSummary] = useState("");
  const [notes, setNotes] = useState("");
  const [characters, setCharacters] = useState([]);
  const history = useHistory();
  const params = useParams();

  const storyId = params.id;
  const sceneId = params.scene;

  useEffect(() => {
    if (sceneId) {
      getScene(storyId, sceneId).then((scene) => {
        setTitle(scene.title);
        setLocation(scene.location);
        setParticipants(scene.participants);
        setSummary(scene.summary);
        setNotes(scene.notes);
        setCharacters
      });
    }
    getAllCharacters(storyId).then((storyCharacters) => setCharacters(storyCharacters))
  }, [sceneId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newScene = {
      sceneInfo: {
      title,
      location,
      participants,
      summary,
      notes
      },
      addToScene: {

      },
      removeFromScene: {
        
      }
    };
    if (sceneId) {
      await editScene(storyId, sceneId, newScene);
    } else {
      await createScene(storyId, newScene);
    }
    history.push(`${storyId}/scenes/${sceneId}`);
  };

  return (
    <section>
      {storyId ? <h2>Edit Scene</h2> : <h2>New Scene</h2>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="character-select">Link characters to this scene!</label>
        <select id="character-select">
          {}
        </select>
        <label htmlFor="participants">Additional Participants:</label>
        <input
          id="participants"
          type="text"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
        <label htmlFor="summary">Summary:</label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Save Scene</button>
      </form>
    </section>
  );
};

export default SceneForm;