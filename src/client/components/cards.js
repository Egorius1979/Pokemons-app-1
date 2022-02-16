import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCards } from '../../redux/poke-reducer';
import { Loader } from './Loader';

const Cards = () => {
  const [counter, setCounter] = useState(0);
  const { typeSelected, subtypeSelected, currentPage } = useParams();
  const {
    cards,
    itemsPerPage,
    pagesAmount,
    isInitialRequestDone,
    isLoading,
    error,
  } = useSelector((s) => s.poke);
  const dispatch = useDispatch();

  const currentCards = cards.filter(
    (it, index) =>
      index >= (+currentPage - 1) * itemsPerPage &&
      index <= +currentPage * itemsPerPage - 1
  );

  useEffect(() => {
    setCounter(0);
    dispatch(getCards(typeSelected, subtypeSelected));
  }, [typeSelected, subtypeSelected, dispatch]);

  useEffect(() => {
    setCounter(0);
    window.scroll(0, 0);
  }, [currentPage]);

  return (
    <main
      onLoad={() => {
        console.log(counter);
        setCounter(counter + 1);
      }}
      className={
        pagesAmount === +currentPage
          ? 'main-section align-items'
          : 'main-section'
      }>
      {currentCards.map((it) => {
        return (
          !isLoading && (
            <div
              key={it.id}
              className={`pokemon-card ${
                counter === itemsPerPage ||
                (+currentPage === pagesAmount &&
                  counter === currentCards.length)
                  ? ''
                  : 'not-at-all'
              }`}>
              <Link to={`/pokemon/${it.id}`}>
                <img src={it.imageUrl} alt={it.name} className="cards-img" />
              </Link>
              <h3 className="names">{it.name}</h3>
              <p className="names">{it.artist}</p>
            </div>
          )
        );
      })}
      {counter < currentCards.length && !error && <Loader />}
      {error && (
        <p className="error">
          Ошибка сосединения с сервером API. Превышен лимит запросов.
          Пожалуйста, повторите попытку позже!
        </p>
      )}
      {isInitialRequestDone && !cards.length && (
        <p id="error">Неверный URL, либо нет таких покемонычей!</p>
      )}
    </main>
  );
};

export default React.memo(Cards);
