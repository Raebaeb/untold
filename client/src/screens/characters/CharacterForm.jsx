import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DeleteBtn, Form } from "../../components";
import {
  createCharacter,
  deleteCharacter,
  editCharacter,
  getCharacter,
} from "../../services";
import { charFields } from "../../utils/constants";

const CharacterForm = () => {
  const [character, setCharacter] = useState({
    name: "",
    age: "",
    occupation: "",
    abilities: "",
    appearance: "",
    goals: "",
  });

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (params.character) {
      getCharacter(params.id, params.character).then((char) => {
        setCharacter({
          name: char.name,
          age: char.age,
          occupation: char.occupation,
          abilities: char.abilities,
          appearance: char.appearance,
          goals: char.goals,
        });
      });
    }
  }, [params]);

  const updateCharacter = (obj) => {
    setCharacter({ ...character, ...obj });
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.character) {
      await editCharacter(params.id, params.character, character);
    } else {
      await createCharacter(params.id, character);
    }
    history.push(`/${params.id}/characters`);
  };

  return (
    <section>
      {params.character ? (
        <>
          <h2>{character.name}</h2>
          <DeleteBtn
            deleteFunc={deleteCharacter}
            name="Character"
            storyid={params.id}
            elemid={params.character}
          />
        </>
      ) : (
        <h2>New Character</h2>
      )}
      <Form
        handleSubmit={handleSubmit}
        name="Character"
        fieldsList={charFields}
        update={updateCharacter}
        state={character}
      />
    </section>
  );
};

export default CharacterForm;
