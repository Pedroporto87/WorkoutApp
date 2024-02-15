import { useSelector, useDispatch } from 'react-redux';
import { useAddNewSerieMutation, selectAllSeries } from '../features/seriesApiSlice'; // Ajuste o caminho conforme necessário

export const SeriesTabs = ({ onSerieSelected }) => {
    const series = useSelector(selectAllSeries);
    const [addNewSerie] = useAddNewSerieMutation();
    const dispatch = useDispatch();

    const handleAddSerie = async () => {
        const newSerie = { title };
        await addNewSerie(newSerie).unwrap();
        // Atualize a lista de séries após adicionar uma nova
        dispatch(/* sua ação para atualizar a lista de séries */);
    };

    return (
        <div className="tabs">
            {series.map((serie) => (
                <button key={serie.id} onClick={() => onSerieSelected(serie.id)}>
                    Série {serie.id}
                </button>
            ))}
            <button onClick={handleAddSerie}>+</button>
        </div>
    );
};

