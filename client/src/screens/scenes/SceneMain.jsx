import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NewBtn } from "../../components";
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
      {scenes?.map((scene) => (
        <div className="scene-container">
          <Link key={scene.id} to={`/${params.id}/scenes/${scene.id}`}>{scene.title}</Link>
        </div>
      ))}
      <NewBtn storyid={params.id} name='Scene' type='scenes'/>
    </section>
  );
};

export default SceneMain;