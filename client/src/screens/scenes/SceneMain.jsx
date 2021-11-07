import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLinks, NewBtn } from "../../components";
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
      <MainLinks storyid={params.id} type='scenes' objectArray={scenes} />
      <NewBtn storyid={params.id} type='Scene'/>
    </section>
  );
};

export default SceneMain;