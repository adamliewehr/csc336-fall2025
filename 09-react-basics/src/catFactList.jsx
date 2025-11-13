import { useState, useEffect } from 'react';
import Quote from './Quote';

function CatFactList() {

    const [listOfFacts, setListOfFacts] = useState([]);

    const fetchAPIContents = () => {
        fetch("https://meowfacts.herokuapp.com/")
            .then(res => res.json())
            .then(data => {
                setListOfFacts( [...listOfFacts, data.data[0]]);  // why did i have to do this?
            });
    };

    useEffect(() => {
        fetchAPIContents();
    }, []);



    return (
        <div>

            <button
                onClick={fetchAPIContents}>
                Generate Cat Fact
            </button>

            {listOfFacts.map((item, index) => (
                <Quote
                    key={index}
                    text={item}
                />
            ))}

        </div>
    )
}

export default CatFactList
