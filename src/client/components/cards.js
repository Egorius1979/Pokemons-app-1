import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCards } from "../../redux/poke-reducer";

const Cards = () => {
  const { typeSelected, subtypeSelected, currentPage } = useParams();
  const {
    cards,
    itemsPerPage,
    pagesAmount,
    isInitialRequestDone,
    isLoading,
  } = useSelector((s) => s.poke);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards(typeSelected, subtypeSelected));
  }, [typeSelected, subtypeSelected, dispatch]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  return (
    <main
      className={
        pagesAmount === +currentPage
          ? "main-section align-items"
          : "main-section"
      }
    >
      {cards
        .filter(
          (it, index) =>
            index >= (+currentPage - 1) * itemsPerPage &&
            index <= +currentPage * itemsPerPage - 1
        )
        .map((it) => {
          return (
            !isLoading && (
              <div key={it.id} className="pokemon-card">
                <Link to={`/pokemon/${it.id}`}>
                  <img src={it.imageUrl} alt={it.name} className="cards-img" />
                </Link>
                <h3 className="names">{it.name}</h3>
                <p className="names">{it.artist}</p>
              </div>
            )
          );
        })}
      {isInitialRequestDone && !cards.length && (
        <p id="error">Неверный URL, либо нет таких покемонычей!</p>
      )}
    </main>
  );
};

export default React.memo(Cards);
