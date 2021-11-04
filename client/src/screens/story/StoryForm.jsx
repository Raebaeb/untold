import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createStory, editStory, getStory } from '../../services'

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
      <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="genre">Genre:</label>
      <input
        id="genre"
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />
      <label htmlFor="description">Description:</label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Save Story</button>
    </form>
    </section>
  );
};

export default StoryForm;