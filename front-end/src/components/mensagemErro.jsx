import '../components/mensagemErro'
function MensagemErro({ mensagem, imagem }) {
  return (
    <div className='mensagem-erro' 
    style={{ 
        display: 'flex',
        justifyContent: 'center', 
        flexDirection: 'column', 
        textAlign: 'center', 
        alignItems: 'center',
        margin: '20px 0',
        }}>
      <img className='mensagem-erro-imagem' src={`${imagem}`} alt="Erro" style={{ maxWidth: '100px', margin: '20px 0' }} />
      <p className='mensagem-p' style={{ color: '#5e5e5e' }} >{mensagem}</p>
    </div>
  );
}

export default MensagemErro;