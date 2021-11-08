import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createStory, editStory, getStory } from "../../services";
import { Form } from "../../components";
import { storyFields } from "../../utils/constants";

const StoryForm = () => {
  const [story, setStory] = useState({
    title: "",
    genre: "",
    description: "",
  });
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getStory(params.id).then((story) => {
        setStory({
          title: story.title,
          genre: story.genre,
          description: story.description,
        });
      });
    }
  }, [params.id]);

  const updateStory = (obj) => {
    setStory({ ...story, ...obj });
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await editStory(params.id, story);
    } else {
      await createStory(story);
    }
    history.push("/home");
  };

  return (
    <section>
      {params.id ? <h1>Edit Story</h1> : <h1>Spin a new tale...</h1>}
      <Form
        handleSubmit={handleSubmit}
        name={"Story"}
        fieldsList={storyFields}
        update={updateStory}
        state={story}
      />
    </section>
  );
};

export default StoryForm;
