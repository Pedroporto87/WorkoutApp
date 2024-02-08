import PropTypes from 'prop-types'
import '../styles/components/workoutDetails.scss'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchApiData } from '../features/getWorkout/getWorkoutSlide';
import { WorkoutItem } from './workoutTable';
import { SeriesTabs } from './worklistTabs';
import { useGetSeriesQuery } from "../features/seriesApiSlice"

export const WorkoutList = () => {
  const [editedValues, setEditedValues] = useState({});
  const dispatch = useDispatch();
  const data = useSelector((state) => state.workout.data);
  const {
    data: series,
    isLoading,
    isSuccess,
    isError,
    error
    } = useGetSeriesQuery()
  
  let content

  if (isLoading) content = <p>Loading...</p>

  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);

  const handleInputChange = (field, value) => {
    // Atualiza os valores editados no estado local
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = series

    const tableTabs = ids?.length
        ? ids.map(serieId => <SeriesTabs key={serieId} serieId={serieId} />)
        : null


  content = (
  <>
      <section className='table-conteiner'>
        {tableTabs}
      <table>
        <thead>
          <tr>
            <th>Exercicio</th>
            <th>Carga(kg)</th>
            <th>Reps</th>
            <th>Series</th>
            <th>Descanso(seg)</th>
            <th>Criado em</th>
            <th>Ações </th>
          </tr>
        </thead>
      <tbody>
        
        {data.map((workout) => (
          <tr key={workout._id}>
            <WorkoutItem
              id={workout._id}
              key={workout._id}
              workout={workout}
              onInputChange={handleInputChange}
            />
            </tr>
            ))}
            </tbody>
            </table>
        </section>
    </>
    )
  }
}






WorkoutList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      carga: PropTypes.string.isRequired,
      reps: PropTypes.string.isRequired,
      series: PropTypes.number.isRequired,
      descanso: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};




