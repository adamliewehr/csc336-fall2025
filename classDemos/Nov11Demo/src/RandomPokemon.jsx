import {useState, useEffect} from 'react';

function RandomPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [pokeId, setPokeID] = useState(1);

    const fetchPokemon = () => {
        const randomId = Math.floor(Math.random() *151) +1;
        setPokeID(pokeId);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(res => res.json())
        .then(data => {
            setPokemon({
                name: data.name,
                image: data.sprites.front_default,
            });
        });
    };

    useEffect(() => {
        fetchPokemon();
    }, [pokeId]);

    if (!pokemon) return <p>Loading...</p>;

    return (
        <div style = {{textAlign: 'center'}}>

            <h2>{pokemon.name.toUpperCase()}</h2>
            <input type="text" value = {pokeId} onChange={e=>setPokeID(e.target.value)}/>
            <img src={pokemon.image} alt={pokemon.name} />
            <br />
            {/* <button onClick = {fetchPokemon}>Get another pokemon</button> */}
        </div>

        
    );
}


export default RandomPokemon

