import { useEffect } from "react";
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
    setStory([])
  }, [history, setStories, setStory, user]);
  return (
    <section id='home-page'>
      {stories.length >= 2 ? null : <Link to="/new/story" className='new-story-link first'>+ New Story</Link>}
      {stories.length === 0 ? (
        <Link to="/new/story" className='new-story-link'>+ New Story</Link>
      ) : (
        stories.map((story, i) => (
          <article className="story-globe-container" key={i}>
            <div className='story-link-bg'>
              <Link to={`story/${story.id}`} className='story-link'>{story.title}</Link>
              <h4 className='story-genre'>{story.genre}</h4>
            </div>
            <div className='story-links-container'>
            <Link to={`${story.id}/scenes`}>Scenes</Link>
            <Link to={`${story.id}/ideas`}>Ideas</Link>
            <Link to={`${story.id}/characters`}>Characters</Link>
            </div>
          </article>
        ))
      )}
      <Link to="/new/story" className='new-story-link last'>+ New Story</Link>
    </section>
  );
};

export default Home;
