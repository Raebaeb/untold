import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStory } from "../../services";

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
    </section>
  );
};

export default ViewStory;