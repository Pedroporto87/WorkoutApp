import { useState, useEffect } from 'react';
import { SeriesTabs } from './SeriesTabs';
import { WorkoutItem } from './workoutTable';
import { useGetWorkoutsBySerieQuery, useUpdateWorkoutOrderMutation } from '../features/workoutApiSlide';
import { WorkoutForm2 } from './workoutForm2';
import MensagemErro from './mensagemErro';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PrintScreenButton } from '../components/printScreen'



export const WorkoutList = () => {
  const [selectedSerieId, setSelectedSerieId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [ localWorkouts, setLocalWorkouts ] = useState([])
  const [updateWorkoutOrder] = useUpdateWorkoutOrderMutation();

  // Usando o hook para buscar os workouts da série selecionada
  const { data: workouts, isError, isLoading, refetch } = useGetWorkoutsBySerieQuery(selectedSerieId, {
    skip: selectedSerieId === null, // Isso evita que a query seja executada sem um selectedSerieId
  })
  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(localWorkouts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLocalWorkouts(items)
    const orderedIds = items.map(item => item.id);
    try {
      await updateWorkoutOrder({
        serieId: selectedSerieId,
        orderedWorkouts: orderedIds, 
      }).unwrap();
    } catch (error) {
      console.error('Erro ao atualizar a ordem dos workouts', error);
    }
};
  const handleSerieSelected = (id) => {
    setSelectedSerieId(id);
  };

  useEffect(() => {
    if (selectedSerieId !== null) {
      refetch();
    }
  }, [selectedSerieId, refetch]);

  useEffect(() => {
    if (workouts) {
      setLocalWorkouts([...workouts].sort((a, b) => a.order - b.order));
    }
  }, [workouts]);

  if (isLoading) return <div>Carregando exercícios...</div>;
  if (isError) return <div>Erro ao carregar exercícios.</div>;

    return (
      <>
      <section className='print-screen'>
        <SeriesTabs onSerieSelected={handleSerieSelected} />
        <section className='table-container'>
          <DragDropContext onDragEnd={handleOnDragEnd}>
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
              <Droppable droppableId="droppable-workouts">
                {(provided) => (
                  <tbody {...provided.droppableProps} ref={provided.innerRef}>
                    {localWorkouts && localWorkouts.length > 0 ? (
                    localWorkouts.map((workout, index) => (
                      <Draggable key={workout.id} draggableId={workout.id.toString()} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                          >
                            <WorkoutItem workout={workout} refetch={refetch} />
                          </tr>
                            )}
                          </Draggable>
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
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
          <section className="footer-table-container">
            <div className='capture-button'>
              <PrintScreenButton className='capture-svg' />
              <span className='capture-span'>Capture a tabela</span> 
            </div>
            {!showAddForm && (
              <section className="add-exercise-header">
                <span className='add-exercise-span'>Adicionar Exercício</span>
                <button className="add-button" onClick={() => setShowAddForm(true)}>+</button>
              </section>
            )}
          </section>
        </section>
        </section>
      </>
    );
  };




