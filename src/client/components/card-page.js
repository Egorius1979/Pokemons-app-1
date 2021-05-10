import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getPokemonCard } from "../../redux/poke-reducer";
import Header from "./header";

const PokemonCard = () => {
  const { pokemonId } = useParams();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { pokemonCard, isLoggedIn } = useSelector((s) => s.poke);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonCard(pokemonId));
  }, [pokemonId, dispatch]);

  if (!isLoggedIn && !localStorage.getItem("poke-token")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <Header />
      <div className='card-content'>
        {pokemonId === pokemonCard.id && (
          <img
            src={pokemonCard.imageUrlHiRes}
            alt={pokemonCard.name}
            className={`pokemon-img ${imageLoaded ? "" : "not-at-all"}`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        <div className="pokemon-properties">
          <p className="grid">
            Name: <span className="poke-name">"{pokemonCard.name}"</span>
          </p>
          {pokemonCard.types && (
            <p className="grid">
              Type:
              <span>"{pokemonCard.types}"</span>
            </p>
          )}
          {pokemonCard.subtype && (
            <p className="grid">
              SubType:
              <span>"{pokemonCard.subtype}"</span>
            </p>
          )}
          <hr />
          {pokemonCard.attacks && (
            <div className="grid">
              <p>Damage:</p>
              <p>
                {pokemonCard.attacks.map((it) => (
                  <span key={it.name} className="prop-block__col-block">
                    "{it.name}"{" "}
                    <span className="damage-color">
                      {" "}
                      {it.damage ? `(${it.damage})` : ""}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          )}
          {pokemonCard.attacks && (
            <div className="grid">
              <p>Attack cost:</p>
              <p>
                {pokemonCard.attacks.map((it) => (
                  <span key={it.name} className="prop-block__col-block">
                    "{it.name}"{" "}
                    <span className="cost-color">
                      {it.convertedEnergyCost
                        ? `(${it.convertedEnergyCost})`
                        : ""}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          )}
          {pokemonCard.resistances && (
            <div className="grid">
              <p>Resistance:</p>
              <p>
                {pokemonCard.resistances.map((it) => (
                  <span key={it.type} className="prop-block__col-block">
                    "{it.type}"{" "}
                    <span className="res-color">
                      {it.value ? `(${it.value})` : ""}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          )}
          {pokemonCard.evolvesFrom && (
            <p className="grid">
              Evolves from:
              <span className="poke-evolvesFrom">
                "{pokemonCard.evolvesFrom}"
              </span>
            </p>
          )}
          <div>
            {(pokemonCard.attacks || []).map((it, index) => (
              <p className="attacks" key={index}>
                <span className="attack-num">
                  {it.text ? `Attack ${index + 1}:` : ""}
                </span>{" "}
                {it.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PokemonCard);
