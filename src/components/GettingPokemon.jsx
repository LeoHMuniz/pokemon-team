/*Okay, what is the main purpose here;
This project is made using Tailwind and React, and the purpose is to search pokemons on the pokeAPI and make a team (of six) out of the pokemons you liked!
You can delete pokemons from your team and use the history to get the pokemons you once declined! (without using the API once again, as the pokes you search are located on a storage list)*/
import { useState, useRef } from "react"
import _ from "lodash"


export function GettingPokemon() {

  /*These states are the histories, AKA storages for the pokemons that we are selecting for our team*/
  const [objectHistory, setObjectHistory] = useState([])
  const [objectHistoryUpdated, setObjectHistoryUpdated] = useState([])
  const [pokeHistory, setPokeHistory] = useState([])
  const [pokeHistoryUpdated, setPokeHistoryUpdated] = useState([])

  /*This tells the code to start running (maybe it's not good to use it like this)*/
  const [coin, setCoin] = useState(false)

  /*These states are what make the whole thing become visual.
   They are the object of the pokemon, containing all of its properties;
   The name of the pokemon, to be used on the API call;
   The type of the pokemon, to make the card a little better
   And the actual Team, that shows you the pokes you liked the most!
   The pokeTeamUpdated is here to cut the pokemons you don't like in half! Just kidding, it's a variable that is here for splice to work.*/
  const [pokemon, setPokemon] = useState({})
  const [pokemonName, setPokemonName] = useState('')
  const [pokeType, setPokeType] = useState('')
  const [pokeTeam, setPokeTeam] = useState([])
  const [pokeTeamUpdated, setPokeTeamUpdated] = useState([])
  const nomeDoPokemon = useRef(null)

  /*This is the error management that I developed.*/
  const [modalMode, setModalMode] = useState(0)

  /*The backgrounds! got'em all from vecteezy.com*/
  const backgroundTypes = {
    bug: `bg-[url('./assets/pokeBackground/pokemonBug.jpg')]`,
    dark: `bg-[url('./assets/pokeBackground/pokemonDark.jpg')]`,
    dragon: `bg-[url('./assets/pokeBackground/pokemonDragon.jpg')]`,
    electric: `bg-[url('./assets/pokeBackground/pokemonElectric.jpg')]`,
    fairy: `bg-[url('./assets/pokeBackground/pokemonFairy.jpg')]`,
    fire: `bg-[url('./assets/pokeBackground/pokemonFire.jpg')]`,
    ghost: `bg-[url('./assets/pokeBackground/pokemonGhost.jpg')]`,
    grass: `bg-[url('./assets/pokeBackground/pokemonGrass.jpg')]`,
    ice: `bg-[url('./assets/pokeBackground/pokemonIce.jpg')]`,
    poison: `bg-[url('./assets/pokeBackground/pokemonPoison.jpg')]`,
    rock: `bg-[url('./assets/pokeBackground/pokemonRock.jpg')]`,
    water: `bg-[url('./assets/pokeBackground/pokemonWater.jpg')]`
  }

  const background = `bg-[url('./assets/pokeBackground/background_pokemon.jpg')]`

  function getPokemonName() {
    setPokemonName(nomePokemon.value.toLowerCase())
  }

  function handleClick(event) {
    pokemonName === "" ? setModalMode(2) : getPokemon(pokemonName)
  }

  function handleKeyPressed(event) {
    if (event.key == 'Enter') {
      handleClick(event)
    }
    event.preventDefault()
  }

  function handleHistory(newName) {
    nomeDoPokemon.current.value = newName
    rememberPokemon(newName)
  }

  function rememberPokemon(pokemonName) { /*Function made for getting a pokemon without calling API IT WORKS, IT ACTUALLY WORKS!*/
    objectHistory.map(memory => {
      if (memory.name === pokemonName) {
        const remember = objectHistory.indexOf(memory)
        setPokemon(objectHistory[remember])
        setPokeType(memory.types[0].type.name)
        newHistory(memory)
      }
    })

  }

  async function getPokemon(pokemonName) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const json = await resposta.json()
    setPokemon(json)
    newHistory(json)
    setCoin(true)
    setPokeType(json.types[0].type.name)


  }

  function newHistory(e) {
    setPokeHistory((prevState) => [...prevState, e.name])
    setPokeHistoryUpdated(pokeHistory.filter((value, index) => pokeHistory.indexOf(value) == index))


    setObjectHistory((prevState) => [...prevState, e])
    setObjectHistoryUpdated(objectHistory.filter((value, index) => objectHistory.indexOf(value) == index))
  }

  function addToTeam() {
    if (pokeTeam.length >= 6) {
      setModalMode(1)
      return
    }

    if (!pokemonName) {
      setModalMode(3)
      return
    }

    if (_.isEmpty(pokemon)) {
      setModalMode(2)
      return
    }

    setPokeTeam((prevState) => [...prevState, pokemon])
  }


  function getPokemonOut(event) {
    let toRemove = event.target.id
    setPokeTeamUpdated(pokeTeam.splice(toRemove, 1))
  }

  function handleClose() {
    setModalMode(0)
  }

  return (
    <>
      {/** Esse é o modal! **/}
      {modalMode !== 0 && <div className={`my-[21%] mx-[43%] flex w-80 h-60 bg-gray-700 absolute z-10 text-center flex-col rounded border border-solid border-gray-700 text-gray-200`}>
        <h2 className="py-2 justify-center uppercase bg-gray-500 rounded w-full">Atenção!</h2>
        <hr />
        <p className="m-4 p-2">{modalMode == 1 ? `Seu time pode conter somente até 6 pokemons!` : modalMode == 2 ? `Você precisa nos dar um nome de pokemon!` : `Não há pokemon para ser adicionado ao time!`}</p>
        <hr />
        <button className="p-2 w-28 m-auto rounded bg-gray-500 outline-gray-700 hover:bg-gray-400 hover:text-black transition-colors duration-300" onClick={() => handleClose()}>Entendi!</button>
      </div>}

      <div className={`${background} backdrop-opacity-25 bg-black relative h-screen bg-cover w-full ${modalMode ? `blur-sm` : ""}`}>
        <div className={`absolute h-screen w-full bg-black/50`}>
          <main className={`flex flex-row justify-center align-middle gap-8`}>
            <div className="">
              <div className={`w-80 min-h-[30rem] h-auto pb-8 mt-52 border justify-center border-gray-200 border-solid rounded ${backgroundTypes[pokeType] ? backgroundTypes[pokeType] : `bg-gray-700/60`}`}>
                <header className='mx-auto my-8 w-full text-center'>
                  <h1 className='bg-white/60  font-black text-3xl text-gray-800'>Welcome to my pokemOnReact!</h1>
                </header>
                <main className='flex-col flex w-full px-8 m-auto justify-center align-bottom text-center'>
                  <div className='justify-center my-auto align-middle text-center flex h-30'>
                    <img className='h-24 rounded-full bg-gray-100/50 m-4'
                      src={coin ? pokemon.sprites.front_default : ""}
                      alt=""
                    />
                  </div>

                  <input type="text" placeholder='Name of the pokemon' className='text-center p-2 rounded bg-gray-200 outline-gray-200' onChange={getPokemonName} onKeyUp={handleKeyPressed} id="nomePokemon" ref={nomeDoPokemon} />
                  <div className="flex row gap-1 ">
                    <button type="submit" className='p-1 rounded bg-gray-800 text-white hover:bg-gray-400 hover:text-black w-3/5 m-auto my-4 transition-colors ease-in-out duration-300' htmlFor="nomePokemon" onClick={handleClick}>Search</button>
                    <button type="submit" className='p-1 rounded bg-orange-600 hover:bg-orange-400 w-3/5 m-auto my-4 transition-colors ease-in-out duration-300' onClick={addToTeam}>Get!</button>
                  </div>
                </main>


                <div className="text-left gap-1.5 mx-10 flex flex-col justify-center align-center">

                  {
                    coin ?
                      <p className='px-2.5 py-1 bg-white/90 rounded capitalize'>Nome: {pokemon.name}</p>
                      : ""
                  }
                  {

                    coin ? pokemon.types.map((pokemonTypes, index) => {
                      return (
                        <p key={index} className='px-2.5 py-1 bg-white/90 rounded capitalize'>Tipo: {pokemonTypes.type.name}</p>)
                    })
                      :
                      ""
                  }
                </div>
              </div>

            </div>
            <div className="flex flex-col  mt-52 w-40 h-[30rem]">
              {
                pokeHistoryUpdated.map((pokemonSearched, index) => {

                  return (
                    <button key={index} className="w-40 bg-slate-300 rounded p-1 text-center mb-2 capitalize" onClick={() => handleHistory(pokemonSearched)}>{pokemonSearched}</button>
                  )
                })
              }
            </div>
          </main>
          <div className="flex flex-row w-8/12 mx-auto">
            {
              pokeTeam.map((pokemons, index) => {
                return (
                  <div key={index} id={index} className={`w-40 h-52 border  flex flex-col mt-12 mx-2 border-gray-200 border-solid rounded hover:-translate-y-2  transform-all ease-in-out duration-300 ${backgroundTypes[pokemons?.types[0]?.type?.name]}`}>
                    <button id={index} className="ml-28 mt-2 border-red-300 border border-solid text-center p-0 bg-red-500 w-10" onClick={getPokemonOut}>X</button>
                    <div className=' w-3/5 m-auto justify-center text-center mt-2'>
                      <div className='justify-center my-auto align-middle text-center flex flex-col h-30'>
                        <img className='h-24 w-full rounded-full bg-gray-100/50 mx-auto'
                          src={coin ? pokemons?.sprites?.front_default : ""}
                          alt=""
                        />
                        <h4 className="mt-2 capitalize">{pokemons.name}</h4>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}