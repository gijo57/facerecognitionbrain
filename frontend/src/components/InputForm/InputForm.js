import React from 'react'
import './InputForm.css'

const InputForm = ({ handleInputChange, handleSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your picture!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={handleInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={handleSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default InputForm