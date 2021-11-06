import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllCharacters } from "../../services";
import { NewBtn } from "../../components";

const CharacterMain = () => {
  const [characters, setCharacters] = useState([]);
  const params = useParams();

  useEffect(() => {
    getAllCharacters(params.id).then((fetchedChars) => setCharacters(fetchedChars))
  },[params.id])
  
  return (
    <section>
      <h2>Characters</h2>
      {characters?.map((char) => {
        <div className="character-container">
          <Link to={`/${params.id}/characters/${char.id}`}>{char.name}</Link>
        </div>
      })}
      <NewBtn storyid={params.id} type='characters'/>
    </section>
  );
};

export default CharacterMain;