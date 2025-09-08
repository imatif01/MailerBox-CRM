import React,{useState} from 'react';
import { MultipleFieldWrap } from './Multipe.styles';

const MultipleField = () => {
    const [inputText, setInputText] = useState('');
    const [textList, setTextList] = useState([]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputText.trim() !== '') {
            setTextList([...textList, inputText]);
            setInputText('');
        }
    };

    return (
        <MultipleFieldWrap>
            <label className='label'>Source</label>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type Source"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <div className="listWrap">
                {textList.map((text, index) => (
                    <div key={index} className="item">
                        {text}
                    </div>
                ))}
                </div>
            </div>
        </MultipleFieldWrap>
    )
}

export default MultipleField


