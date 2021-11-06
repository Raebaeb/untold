import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "../../components";
import { createCharacter, editCharacter, getCharacter } from "../../services";
import { charFields } from "../../utils/constants";

const CharacterForm = () => {
  const [character, setCharacter] = useState({
    name: "",
    age: "",
    occupation: "",
    abilities: "",
    appearance: "",
    goal: ""
  })


  return (
    <section>
      {params.idea ? <h2>Edit Character</h2> : <h2>New Character</h2>}
      <Form 
        handleSubmit={handleSubmit}
        name="Character"
        fieldsList={charFields}
        update={setCharacter}
      />
    </section>
  );
};

export default CharacterForm;