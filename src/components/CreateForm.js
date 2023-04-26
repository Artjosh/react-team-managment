import React, { useState, useEffect } from 'react';
import AfiliadoEvent from './AfiliadoEvent';
import './Createform.css';
import InsertSupabase from './InsertSupabase';
import { FaSearch } from 'react-icons/fa';
import Mapa from './Mapa'
import SelectSupabase from './SelectSupabase';

  function CreateForm({ setShowForm }) {

    const [endereco, setEndereco] = useState('');
    const [lat, setLat] = useState('-30.042399707172002');
    const [long, setLong] = useState('-51.134700155904326');
    const [contratante, setContratante] = useState('');
    const [pessoas, setPessoas] = useState('');
    const [celularContratante, setCelularContratante] = useState('');
    const [celular2Contratante, setCelular2Contratante] = useState('');
    const [forno, setForno] = useState([]);
    const [garcons, setGarcons] = useState([]);
    const [dia, setDia] = useState('');
    const [hora, setHora] = useState('');
    const adicionais = ['Bebidas', 'Pasteis'];
    const [showModal, setshowModal] = useState(false);
    const [f, setF] = useState([]);


    const handleSubmit = async (e) => {
      e.preventDefault(e);
      const afiliados = {
        forno: forno,
        garcons: garcons
      };
      const confirmados = {
        forno: [],
        garcons: []
      };
      const novoEvento = {
        contratante,
        endereco,        
        pessoas,
        celularContratante,
        celular2Contratante,
        afiliados,
        dia,
        hora,
        confirmados
      };
      InsertSupabase()
        .insertEvento(novoEvento)
        .then(() => {
          // Exibe mensagem de aviso na tela
          const message = document.createElement('div');
          message.innerText = 'Evento inserido com sucesso!';
          message.classList.add('success-message');
          document.body.appendChild(message);        
          // Remove mensagem de aviso e limpa campos após 2 segundos
          setTimeout(() => {
            document.body.removeChild(message);
            setShowForm(false);
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          // Exibe mensagem de erro na tela
          const message = document.createElement('div');
          message.innerText = 'Erro ao inserir evento';
          message.classList.add('error-message');
          document.body.appendChild(message);
          setTimeout(() => {
            document.body.removeChild(message);
          }, 2000);
        });

        for (const id of forno.join(',').split(',')) {
          SelectSupabase({ setAfiliados: 1 })
            .getAfiliadoById(id.trim())
            .then((result) => {
              const { id, nome, numero } = result;
              console.log(`id: ${id}, nome: ${nome}, numero: ${numero}`);
              const data = {
                numero: `${numero}@c.us`,
                mensagem: `👋 Olá, ${nome}! Te convidaram para um evento 💰 💰`,
              };
              // Configura a opção da requisição
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              };
              fetch('http://localhost:3001/afiliadoaddeventomsg', options)
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }
        for (const id of garcons.join(',').split(',')) {
          SelectSupabase({ setAfiliados: 1 })
            .getAfiliadoById(id.trim())
            .then((result) => {
              const { nome, numero } = result;
              const data = {
                numero: `${numero}@c.us`,
                mensagem: `👋 Olá, ${nome}! Te convidaram para um evento 💰 💰 `,
              };
              // Configura a opção da requisição
              const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              };
              fetch('http://localhost:3001/afiliadoaddeventomsg', options)
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }
    };

  
    useEffect(() => {
      const escFunction = (event) => {
        if (event.keyCode === 27) {
          setShowForm(false);
        }
      };
      document.addEventListener('keydown', escFunction, false);
      return () => {
        document.removeEventListener('keydown', escFunction, false);
      };
    }, [setShowForm]);

/*     useEffect(() => {
      if (!dia || !hora) {
        setshowModal(true);
      } else {
        setshowModal(false);
      }
    }, [dia, hora]); */



    const handlesearchclick = async () => {
      console.log(f)
      const carregarCoordenadas = async () => {
        const endereco2 = encodeURIComponent(endereco + "Porto Alegre, Rio Grande do Sul, Brazil");
        const api_url = `https://api.geoapify.com/v1/geocode/search?text=${endereco2}&apiKey=f823c046cabf44b4aa95ee616599ba9a`;
          
        try {
          const response = await fetch(api_url);
          const data = await response.json();
          setLat(data.features[0].properties.lat);
          setLong(data.features[0].properties.lon);
        } catch (error) {
          console.log(error);
        }
      };      
      if (endereco !== '') {
        carregarCoordenadas();
      }
    }

  return (
    <div className="form-container" >
        <form className='eventform'>
          <div className='autocomplete-container' id='autocomplete'>          
          <input required className='bigerinput' type="text" placeholder='Endereço' value={endereco} onChange={e =>setEndereco(e.target.value)} />
                <button className='search-button2' onClick={handlesearchclick} ><FaSearch color='#fff'/></button>
          <input required type="text" placeholder="Nome do contratante" value={contratante} onChange={e => setContratante(e.target.value)} />
          <input required type="number" placeholder="Número de pessoas" onInput={(event) => {
            const value = event.target.value.replace(/\D/g, ''); // remove todos os caracteres não numéricos
            event.target.value = value;}} value={pessoas} onChange={e => setPessoas(e.target.value)} />
          <input required type="tel" placeholder="Numero contratante" value={celularContratante}  onChange={e => setCelularContratante(e.target.value)} />
          <input required type="tel" placeholder="Numero alternativo" value={celular2Contratante} onChange={e => setCelular2Contratante(e.target.value)} />
          <input required className="smallinput" type="date" placeholder="Dia" value={dia} onChange={e => setDia(e.target.value)} />
          <input required className="smallinput" type="time" placeholder="Horario" value={hora} onChange={e => setHora(e.target.value)} />
          
          
          {adicionais.map((adicional, index) => (
            <React.Fragment key={index}>
              <label style={{ marginLeft:'2px' }} htmlFor={adicional}>{adicional}
               </label> <input type="checkbox" style={{ width:'25px' }}  id={adicional} name={adicional} value={adicional} />
            </React.Fragment>
          ))}
           
      <div className='body'>
        <AfiliadoEvent className='Forno' f={f} onChange2={e => setF(prevForno => [...prevForno, e.target.value])} onChange={e => setForno(prevForno => [...prevForno, e.target.value])} test={showModal} dia={dia} hora={hora}/>
        <AfiliadoEvent className='Garçons' f={f} onChange2={e => setF(prevForno => [...prevForno, e.target])} onChange={e => setGarcons(prevGarcons => [...prevGarcons, e.target.value])} test={showModal} dia={dia} hora={hora}/>
        </div>
      </div>      
      </form><Mapa lat={lat} lng={long} zoom={18}></Mapa>
      <button className='sendForm' type="submit" onClick={handleSubmit}>Enviar</button>      
      </div>
      )}
export default CreateForm;



