import { useState } from 'react';
import Input from './Input'
import TextArea from './TextArea';
import Dropdown from '../dropdown/Dropdown'

const Form = (props) => {

  // pass in handleSubmit, Title of object, fieldsList, state/setState

  return (
    <form onSubmit={props.handleSubmit}>
      {props.fieldsList.map((field) => {
        if (field.type == "input") {
          <Input label={field.label} />
        } else if (field.type == "textarea") {
          <TextArea label={field.label}/>
        } else {
          <Dropdown />
        }
  })}

      <button>Save {props.obj}</button>
    </form>
  );
};

export default Form;