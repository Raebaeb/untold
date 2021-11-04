import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createStory, editStory, getStory } from '../../services'
import { Form } from '../../components';
import { storyFields } from '../../utils/constants';

const StoryForm = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getStory(params.id).then((story) => {
        setTitle(story.title);
        setGenre(story.genre);
        setDescription(story.description)
      })
    }
  }, [params.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newStory = {
      title,
      genre,
      description
    }
    if (params.id) {
      await editStory(params.id, newStory)
    } else {
      await createStory(newStory);
    }
    history.push('/home')
  }
  
  return (
    <section>
      {params.id ? (<h2>Edit Story</h2>) : (<h2>Spin a new tale...</h2>)}
      <Form handleSubmit={handleSubmit} obj={'Story'} fieldsList={storyFields} />
    </section>
  );
};

export default StoryForm;