import React from 'react';

function ProjectList({ projects }) {
  return (
    <div>
      <h2>Lista de Proyectos</h2>
      {projects.length === 0 ? (
        <p>No hay proyectos disponibles</p>
      ) : (
        <ul>
          {projects.map((project, index) => (
            <React.Fragment key={project.id || index}>
              <li>
                <h3>{project.name}</h3>
                <p><strong>Descripción:</strong> {project.description}</p>
                {project.apiTitle && (
                  <>
                    <p><strong>Datos de la API:</strong></p>
                    <p><strong>Título de la API:</strong> {project.apiTitle}</p>
                    <p><strong>Cuerpo de la API:</strong> {project.apiBody}</p>
                  </>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectList;