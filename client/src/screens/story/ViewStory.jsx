import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DeleteBtn } from "../../components";
import { deleteStory, getStory } from "../../services";

const ViewStory = ({ story, setStory }) => {
  const params = useParams();

  useEffect(() => {
    getStory(params.id).then((fetchedStory) => setStory(fetchedStory));
  }, [params.id, setStory]);

  return (
    <section className="main-view-page">
      <DeleteBtn
        deleteFunc={deleteStory}
        name="Story"
        storyid={story.id}
        className="story-delete"
      />
      <p id="warning">
        Careful! Deleting this story will delete all associated characters,
        scenes, and notes.
      </p>
      <article className="story-main">
        <h1>{story.title}</h1>
        <h4>{story.genre}</h4>
        <p>{story.description}</p>
      </article>
      <Link to={`/story/edit/${story.id}`}>
        <button className="new-btn">Edit</button>
      </Link>
    </section>
  );
};

export default ViewStory;
