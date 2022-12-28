import React, {useCallback, FormEvent, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Input from '../components/Input';
import PageWrapper from '../components/PageWrapper';
import Axios from 'axios';
import LoginContext from '../contexts/Login';

function SignUpPage() {
  const {setLogined} = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/todo');
  }, []);

  const onSubmitForm = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const loginData = {
      email: form.get('email'),
      password: form.get('password'),
    };
    try {
      const token = await Axios.post(
        'http://localhost:8000/auth/signup',
        loginData
      );
      localStorage.setItem('token', token.data.access_token);
      setLogined(true);
      navigate('/todo');
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return (
    <PageWrapper>
      <div className="p-5 rounded-xl border-solid border-2 border-black w-80">
        <h3 className="font-bold">회원가입</h3>
        <form className="grid gap-2" onSubmit={onSubmitForm}>
          <Input
            name="email"
            type="email"
            label="아이디(email)"
            placeholder="아이디(이메일)"
            msg="'@'를 포함"
          />
          <Input
            name="password"
            type="password"
            label="패스워드(password)"
            placeholder="********"
            msg="8자리 이상"
          />
          <button
            type="submit"
            className="font-bold bg-slate-300 rounded-xl border-solid w-28 justify-self-center"
          >
            가입하기
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}

export default SignUpPage;
