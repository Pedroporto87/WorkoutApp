import { useState, useEffect } from 'react';
import { SeriesTabs } from './SeriesTabs';
import { WorkoutItem } from './workoutTable';
import { useGetWorkoutsBySerieQuery } from '../features/workoutApiSlide';
import { WorkoutForm2 } from './workoutForm2';
import MensagemErro from './mensagemErro';


export const WorkoutList = () => {
  const [selectedSerieId, setSelectedSerieId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const sortedWorkouts = workouts ? [...workouts].sort((a, b) => {
    // Converte as datas para objetos Date, garantindo que estejam em um formato consistente
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
  
    // Compara as datas de forma crescente
    return dateA - dateB;
  }) : [];

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
          {sortedWorkouts && sortedWorkouts.length > 0 ? (
              sortedWorkouts.map((workout) => (
                <WorkoutItem key={workout.id} workout={workout} refetch={refetch} />
              ))
            ) : (
              <tr>
                <td colSpan="7"> 
                  <div className='mensagem-erro'>
                  <MensagemErro
                    mensagem="Nenhum exercício cadastrado para esta série."
                    imagem="../../istockphoto-1427089520-612x612.jpg"
                  />
                  </div>
                </td>
              </tr>
            )}
            {showAddForm && (
            <WorkoutForm2 refetch={refetch} setShowAddForm={setShowAddForm} selectedSerieId={selectedSerieId} />
          )}
          </tbody>
          
        </table>
        {!showAddForm && (
            <section className="add-exercise-header">
              <span className='add-exercise-span'>Adicionar Exercício</span>
              <button className="add-button" onClick={() => setShowAddForm(true)}>+</button>
            </section>
            )}
      </section>
    </>
  );
};




