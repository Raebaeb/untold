import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DeleteBtn, Form } from "../../components";
import { getIdea, editIdea, createIdea, deleteIdea } from "../../services";
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
        setIdea({ title: idea.title, text: idea.text });
      });
    }
  }, [params]);

  const updateIdea = (obj) => {
    setIdea({ ...idea, ...obj });
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.idea) {
      await editIdea(params.id, params.idea, idea);
    } else {
      await createIdea(params.id, idea);
    }
    history.push(`/${params.id}/ideas`);
  };

  return (
    <section className='form-page'>
      {params.idea ? (
        <>
          <h1>{idea.title}</h1>
          <DeleteBtn
            deleteFunc={deleteIdea}
            name="Idea"
            storyid={params.id}
            elemid={params.idea}
          />
        </>
      ) : (
        <h1>New Idea</h1>
      )}
      <Form
        handleSubmit={handleSubmit}
        name="Idea"
        fieldsList={ideaFields}
        update={updateIdea}
        state={idea}
      />
    </section>
  );
};

export default IdeaForm;
