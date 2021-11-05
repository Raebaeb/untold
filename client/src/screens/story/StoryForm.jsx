import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createStory, editStory, getStory } from "../../services";
import { Form } from "../../components";
import { storyFields } from "../../utils/constants";

const StoryForm = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
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
        setStory(
          { title: story.title },
          { genre: story.genre },
          { description: story.description }
        );
      });
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const story = {
      title,
      genre,
      description,
    };
    if (params.id) {
      await editStory(params.id, story);
    } else {
      await createStory(story);
    }
    history.push("/home");
  };

  return (
    <section>
      {params.id ? <h2>Edit Story</h2> : <h2>Spin a new tale...</h2>}
      <Form
        handleSubmit={handleSubmit}
        obj={"Story"}
        fieldsList={storyFields}
        story={story}
        setStory={setStory}
      />
    </section>
  );
};

export default StoryForm;
