import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { getAllStories } from "../services";

const Home = ({ user, stories, setStories, setStory }) => {
  
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    getAllStories().then((fetchedStories) => setStories(fetchedStories));
    console.log(stories);
    setStory([])
  }, []);
  return (
    <section>
      <Link to="/new/story">+ New Story</Link>
      {stories.length === 0 ? (
        <Link to="/new/story">+ New Story</Link>
      ) : (
        stories.map((story) => (
          <div className="story-globe-container" key={story}>
            <Link to={`story/${story.id}`}>{story.title}</Link>
            <Link to={`${story.id}/scenes`}>Scenes</Link>
            <Link to={`${story.id}/ideas`}>Ideas</Link>
            <Link to={`${story.id}/characters`}>Characters</Link>
            <Link to={`${story.id}/timeline`}>Timeline</Link>
          </div>
        ))
      )}
      <Link to="/new/story">+ New Story</Link>
    </section>
  );
};

export default Home;
