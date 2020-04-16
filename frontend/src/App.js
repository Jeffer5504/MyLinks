import React, {useState, useEffect} from 'react';
import { MdDelete } from "react-icons/md";
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [links, setLinks] = useState([]);

  
  const [nome, setNome] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function loadLinks() {
      const response = await api.get('/links');

      setLinks(response.data);
    }
    loadLinks();
  },[]);

  async function handleAddLink(e) {
    e.preventDefault();

    const response = await api.post('/links', {
      nome,
      url,
    });

    setNome('');
    setUrl('');

    setLinks([...links, response.data]);
  }

  async function DeleteLink(id) {

    const response = await api.delete(`http://localhost:3030/links/${id}`);

    setLinks([...links.filter(link => link._id !== id)]);
  }
  return (
    <div id="app">
      <aside>
        <strong>Meus Links</strong>
        <form onSubmit= {handleAddLink}>
          <div className="input-block">
            <label htmlFor="Nome">Nome</label>
            
            <input 
              type="text" 
              name="nome" 
              id="nome" 
              placeholder="Ex: Google"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="url">Url</label>
            <input 
              type="text" 
              name="url" 
              id="url" 
              placeholder="Ex: http://google.com"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
        {links.map(link => (
          
          <li key={link._id} className="link-item">
            <a target = "_blank" rel = "noopener noreferrer" href ={link.url}>{link.nome}</a> 
           <button onClick={() => {DeleteLink(link._id)}}> <MdDelete size={16} color="#E02041" /></button>
          </li>
         
        ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
