import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  const [selectedChars, setSelectedChars] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [add, setAdd] = useState([]);
  const [remove, setRemove] = useState([]);
  const [scene, setScene] = useState({
    title: "",
    location: "",
    participants: "",
    summary: "",
    notes: "",
    linkedChars: []
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
          linkedChars: fetchedScene.linkedChars
        });
        
      });
    }
    getAllCharacters(params.id).then((fetchedChars) =>
      setAllCharacters(fetchedChars)
    );
  }, [params, selectedChars]);

  const updateScene = (obj) => {
    setScene({ ...scene, ...obj });
    return;
  };

  const handleChange = (array) => {
    // array.forEach((char) => {
    //   if (char.includes(!active)) {
        
    //   }

    // })
  }

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
    <section className='form-page'>
      {params.scene ? (
        <>
          <h1>{scene.title}</h1>
          <DeleteBtn
            deleteFunc={deleteScene}
            name="Scene"
            storyid={params.id}
            elemid={params.scene}
          />
        </>
      ) : (
        <h1>New Scene</h1>
      )}
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        name="Scene"
        fieldsList={sceneFields}
        update={updateScene}
        state={scene}
        characters={allCharacters}
      />
    </section>
  );
};

export default SceneForm;