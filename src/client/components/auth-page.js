import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const VALID_LOGIN = 'kode@kode.ru';
const VALID_PASSWORD = 'Enk0deng';

const Auth = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [logPassConfirmed, setLogPassConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (logPassConfirmed) alert("Ура, получилось! введите '123456' на следующей странице");
  }, [logPassConfirmed]);

  if (logPassConfirmed) return <Redirect to='/login/check' />;

  return (
    <form
      action='#'
      className='form'
      onSubmit={(e) => {
        e.preventDefault();
        if (login === VALID_LOGIN && password === VALID_PASSWORD) {
          setLogPassConfirmed(true);
        } else {
          setLogin('');
          setPassword('');
          setError('Впервые слышу! Повнимательней, пожалуйста!');
        }
      }}
    >
      <div className='form__field'>
        <input
          type='email'
          name='name'
          placeholder='Login'
          required
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
            setError('');
          }}
        />
        <span className='form__error'>поле должно содержать E-Mail в формате vasya@site.com</span>
      </div>
      <div className='form__field'>
        <input
          type='password'
          name='name'
          placeholder='Password'
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
        />
      </div>
      <button type='submit'>Отправить</button>
      <p className='log-pass-error'>{error}</p>
    </form>
  );
};

export default React.memo(Auth);
