import '../styles/components/seriesTabs.scss'
import { useAddNewSerieMutation, useGetSeriesQuery, useUpdateSerieMutation, useDeleteSerieMutation } from '../features/seriesApiSlice';
import { useState, useEffect } from 'react';
import { MdOutlineEditNote, MdDeleteForever, MdDone, MdCancel } from "react-icons/md";
import { ModalConfirmacao } from '../components/ModalConfirmação'
;



export const SeriesTabs = ({ onSerieSelected }) => {
    const [title, setTitle] = useState('');
    const [selectedSerieId, setSelectedSerieId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { data: series , isError, isLoading } = useGetSeriesQuery('serieList',{
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
       // pollingInterval: 15000,

        
    });
    const [addNewSerie] = useAddNewSerieMutation();
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [updateSerie] = useUpdateSerieMutation();
    const [deleteSerie] = useDeleteSerieMutation();
    
    useEffect(() => {
        if (series?.ids?.length > 0 && selectedSerieId === null) {
          const firstSerieId = series.ids[0]; 
          onSerieSelected(firstSerieId); 
          setSelectedSerieId(firstSerieId); 
        }
      }, [series, selectedSerieId, onSerieSelected]);



    const handleSelectSerie = (id) => {
        onSerieSelected(id);
        setSelectedSerieId(id);
    };
    const handleEditClick = () => {
        setIsEditingTitle(true);
        setEditedTitle(serieTitles || '');
    };
    const handleInputChange = (value) => {
        setEditedTitle(value);
    };

    const handleUpdateClick = async () => {
        try {
            await updateSerie({ id: selectedSerieId, title: editedTitle }).unwrap();
            setIsEditingTitle(false);
        } catch (error) {
            console.error("Erro ao atualizar o título da série", error);
        }
    };
    const handleCancelClick = () => {
        setIsEditingTitle(false);
    };

    const handleCloseModal = () => {
        setIsDeleteModalOpen(false);
        document.body.classList.remove("blur");
      };

      const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
        document.body.classList.add("blur");
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
                setSelectedSerieId(null);
            } catch (error) {
                console.error("Erro ao deletar a série", error);
            }
        }
    };

    const serieTitles = series?.entities[selectedSerieId]?.title;
    const serieIds = series?.ids;

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
                            <p>{serieTitles}</p>
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
                            onClick={(e) => {e.preventDefault(); handleOpenDeleteModal();}}>
                            Deletar série?</a>
                            <MdDeleteForever className="delete-serie-icon" onClick={handleOpenDeleteModal} />
                        </section>
                        <ModalConfirmacao
                            isOpen={isDeleteModalOpen}
                            onClose={handleCloseModal}
                            onConfirm={() => {
                                handleDeleteSerie();
                                handleCloseModal(); // Fechar o modal após a confirmação
                            }}
                            imagem="../../imagem-confirmaçao.jpg"
                            titulo="Deletar Serie?"
                            mensagem="Você tem certeza que deseja deletar esta série?"
                            confirmButtonText="Deletar"
                            returnButtomText="Retornar"
                        />
                </section>
            <div className="tabs">
                {serieIds.map((id, index) => (
                    <button className={`tabs-button ${selectedSerieId === id ? 'selected' : ''}`} key={id} onClick={() => handleSelectSerie(id)}>
                        Série {index + 1}
                    </button>
                ))}
                <button className='tabs-button' onClick={() => setIsModalOpen(true)}>+</button>
                {isModalOpen && (
                    <section className="modal-overlay">
                        <div className="modal">
                            <input
                                className='serie-modal-input'
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título da Série"
                            />
                            <section className="modal-button-container">
                                <button className='modal-confirm-button' onClick={handleAddSerie}>Ok</button>
                                <button className='modal-cancel-button' onClick={() => setIsModalOpen(false)}>Cancelar</button>
                            </section>
                        </div>
                    </section>
                )}
                </div>
                
        </section>
    );
};
