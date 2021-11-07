import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCharacters } from "../../services";
import { MainLinks, NewBtn } from "../../components";

const CharacterMain = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const params = useParams();

  useEffect(() => {
    getAllCharacters(params.id)
      .then((fetchedChars) => setAllCharacters(fetchedChars))
      .catch(err => console.log('CHAR ERR', err))
  },[params.id])
  
  return (
    <section>
      <h2>Characters</h2>
      <MainLinks storyid={params.id} type="characters" objectArray={allCharacters}/>
      <NewBtn storyid={params.id} type='Character'/>
    </section>
  );
};

export default CharacterMain;