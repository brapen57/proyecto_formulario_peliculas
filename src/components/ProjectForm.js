import React from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

function ProjectForm({ onAddProject }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Agregar los datos ingresados por el usuario a Firestore
      const docRef = await addDoc(collection(db, 'projects'), data);
      console.log('Documento agregado con ID:', docRef.id);

      // Llamar la función onAddProject para agregar el proyecto al estado local
      onAddProject({ id: docRef.id, ...data });

      // Limpiar el formulario después de guardar
      reset();
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
      alert('Hubo un problema al guardar el proyecto');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre del Proyecto:</label>
        <input
          type="text"
          {...register('name', { required: 'El nombre es obligatorio' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          {...register('description', {
            required: 'La descripción es obligatoria',
            minLength: {
              value: 10,
              message: 'La descripción debe tener al menos 10 caracteres'
            }
          })}
        ></textarea>
        {errors.description && <p>{errors.description.message}</p>}
      </div>
      <button type="submit">Guardar Proyecto</button>
    </form>
  );
}

export default ProjectForm;