import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "../../components";
import { getIdea, editIdea, createIdea } from '../../services'
import { ideaFields } from "../../utils/constants";

const IdeaForm = () => {
  const [idea, setIdea] = useState({
    title: "",
    text: "",
  });

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (params.idea) {
      getIdea(params.id, params.idea).then((idea) => {
        setIdea({ title: idea.title }, { text: idea.text });
      });
    }
  }, [params.idea]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await editIdea(params.id, params.idea, idea);
    } else {
      await createIdea(params.id, idea);
    }
    history.push(`/${params.id}/ideas`);
  };

  return (
    <section>
      {params.idea ? <h2>Edit Idea</h2> : <h2>New Idea</h2>}
      <Form
        handleSubmit={handleSubmit}
        name={"Idea"}
        fieldsList={ideaFields}
        update={setIdea}
      />
    </section>
  );
};

export default IdeaForm;
