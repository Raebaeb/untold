import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllScenes } from "../../services";

const SceneMain = () => {
  const [scenes, setScenes] = useState([]);
  const params = useParams();

  useEffect(() => {
    getAllScenes(params.id).then((fetchedScenes) => setScenes(fetchedScenes))
  }, [params.id])

  return (
    <section>
      <h2>Scenes</h2>
      {scenes.map((scene) => (
        <div className="scene-container">
          <Link to={`/${params.id}/scenes/${scene.id}`}>{scene.title}</Link>
        </div>
      ))}
    </section>
  );
};

export default SceneMain;