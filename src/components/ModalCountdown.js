import React, { useState, useEffect } from 'react';
import './ModalCountdown.css'

function Modal({ModalContent}) {
  // Estado para controlar a visibilidade do modal
  const [visible, setVisible] = useState(true);
  // Estado para controlar a contagem regressiva
  const [countdown, setCountdown] = useState(5);
  const a = ModalContent;


  // Função para fechar o modal
  function closeModal() {
        setVisible(false);
      }

  // Função que conta 5 segundos e fecha automaticamente o modal
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Atualiza a contagem regressiva no botão de fechar
  useEffect(() => {
    if (countdown === 0) {
      closeModal();
    }
  }, );

  return (
    
    <>
      {visible && (
      <div className='modal'>
        <div className='modal-content'>
          <div className='modalbody'>
            {a ? (<h2>{a}</h2>):(<h2>Insira dia e hora!</h2>)} 
          </div>
          <button className="close-btn" onClick={closeModal}>
          Fechar ({countdown})
        </button>
        </div></div>
      )}

      </>
      
  );
}

export default Modal;

