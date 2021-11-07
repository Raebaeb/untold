import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  createScene,
  deleteScene,
  editScene,
  getAllCharacters,
  getScene,
} from "../../services";
import { sceneFields } from "../../utils/constants";
import { DeleteBtn, Form } from "../../components";

const SceneForm = () => {
  const [linkedChars, setLinkedChars] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [add, setAdd] = useState([]);
  const [remove, setRemove] = useState([]);
  const [scene, setScene] = useState({
    title: "",
    location: "",
    participants: "",
    summary: "",
    notes: "",
  });

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (params.scene) {
      getScene(params.id, params.scene).then((fetchedScene) => {
        const { sceneInfo } = fetchedScene;
        setScene({
          title: sceneInfo.title,
          location: sceneInfo.location,
          participants: sceneInfo.participants,
          summary: sceneInfo.summary,
          notes: sceneInfo.notes,
        });
        setLinkedChars(linkedChars);
      });
    }
    getAllCharacters(params.id).then((fetchedChars) =>
      setAllCharacters(fetchedChars)
    );
  }, [params.scene]);

  const updateScene = (obj) => {
    setScene({ ...scene, ...obj });
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newScene = {
      sceneInfo: scene,
      addToScene: add,
      removeFromScene: remove,
    };
    if (params.scene) {
      await editScene(params.id, params.scene, newScene);
    } else {
      await createScene(params.id, newScene);
    }
    history.push(`/${params.id}/scenes`);
  };

  return (
    <section>
      {params.scene ? (
        <>
          <h2>{scene.title}</h2>
          <DeleteBtn
            deleteFunc={deleteScene}
            name="Scene"
            storyid={params.id}
            elemid={params.scene}
          />
        </>
      ) : (
        <h2>New Scene</h2>
      )}
      <Form
        handleSubmit={handleSubmit}
        name={"Scene"}
        fieldsList={sceneFields}
        update={updateScene}
        state={scene}
      />
      <h5>Linked Characters:</h5>
      {linkedChars.map((char) => (
        <Link to={`/${params.id}/characters/${char.id}`}>{char.name}</Link>
      ))}
    </section>
  );
};

export default SceneForm;
