import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonCard } from "../../redux/poke-reducer";
import Header from "./header";

const PROPERTIES = {
  name: "Name:",
  types: "Type:",
  subtype: "SubType:",
  attacks: "Damage:",
  // resistances: "Resistance:",
  evolvesFrom: "EvolvesFrom:",
};

const PokemonCard = () => {
  const { pokemonId } = useParams();
  const { pokemonCard } = useSelector((s) => s.poke);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonCard(pokemonId));
  }, [pokemonId]);

  return (
    <div className="container">
      <Header />
      <div className="card-content">
        <img
          src={pokemonCard.imageUrlHiRes}
          alt={pokemonCard.name}
          className="pokemon-img"
        />
        <div className="pokemon-properties">
          {Object.keys(PROPERTIES).map((it, index) => (
            <p key={index}>
              {PROPERTIES[it]}
              <span>
                {it === "attacks"
                  ? (pokemonCard[it] || []).map((it, index) => (
                      <span>
                        {" "}
                        {`Attack ${index + 1}`}: "{it.name}"{" "}
                        {it.damage ? `(${it.damage})` : ""}, {it.text}
                      </span>
                    ))
                  : `"${pokemonCard[it]}"`}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
