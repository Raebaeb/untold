import React from "react";
import { Link } from "react-router-dom";

const MainLinks = (props) => {
  const createLinks = (arr) => {
    const links = arr.map((elem, i) => {
      return (props.type === "characters" ? (
        <SingleLink
          key={i}
          storyid={elem.story_id}
          type={props.type}
          elemid={elem.id}
          text={elem.name}
        />
      ) : (
        <SingleLink
          key={i}
          storyid={elem.story_id}
          type={props.type}
          elemid={elem.id}
          text={elem.title}
        />
      ));
    });
    return links;
  };

  const links = createLinks(props.objectArray);

  return <div id="link-container">{links.map((link) => link)}</div>;
};

export default MainLinks;

const SingleLink = ({ storyid, type, elemid, text }) => {
  return (
    <article className="main-link-container">
      <Link to={`/${storyid}/${type}/${elemid}`}>
        <button className="main-link">{text}</button>
      </Link>
    </article>
  );
};
