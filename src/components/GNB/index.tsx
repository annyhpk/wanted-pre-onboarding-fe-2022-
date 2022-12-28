import React, {useContext} from 'react';
import {NavLink, Link} from 'react-router-dom';
import LoginContext from '../../contexts/Login';

function GlobalNavBar() {
  const {logined} = useContext(LoginContext);

  const onClickLogout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div className="fixed w-screen flex justify-around bg-slate-300 py-2 top-0">
      <Link className="font-bold text-center" to="/">
        <p>Logo</p>
      </Link>
      {logined ? (
        <>
          <Link
            className="font-bold text-center bg-white rounded-2xl mx-2 p-1.5 w-20"
            to="/todo"
          >
            <p>TODO</p>
          </Link>
          <button
            type="button"
            className="bg-white rounded-2xl mx-2 p-1.5"
            onClick={onClickLogout}
          >
            로그아웃
          </button>
        </>
      ) : (
        <div>
          <NavLink to="/login">
            <button type="button" className="bg-white rounded-2xl mx-2 p-1.5">
              로그인
            </button>
          </NavLink>
          <NavLink to="/signup">
            <button type="button" className="bg-white rounded-2xl mx-2 p-1.5">
              회원가입
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default GlobalNavBar;
