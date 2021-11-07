import React from 'react';
import { Link } from 'react-router-dom';

const NewBtn = (props) => {

  return (
    <Link to={`/${props.storyid}/new/${props.type}s`}>
      <button id="new-btn">
        + New {props.type}
      </button>
    </Link>
  );
};

export default NewBtn;