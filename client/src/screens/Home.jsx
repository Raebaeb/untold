import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getAllStories } from '../services';


const Home = (props) => {
  const [stories, setStories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!props.user) {
      history.push('/')
    }
    getAllStories().then((fetchedStories) => setStories(fetchedStories))
  }, [])
  return (
    <section>
      <h2>Account home</h2>
      <Link to='/new-story'>+ New Story</Link>
      {stories.map((story) => (
        <Link to={`story/${story.id}`}>{story.title}</Link>
      ))}
      <Link to='/new-story'>+ New Story</Link>
    </section>
  );
};

export default Home;