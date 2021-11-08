import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DeleteBtn } from "../../components";
import { deleteStory, getStory } from "../../services";

const ViewStory = ({ story, setStory }) => {
  const params = useParams();

  useEffect(() => {
    getStory(params.id).then((fetchedStory) => setStory(fetchedStory))
  }, [params.id, setStory])

  return (
    <section>
      <h2>{story.title}</h2>
      <h4>{story.genre}</h4>
      <p>{story.description}</p>
      {/* Add Links to characters, scenes, ideas, timeline */}
      <Link to={`/story/edit/${story.id}`}>
        <button>Edit</button>
      </Link>
      <DeleteBtn deleteFunc={deleteStory} name="Story" storyid={story.id}/>
      <p>Careful! Deleting this story will delete all associated characters, scenes, and notes.</p>
    </section>
  );
};

export default ViewStory;