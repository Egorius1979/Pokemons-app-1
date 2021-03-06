import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getFilters, setLoadingStatus } from '../../redux/poke-reducer';

const Sidebar = () => {
  const { typeSelected, subtypeSelected } = useParams();
  const { types, subtypes } = useSelector((s) => s.poke);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getFilters());
  }, [dispatch]);

  return (
    <div className='left-sidebar'>
      <select
        name='card-type'
        id='card-type'
        value={typeSelected ? typeSelected.toLowerCase() : ''}
        onChange={(e) => {
          dispatch(setLoadingStatus());
          subtypeSelected
            ? history.push(`/cards/${e.target.value}/${subtypeSelected}/1`)
            : history.push(`/cards/${e.target.value}/1`);
        }}
      >
        <option value='' disabled>
          Choose type
        </option>
        {types.map((it) => (
          <option value={it} key={it}>
            {it}
          </option>
        ))}
      </select>
      <select
        name='card-subtype'
        id='card-subtype'
        value={subtypeSelected ? subtypeSelected.toLowerCase() : ''}
        onChange={(e) => {
          dispatch(setLoadingStatus());
          history.push(`/cards/${typeSelected || ''}/${e.target.value}/1`);
        }}
      >
        <option value='' disabled>
          Choose subtype
        </option>
        {subtypes.map((it) => (
          <option value={it} key={it}>
            {it}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(Sidebar);
