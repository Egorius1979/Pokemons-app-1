import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setPageAmount } from "../../redux/poke-reducer";

const Pagination = () => {
  const { typeSelected, subtypeSelected, currentPage } = useParams();
  const { itemsPerPage } = useSelector((s) => s.poke);
  const maxCards = useSelector((s) => s.poke.cards.length);
  const pagesAmount = Math.ceil(maxCards / itemsPerPage);
  const pagesArray = itemsPerPage
    ? Array(pagesAmount)
        .fill(null)
        .map((it, index) => index + 1)
    : [];
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageAmount(pagesAmount));
  }, [pagesAmount]);

  return (
    pagesArray.length !== 1 && (
      <div className="pagination">
        {pagesArray.map((it, index) => (
          <button
            type="button"
            disabled={+currentPage === it ? true : false}
            key={index}
            className="pagination-btn"
            onClick={() => {
              if (!typeSelected && !subtypeSelected) {
                history.push(`/cards/${it}`);
              }
              if (typeSelected && subtypeSelected) {
                history.push(`/cards/${typeSelected}/${subtypeSelected}/${it}`);
              }
              if (typeSelected && !subtypeSelected) {
                history.push(`/cards/${typeSelected}/${it}`);
              }
              if (!typeSelected && subtypeSelected) {
                history.push(`/cards//${subtypeSelected}/${it}`);
              }
            }}
          >
            {it}
          </button>
        ))}
      </div>
    )
  );
};

export default Pagination;
