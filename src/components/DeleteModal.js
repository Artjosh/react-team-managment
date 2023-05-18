import React, { useState, useEffect } from 'react';
import './ModalCountdown.css'

function DeleteModal({ Delete }) {
  // Estado para controlar a visibilidade do modal
  const [visible, setVisible] = useState(true);
  // Estado para controlar a contagem regressiva
  const [countdown, setCountdown] = useState(5);


  // Função para fechar o modal
  function closeModal() {
        setVisible(false);
        Delete();
      }
  // Função para fechar o modal
    function closeModal2() {
      setVisible(false);
    }

  // Função que conta 5 segundos e fecha automaticamente o modal
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      closeModal2();
    }
  }, );

  return (
    
    <>
      {visible && (
      <div className='modal'>
        <div className='modal-content'>
          <div className='modalbody'>
            <h2>Cuidado! Está prestes a deletar o evento.</h2> 
          </div>
          <button className="close-btn" onClick={closeModal}>
          Deletar ({countdown})
        </button>
        </div></div>
      )}

      </>
      
  );
}

export default DeleteModal;

