import '../styles/components/modalConformação.scss'

export function ModalConfirmacao({ isOpen, onClose, onConfirm, titulo, mensagem, imagem, confirmButtonText, returnButtomText }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{titulo}</h2>
        <img src={`${imagem}`}/>
        <p>{mensagem}</p>
        <div className="modal-actions">
          <button className='modal-actions-cancel' onClick={onClose}>{returnButtomText}</button>
          <button className='modal-actions-deletar' onClick={onConfirm}>{confirmButtonText}</button>
        </div>
      </div>
    </div>
  );
}

