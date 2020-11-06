import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { getPokemonCard } from '../../redux/poke-reducer';
import Header from './header';

const PokemonCard = () => {
  const { pokemonId } = useParams();
  const { pokemonCard, isLoggedIn } = useSelector((s) => s.poke);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonCard(pokemonId));
  }, [pokemonId, dispatch]);

  if (!isLoggedIn && !localStorage.getItem('poke-token')) {
    return <Redirect to='/login' />;
  }

  return (
    <>
      <div className='container'>
        <Header />
        <div className='card-content'>
          {pokemonId === pokemonCard.id && (
            <img src={pokemonCard.imageUrlHiRes} alt={pokemonCard.name} className='pokemon-img' />
          )}
          <div className='pokemon-properties'>
            <p>
              Name: <span className='poke-name'>"{pokemonCard.name}"</span>
            </p>
            {pokemonCard.types && (
              <p>
                Type:
                <span className='poke-type'>"{pokemonCard.types}"</span>
              </p>
            )}
            {pokemonCard.subtype && (
              <p>
                SubType:
                <span className='poke-subtype'>"{pokemonCard.subtype}"</span>
              </p>
            )}
            <hr />
            {pokemonCard.attacks && (
              <div className='prop-block'>
                <p className='prop-block__title'>Damage:</p>
                <p className='prop-block__col'>
                  {pokemonCard.attacks.map((it) => (
                    <span key={it.name} className='prop-block__col-block'>
                      "{it.name}" <span className='damage-color'> {it.damage ? `(${it.damage})` : ''}</span>
                    </span>
                  ))}
                </p>
              </div>
            )}
            {pokemonCard.attacks && (
              <div className='prop-block'>
                <p className='cost-title'>Attack cost:</p>
                <p className='prop-block__col'>
                  {pokemonCard.attacks.map((it) => (
                    <span key={it.name} className='prop-block__col-block'>
                      "{it.name}"{' '}
                      <span className='cost-color'>{it.convertedEnergyCost ? `(${it.convertedEnergyCost})` : ''}</span>
                    </span>
                  ))}
                </p>
              </div>
            )}
            {pokemonCard.resistances && (
              <div className='prop-block'>
                <p className='res-title'>Resistance:</p>
                <p className='prop-block__col'>
                  {pokemonCard.resistances.map((it) => (
                    <span key={it.type} className='prop-block__col-block'>
                      "{it.type}" <span className='res-color'>{it.value ? `(${it.value})` : ''}</span>
                    </span>
                  ))}
                </p>
              </div>
            )}
            {pokemonCard.evolvesFrom && (
              <p>
                EvolvesFrom:
                <span className='poke-evolvesFrom'>"{pokemonCard.evolvesFrom}"</span>
              </p>
            )}
            <div>
              {(pokemonCard.attacks || []).map((it, index) => (
                <p className='attacks' key={index}>
                  <span className='attack-num'>{it.text ? `Attack ${index + 1}:` : ''}</span> {it.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PokemonCard);
