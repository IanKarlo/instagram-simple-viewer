import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { validateToken } from '../../providers/token';
import { useUser } from '../../providers/user'

import { Button, Input } from 'antd';

import './index.css';

const TokenScreen = () => {

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const {setUser} = useUser();
  const history = useHistory();

  async function handleToken() {
    setLoading(true);
    try {
      const data = await validateToken(token);
      setUser({...data.data, token});
      setLoading(false);
      history.push('/home');
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  }

  return (
    <div className="token-screen">
      <h1>Sistema de visualização de mídia do Instagram</h1>
      <h2>Digite aqui seu Token:</h2>
      <Input className="input" size="large" placeholder="Digite aqui seu token..." value={token} onChange={e => {console.log(e.target.value); setToken(e.target.value)}}/>
      <Button type="primary" className="btn" onClick={handleToken} loading={loading}>Acessar</Button>
      <div className="token-link">
        <p>Para gerar o token acesse <a href="https://token.dsplay.tv/instagram" target="_blank"  rel="noreferrer">esse website.</a></p>
      </div>
    </div>
  )
}

export default TokenScreen;