import React, { useState } from 'react';
import './sidebar.css';
import InsertSupabase from './InsertSupabase';
import AfiliadosList from './AfiliadosList';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
function Sidebar() {
  const [photoUrl, setPhotoUrl] = useState('https://via.placeholder.com/70x121'); // Armazena a URL da imagem selecionada
  const [divHeights, setDivHeights] = useState({
    'word1': '3%',
    'word2': '20%',
    'word3': '3%',
    'word4': '3%',
    'word5': '3%',
  });     
  // Função para lidar com o evento de seleção de arquivo
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Obtem o arquivo selecionado

    // Verifica se o arquivo é uma imagem
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file); // Cria uma URL temporária para o arquivo
      setPhotoUrl(url); // Atualiza o estado com a URL da imagem selecionada
    }
  };
  // Função para lidar com o envio do formulário
  const handleSave = (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    // Obtem os valores dos campos do formulário
    const nome = event.target.elements.name.value;
    const numero = event.target.elements.number.value;
    const opcao = event.target.elements.opcoes.value;

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
  
    if (!file) {
      const message = document.createElement('div');
      message.innerText = 'INSERIR FOTO';
      message.classList.add('error-message');
      document.body.appendChild(message);
      setTimeout(() => {
        document.body.removeChild(message);
      }, 2000);
      return;
    }

    const data = {
      numero: `${numero}@c.us`,
      mensagem: `Olá, ${nome}! Você foi adicionado ao quadro de afiliados da Cecchin Eventos.`,
    };
    // Configura a opção da requisição
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    // Chama a função insertAfiliado do componente InsertSupabase passando os valores obtidos
    InsertSupabase()
      .insertAfiliado(nome, numero, opcao)
      .then(() => {
        // Chama o fetch para enviar a mensagem via API do Whatsapp
        fetch('https://8a87-18-231-84-255.ngrok-free.app/afiliadoaddmsg', options)
          .then((response) => response.json())
          .then((data) => console.log(data.id))
          .catch((error) => console.error(error));
          const fileInput = document.getElementById('file-input');
          const file = fileInput.files[0];
          const clearFileInput = () => {
            if (file) {
              file.value = null;
            }
          };
          if (file) {
            console.log(nome)
            InsertSupabase().enviarFoto(file, nome);
            clearFileInput();
          } 
  
        // Exibe mensagem de aviso na tela
        const message = document.createElement('div');
        message.innerText = 'Afiliado inserido com sucesso!';
        message.classList.add('success-message');
        document.body.appendChild(message);
  
        // Remove mensagem de aviso e limpa campos após 2 segundos
        setTimeout(() => {
          document.body.removeChild(message);
          event.target.reset();
          setPhotoUrl('https://via.placeholder.com/70x121');
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        // Exibe mensagem de erro na tela
        const message = document.createElement('div');
        message.innerText = 'Erro ao inserir afiliado';
        message.classList.add('error-message');
        document.body.appendChild(message);
        setTimeout(() => {
          document.body.removeChild(message);
        }, 2000);
      });
  };
  const handleClick = (word) => {
    const newHeights = { ...divHeights };
    newHeights[word] = divHeights[word] === '3%' ? '20%' : '3%';
    setDivHeights(newHeights);
  };
/*   const [iframewidth, setiframewidth] = useState(false);
  function onclicktest() {
    setiframewidth(!iframewidth);
  } */
  
  return (
    <div className='sidebar content1'>
      <div><h1 style={{ marginLeft:'10px'}} className="h1style">Cecchin Eventos</h1></div>
      <div style={{ height: '100%', width: '100%' }}>
        <div className='cadastrarafiliado'>
            <div style={{
              marginLeft:'1%',
              width: divHeights['word1'] === '3%' ? '0%' : '1%',
              height: divHeights['word1'] === '3%' ? '0%' : '2%',
              position:'absolute',
              backgroundColor:'gray'
            }}>
            </div>
          <span style={{ marginLeft:'20%', cursor: 'pointer', color: divHeights['word1'] === '3%' ? 'gray' : 'white'}} onClick={() => handleClick('word1')}>Cadastrar Afiliados</span>
          { divHeights['word1'] === '3%' ? ( null ) : ( 
                  <div className='profile'>
                  <div className='photo'>
                  <img src={photoUrl} alt='pfp' onClick={() => document.getElementById('file-input').click()}/>
                  <input id='file-input' type='file' accept='image/*' onChange={handleFileSelect} style={{display: 'none'}} />
                  </div>
                  <form onSubmit={handleSave}>
                  <div>
                  <label htmlFor='name'>Name: / Cargo:</label>
                  <select id="opcoes" name="opcoes">
                    <option value="garçom">Garçom</option>
                    <option value="forno">Forno</option>
                  </select>
                  <input type='text' id='name' name='name'/>
                  </div>
                  <div>
                  <label htmlFor='number'>Phone:</label>
                  <input id='number' onInput={(event) => {
                      const value = event.target.value.replace(/\D/g, ''); // remove todos os caracteres não numéricos
                      event.target.value = value;}} // atualiza o valor do campo
                  />
                  </div>
                  <button className="save">Salvar</button>
                  </form>
                </div>
           ) }
        </div>
        <div 
          style={{ height: `${divHeights['word2']}`, width: '100%', margin: 0, padding: 0 }}>
            <div style={{
              marginLeft:'1%',
              width: divHeights['word2'] === '3%' ? '0%' : '1%',
              height: divHeights['word2'] === '3%' ? '0%' : '3%',
              position:'absolute',
              backgroundColor:'gray'
            }}>
            </div>
            <div className='ihover'>
            <i style={{ marginLeft:'10%', color: divHeights['word2'] !== '3%' ? 'white' : '' }} className="zmdi zmdi-accounts zmdi-hc-2x"></i>
          <span style={{ color: divHeights['word2'] === '3%' ? 'gray' : 'white', marginLeft:'10%', marginTop:'7%', cursor: 'pointer'}} onClick={() => handleClick('word2')}>Afiliados</span></div>
          { divHeights['word2'] === '3%' ? ( null ) : (<AfiliadosList></AfiliadosList>) }
        </div>
{/*         <button style={{width: iframewidth ? '20%' : '18%', height:'3%', marginTop: iframewidth ? '95%' : '200%'}} onClick={() => onclicktest()}>
          {iframewidth ? 'Fechar' : 'Abrir'}
        </button>
        <div style={{height: "40%", width: iframewidth ? '300%' : '105%' }}>
            <iframe
                title='test'
                src={`https://ora.ai/embed/ae1bb3af-abcd-4afa-863c-82e32b171cc4`}
                width="100%"
                height="100%"
                style={{ border: "0", borderRadius: "4px" }}
            />
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;