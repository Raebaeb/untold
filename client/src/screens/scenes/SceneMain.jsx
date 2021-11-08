import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLinks, NewBtn } from "../../components";
import { getAllScenes } from "../../services";

const SceneMain = () => {
  const [scenes, setScenes] = useState([]);
  const params = useParams();

  useEffect(() => {
    getAllScenes(params.id).then((fetchedScenes) => setScenes(fetchedScenes))
  }, [params.id])

  return (
    <section className='main-view-page'>
      <h1>Scenes</h1>
      <MainLinks storyid={params.id} type='scenes' objectArray={scenes} />
      <NewBtn storyid={params.id} type='Scene'/>
    </section>
  );
};

export default SceneMain;