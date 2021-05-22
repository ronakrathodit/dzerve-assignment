import React from 'react';


const InputData=(props)=>{
    const changeHandler=(e)=>{
        let {name,value}=e.target;
        props.onChange(name,value)
    }
    const BlurCheck=(e)=>{
        let {name,value}=e.target;
        props.validate(name,value)
    }
    return (
        <div className="form_input container">
            <label>{props.label}</label>
            <input
             type={props.type}
             name={props.name}
             value={props.value}
             onChange={changeHandler}
             onBlur={BlurCheck}
             
            />
           <span className="errorMsg">{props.error}</span>


        </div>
    )
}

export default InputData