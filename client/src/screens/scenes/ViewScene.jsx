import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getScene } from "../../services";

const ViewScene = () => {
  const [scene, setScene] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params.scene) {
      getScene(params.id, params.scene).then((fetchedScene) => setScene(fetchedScene))
    }
  }, [])

  return (
    <section id="scene-page">
      <h2>{scene.title}</h2>
      <h3>{scene.location}</h3>
      <h4>Participating Characters:</h4>
      {scene.linked_chars.map((character) => (
        <li>{character.name}</li>
      ))}
      <h4>Additional Participants: {scene.participants}</h4>
      <p>Summary: {scene.summary}</p>
      <p>Notes: {scene.notes}</p>
    </section>
  );
};

export default ViewScene;