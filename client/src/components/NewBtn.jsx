import React from 'react';
import { Link } from 'react-router-dom';

const NewBtn = (props) => {

  return (
    <Link to={`/${props.storyid}/${props.type}/new`}>
      <button id="new-btn">
        + New {props.name}
      </button>
    </Link>
  );
};

export default NewBtn;