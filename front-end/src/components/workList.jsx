import { useState } from 'react';
import { SeriesTabs } from './SeriesTabs';
import { WorkoutItem } from './workoutTable';
import { useGetWorkoutsBySerieQuery } from '../features/workoutApiSlide';

export const WorkoutList = () => {
  const [selectedSerieId, setSelectedSerieId] = useState(null);

  // Usando o hook para buscar os workouts da série selecionada
  const { data: workouts, isError, isLoading } = useGetWorkoutsBySerieQuery(selectedSerieId, {
    skip: !selectedSerieId, // Evita a execução da query se não houver uma série selecionada
  });

  // Função para atualizar a série selecionada pela child component 'SeriesTabs'
  const handleSerieSelected = (id) => {
    setSelectedSerieId(id);
  };

  if (isLoading) return <div>Carregando exercícios...</div>;
  if (isError) return <div>Erro ao carregar exercícios.</div>;

  return (
    <>
      <SeriesTabs onSerieSelected={handleSerieSelected} />
      <section className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Exercício</th>
              <th>Carga(kg)</th>
              <th>Reps</th>
              <th>Séries</th>
              <th>Descanso(seg)</th>
              <th>Criado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {workouts?.entities && Object.values(workouts.entities).map((workout) => (
              <WorkoutItem key={workout.id} workout={workout} />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};




