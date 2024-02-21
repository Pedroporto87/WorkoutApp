import { useState, useEffect } from 'react';
import { SeriesTabs } from './SeriesTabs';
import { WorkoutItem } from './workoutTable';
import { useGetWorkoutsBySerieQuery } from '../features/workoutApiSlide';

export const WorkoutList = () => {
  const [selectedSerieId, setSelectedSerieId] = useState(null);

  // Usando o hook para buscar os workouts da série selecionada
  const { data: workouts, isError, isLoading, refetch } = useGetWorkoutsBySerieQuery(selectedSerieId, {
    skip: selectedSerieId === null, // Isso evita que a query seja executada sem um selectedSerieId
  })

  // Função para atualizar a série selecionada pela child component 'SeriesTabs'
  const handleSerieSelected = (id) => {
    setSelectedSerieId(id);
  };

  useEffect(() => {
    if (selectedSerieId !== null) {
      refetch();
    }
  }, [selectedSerieId, refetch]);

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
          {workouts && workouts.length > 0 ? (
              Object.values(workouts).map((workout) => (
                <WorkoutItem key={workout.id} workout={workout} refetch={refetch} />
              ))
            ) : (
              <tr>
                <td colSpan="7">Nenhum exercício cadastrado para esta série.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};




