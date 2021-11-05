import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  createScene,
  editScene,
  getAllCharacters,
  getScene,
} from "../../services";
import { sceneFields } from "../../utils/constants";
import { Form } from "../../components";

const SceneForm = () => {
  const [characters, setCharacters] = useState([]);
  const [scene, setScene] = useState(
    { sceneInfo: {
      title: "",
      location: "",
      participants: "",
      summary: "",
      notes: "",
    },
    addToScene: {

    },
    removeFromScene: {

    }
    });


  const history = useHistory();
  const params = useParams();

  const storyId = params.id;
  const sceneId = params.scene;

  useEffect(() => {
    if (sceneId) {
      getScene(storyId, sceneId).then((scene) => {
        setScene({
          ...scene,
          sceneInfo: {
            title: scene.title,
            location: scene.location,
            participants: scene.participants,
            summary: scene.summary,
            notes: scene.notes,
          }          
        },
        );
      });
    }
    getAllCharacters(storyId).then((fetchedChars) => setCharacters(fetchedChars))
  }, [sceneId]);

  const updateScene = (obj) => {
    setScene({ ...scene, ...obj });
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sceneId) {
      await editScene(storyId, sceneId, scene);
    } else {
      await createScene(storyId, scene);
    }
    history.push(`${storyId}/scenes/${sceneId}`);
  };

  return (
    <section>
      {storyId ? <h2>Edit Scene</h2> : <h2>New Scene</h2>}
      <Form
        handleSubmit={handleSubmit}
        name={"Scene"}
        fieldsList={sceneFields}
        update={updateScene}
      />
    </section>
  );
};

export default SceneForm;
