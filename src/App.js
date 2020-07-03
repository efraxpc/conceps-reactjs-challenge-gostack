import React, {useState, useEffect} from "react";
import api from "./services/api";
import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    async function handleAddRepository() {
        const response = await api.post("repositories", {
            title: "Desafio ReactJS",
            url: "https://github.com/Rocketseat/umbriel",
            techs: ["php", "node"],
        });
        const repository = response.data
        setRepositories([...repositories, repository]);
    }

    const handleRemoveRepository = async (id) => {
        await api.delete(`repositories/${id}`)
        let repositoriesCopy = [...repositories]
        setRepositories(repositoriesCopy.filter(repository => repository.id !== id));
    }

    useEffect(() => {
        api.get('repositories').then((response) => {
            setRepositories(response.data)
        })
    }, [])

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map((repository) => (
                    <li key={repository.id}>
                        {repository.title}
                        <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remover
                        </button>
                    </li>
                ))}

            </ul>
            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
