import '../styles/components/seriesTabs.css'
import { useAddNewSerieMutation, useGetSeriesQuery } from '../features/seriesApiSlice';
import { useState, useEffect } from 'react';



export const SeriesTabs = ({ onSerieSelected }) => {
    const [title, setTitle] = useState('');
    const [selectedSerieId, setSelectedSerieId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: series, isError, isLoading } = useGetSeriesQuery();
    const [addNewSerie] = useAddNewSerieMutation();

    useEffect(() => {
        if (series?.ids?.length > 0) {
            onSerieSelected(series.ids[0]);
        }
    }, [series, onSerieSelected]);

    const handleSelectSerie = (id) => {
        onSerieSelected(id);
        setSelectedSerieId(id)
        // Chama a função passada via props com o id da série selecionada
    };

    const handleAddSerie = async () => {
        if (!title.trim()) return;
        const newSerie = { title };
        await addNewSerie(newSerie).unwrap();
        setTitle('');
        setIsModalOpen(false);
    };
    
    if (isLoading) return <div>Carregando séries...</div>;
    if (isError) return <div>Erro ao carregar séries.</div>;

    

    return (
        <div className="tabs">
             {series?.ids?.map((id, index) => (
                <button key={id} onClick={() => handleSelectSerie(id)}>
                    Série {index + 1}
                </button>
            ))}
            <button onClick={() => setIsModalOpen(true)}>+</button>
            {isModalOpen && (
                <div className="modal">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título da Série"
                    />
                    <button onClick={handleAddSerie}>Ok</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                </div>
            )}
            <div className="selected-serie-title">
            <p>{series?.entities[selectedSerieId]?.title || 'Série não encontrada'}</p>
            </div>
        </div>
    );
};
