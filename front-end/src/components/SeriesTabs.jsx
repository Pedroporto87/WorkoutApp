import '../styles/components/seriesTabs.scss'
import { useAddNewSerieMutation, useGetSeriesQuery, useUpdateSerieMutation, useDeleteSerieMutation } from '../features/seriesApiSlice';
import { useState, useEffect } from 'react';
import { MdOutlineEditNote, MdDeleteForever, MdDone, MdCancel } from "react-icons/md";



export const SeriesTabs = ({ onSerieSelected }) => {
    const [title, setTitle] = useState('');
    const [selectedSerieId, setSelectedSerieId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: series, isError, isLoading } = useGetSeriesQuery();
    const [addNewSerie] = useAddNewSerieMutation();
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [updateSerie] = useUpdateSerieMutation();
    const [deleteSerie] = useDeleteSerieMutation()
    
    useEffect(() => {
        if (series?.ids?.length > 0 && selectedSerieId === null) {
            const firstSerieId = series.ids[0];
            onSerieSelected(firstSerieId);
            setSelectedSerieId(firstSerieId);
        }
    }, [series, onSerieSelected]);

    const handleSelectSerie = (id) => {
        onSerieSelected(id);
        setSelectedSerieId(id);
    };
    const handleEditClick = () => {
        setIsEditingTitle(true);
        setEditedTitle(series?.entities[selectedSerieId]?.title || '');
    };
    const handleInputChange = (value) => {
        setEditedTitle(value);
    };

    const handleUpdateClick = async () => {
        try {
            await updateSerie({ id: selectedSerieId, title: editedTitle }).unwrap();
            // Aqui você pode querer refetch as séries ou atualizar o estado local
            setIsEditingTitle(false);
        } catch (error) {
            console.error("Erro ao atualizar o título da série", error);
        }
    };
    const handleCancelClick = () => {
        setIsEditingTitle(false);
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

    const handleDeleteSerie = async () => {
        if (selectedSerieId) {
            try {
                await deleteSerie({ id: selectedSerieId }).unwrap();
                setSelectedSerieId(null); // Resetar o selectedSerieId ou definir para outro valor válido
                // Você pode querer refetch as séries aqui ou contar com a invalidação das tags para atualização automática
            } catch (error) {
                console.error("Erro ao deletar a série", error);
            }
        }
    };

    return (
        <section className='tabs-conteiner'>
            <section className='tabs-header'>
                <section className='serie-info'>
                    {isEditingTitle ? (
                            <input
                                type="text"
                                className='serie-title-input'
                                value={editedTitle}
                                onChange={(e) => handleInputChange(e.target.value)}
                            />
                        ) : (
                            <p>{series?.entities[selectedSerieId]?.title}</p>
                        )}
                        
                        {isEditingTitle ? (
                            <>
                                <MdDone className='ok-button' onClick={handleUpdateClick} />
                                <MdCancel className='cancel-button' onClick={handleCancelClick} />
                            </>
                        ) : (
                            <MdOutlineEditNote className='edit-button' onClick={handleEditClick} />
                        )}
                        </section>
                        <section className="delete-serie-section">
                            <a href="#" className="delete-serie-link" 
                            onClick={(e) => {e.preventDefault(); handleDeleteSerie()}}>
                            Deletar série?</a>
                            <MdDeleteForever className="delete-serie-icon" onClick={handleDeleteSerie} />
                        </section>
                    
                </section>
            <div className="tabs">
                {series?.ids?.map((id, index) => (
                    <button className={`tabs-button ${selectedSerieId === id ? 'selected' : ''}`} key={id} onClick={() => handleSelectSerie(id)}>
                        Série {index + 1}
                    </button>
                ))}
                <button className='tabs-button' onClick={() => setIsModalOpen(true)}>+</button>
                {isModalOpen && (
                    <div className="modal">
                        <input
                            className='serie-modal-input'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Título da Série"
                        />
                        <button className='modal-confirm-button' onClick={handleAddSerie}>Ok</button>
                        <button className='modal-cancel-button' onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    </div>
                )}
                </div>
                
        </section>
    );
};
