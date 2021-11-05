import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const IdeaMain = () => {
  const [ideas, setIdeas] = useState([]);
  const params = useParams();

  useEffect(() => {
    // getAllIdeas
  }, [params.id])

  return (
    <section>
      <h2>Ideas</h2>
      {ideas.map((idea) => {
        <div className="idea-container">
          <Link to={`/${params.id}/ideas/${idea.id}`}>{idea.title}</Link>
        </div>
      })}
    </section>
  );
};

export default IdeaMain;