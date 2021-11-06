import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DeleteBtn } from "../../components";
import { deleteStory, getStory } from "../../services";

const ViewStory = () => {
  const [story, setStory] = useState({})
  const params = useParams();

  useEffect(() => {
    getStory(params.id).then((fetchedStory) => setStory(fetchedStory))
  }, [params.id])

  return (
    <section>
      <h2>{story.title}</h2>
      <h4>{story.genre}</h4>
      <p>{story.description}</p>
      {/* Add Links to characters, scenes, ideas, timeline */}
      <Link to={`/edit-story/${story.id}`}>
        <button>Edit</button>
      </Link>
      <DeleteBtn deleteFunc={deleteStory} name={story.title} storyid={story.id}/>
      <p>Careful! Deleting this story will delete all associated characters, scenes, and notes.</p>
    </section>
  );
};

export default ViewStory;