import React from 'react';
import './form.style.css'

const Form = (props)=>{
 return (
     <div>  
         <form>
            <input value={props.input} type='text' className='input' placeholder="Type the city" name='city'onChange={props.handleChange}></input>
            <button type='button' onClick={props.loadWeather} className='btn'>Get weather</button>
         </form>
         <div className='error'>{props.error?error():null}</div>
     </div>
 )
}

function error(){
    return(
        <div>Please Enter Valid City</div>
    )
}

export default Form;