import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllIdeas } from "../../services";
import { MainLinks, NewBtn } from "../../components";

const IdeaMain = () => {
  const [ideas, setIdeas] = useState([]);
  const params = useParams();

  useEffect(() => {
    getAllIdeas(params.id)
      .then((fetchedIdeas) => setIdeas(fetchedIdeas))
      .catch((e) => console.log("IDEA ERROR", e));
  }, [params.id]);

  return (
    <section>
      <h1>Ideas</h1>
      <MainLinks storyid={params.id} type="ideas" objectArray={ideas} />
      <NewBtn storyid={params.id} type="Idea" />
    </section>
  );
};

export default IdeaMain;
