import React, { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import { db } from './components/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectList);
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    };

    fetchProjects();
  }, []);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
    setShowForm(false); 
  };

  return (
    <div className="App">
      <h1>Gestión de Proyectos</h1>
      {projects.length === 0 ? (
        <p>No hay proyectos</p>
      ) : (
        <ProjectList projects={projects} />
      )}
      <button onClick={() => setShowForm(true)}>Agregar Proyecto</button>
      {showForm && <ProjectForm onAddProject={addProject} />}
    </div>
  );
}

export default App;


