import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `New Repository - ${Date.now()}`,
      techs: ["ReactJS", "React Native", "Node"],
      url: "https://github.com"
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete('repositories/' + id);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        }
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
