import React, { useState, useEffect } from 'react';
import SelectSupabase from './SelectSupabase';
import './afiliadoslist.css';

    function AfiliadosList() {
        const [afiliados, setAfiliados] = useState([]);
        const [divHeights, setDivHeights] = useState({
          'word1': '20%',
          'word2': '3%',
          'word3': '3%'
        });  
        
        useEffect(() => {
          const selectSupabase = SelectSupabase({ setAfiliados });
          selectSupabase
          .getAfiliados()
          .then((results) => setAfiliados(results))
          .catch((error) => console.error(error));
        selectSupabase.subscribeToAfiliadoInserts();       

        return () => {
          selectSupabase.unsubscribe();
        };
        }, []);
      
        const handleDragStart = (event) => {
          let data;
          if (divHeights['word1'] !== '3%') {
            let afiliadosFiltrados = [];
            const checkboxes = document.querySelectorAll('.check');
            let checkboxMarcado = false;
            checkboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                checkboxMarcado = true;
                const id = checkbox.dataset.id;
                afiliadosFiltrados = afiliadosFiltrados.concat(afiliados.filter((afiliado) => parseInt(afiliado.id) === parseInt(id)));
              }
            });
            if (!checkboxMarcado) {
              afiliadosFiltrados = afiliados;
            }     
              data = JSON.stringify(afiliadosFiltrados.map((afiliado) => {
              const eventoString = JSON.stringify(afiliado.evento);
              const diahora = eventoString.replace(/"|\{|\}/g, "").replace(/;/g, ",");
              return { id: afiliado.id, nome: afiliado.nome, diahora: diahora };
            }));
          } else if (divHeights['word2'] !== '3%') {
            let afiliadosFiltrados = [];
            const checkboxes = document.querySelectorAll('.check');
            let checkboxMarcado = false;
            checkboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                checkboxMarcado = true;
                const id = checkbox.dataset.id;
                afiliadosFiltrados = afiliadosFiltrados.concat(afiliados.filter((afiliado) => parseInt(afiliado.id) === parseInt(id)));
              }
            });
            if (!checkboxMarcado) {
              afiliadosFiltrados = afiliados.filter((afiliado) => afiliado.opcao === 'forno');
            }
            data = JSON.stringify(afiliadosFiltrados.map((afiliado) => {
              const eventoString = JSON.stringify(afiliado.evento);
              const diahora = eventoString.replace(/"|\{|\}/g, "").replace(/;/g, ",");
              return { id: afiliado.id, nome: afiliado.nome, diahora: diahora };
            }));
          } else if (divHeights['word3'] !== '3%') {
            let afiliadosFiltrados = [];
            const checkboxes = document.querySelectorAll('.check');
            let checkboxMarcado = false;
            checkboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                checkboxMarcado = true;
                const id = checkbox.dataset.id;
                afiliadosFiltrados = afiliadosFiltrados.concat(afiliados.filter((afiliado) => parseInt(afiliado.id) === parseInt(id)));
              }
            });
            if (!checkboxMarcado) {
              afiliadosFiltrados = afiliados.filter((afiliado) => afiliado.opcao === 'garçom');
              
            }
            data = JSON.stringify(afiliadosFiltrados.map((afiliado) => {
              const eventoString = JSON.stringify(afiliado.evento);
              const diahora = eventoString.replace(/"|\{|\}/g, "").replace(/;/g, ",");
              return { id: afiliado.id, nome: afiliado.nome, diahora: diahora };
            }));
          }
          event.dataTransfer.setData("text/plain", data);
        }
        

        const handleClick = (word) => {
          setDivHeights(prevHeights => ({
            ...Object.keys(prevHeights).reduce((acc, key) => {
              acc[key] = (key === word) ? '20%' : '3%';
              return acc;
            }, {})
          }));
        };
        
        return (
            <div className='listcontainer'>
              <div className='listheader' style={{ display:'flex' }}>
              <input
                    className="maincheck"
                    type="checkbox"
                    style={{ marginRight: "4%", marginLeft: "4%" }}
                    onClick={(event) => {
                      const checkboxes = document.querySelectorAll(".check");
                      if (event.target.checked) {
                        checkboxes.forEach((checkbox) => {
                          checkbox.checked = true;
                        });
                      } else {
                        checkboxes.forEach((checkbox) => {
                          checkbox.checked = false;
                        });
                      }
                    }}
                  />
                <button draggable="true" onDragStart={handleDragStart}>Todos</button>
                <div style={{ width:'20%' }}><span style={{ color: divHeights['word1'] === '3%' ? 'gray' : 'white' }} onClick={() => handleClick('word1')}>Todos</span></div>
                <div style={{ width:'20%' }}><span style={{ color: divHeights['word2'] === '3%' ? 'gray' : 'white' }} onClick={() => handleClick('word2')}>Forno</span></div>
                <div style={{ width:'20%' }}><span style={{ color: divHeights['word3'] === '3%' ? 'gray' : 'white' }} onClick={() => handleClick('word3')}>Garçon</span></div>
              </div>
              { divHeights['word1'] === '3%' ? ( null ) : (
              <ul style={{ listStyleType: 'none', marginLeft:'-7%' }}>
                {afiliados.map((afiliado, index) => (
                  <div key={afiliado.id} style={{ display:'flex' }}>
                    <input data-id={afiliado.id} className='check' type='checkbox'></input>
                    <img style={{ margin:'5%' ,height:'20px', width:'20px' }} alt='test' src='https://via.placeholder.com/20x20'></img>
                  <li style={{ marginTop: '5%', width:'100%' }}
                    key={`${afiliado.id}_${index}`}
                    draggable="true"
                    onDragStart={(event) => {
                      const eventoString = JSON.stringify(afiliado.evento);
                      const diahora = eventoString.replace(/"|{|}/g, "").replace(/;/g, ",");
                      const data = JSON.stringify({ id: afiliado.id, nome: afiliado.nome, diahora: diahora });
                      event.dataTransfer.setData("text/plain", data);
                    } }
                  >
                    {afiliado.nome}
                  </li></div>             
                ))}
              </ul>) }
              { divHeights['word2'] === '3%' ? ( null ) : (
              <ul style={{ listStyleType: 'none', marginLeft:'-7%' }}>
                {afiliados.map((afiliado, index) => {
                  if (afiliado.opcao === 'forno') {
                    return (
                      <div key={afiliado.id} style={{ display:'flex' }}>
                        <input data-id={afiliado.id} className='check' type='checkbox'></input>
                        <img style={{ margin:'5%' ,height:'20px', width:'20px' }} alt='test' src='https://via.placeholder.com/20x20'></img>
                        <li style={{ marginTop: '5%', width:'100%' }}
                          key={`${afiliado.id}_${index}`}
                          draggable="true"
                          onDragStart={(event) => {
                            const eventoString = JSON.stringify(afiliado.evento);
                            const diahora = eventoString.replace(/"|{|}/g, "").replace(/;/g, ",");
                            const data = JSON.stringify({ id: afiliado.id, nome: afiliado.nome, diahora: diahora });
                            event.dataTransfer.setData("text/plain", data);
                          }}
                        >
                          {afiliado.nome}
                        </li>
                      </div>
                    )
                  } else {
                    return null;
                  }
                })}
              </ul>) }
              { divHeights['word3'] === '3%' ? ( null ) : (
                <ul style={{ listStyleType: 'none', marginLeft:'-7%' }}>
                {afiliados.map((afiliado, index) => {
                  if (afiliado.opcao === 'garçom') {
                    return (
                      <div key={afiliado.id} style={{ display:'flex' }}>
                        <input data-id={afiliado.id} className='check' type='checkbox'></input>
                        <img style={{ margin:'5%' ,height:'20px', width:'20px' }} alt='test' src='https://via.placeholder.com/20x20'></img>
                        <li style={{ marginTop: '5%', width:'100%' }}
                          key={`${afiliado.id}_${index}`}
                          draggable="true"
                          onDragStart={(event) => {
                            const eventoString = JSON.stringify(afiliado.evento);
                            const diahora = eventoString.replace(/"|{|}/g, "").replace(/;/g, ",");
                            const data = JSON.stringify({ id: afiliado.id, nome: afiliado.nome, diahora: diahora });
                            event.dataTransfer.setData("text/plain", data);
                          }}
                        >
                          {afiliado.nome}
                        </li>
                      </div>
                    )
                  } else {
                    return null;
                  }
                })}
              </ul> 
              )}
            </div>
          );
        }
      
      export default AfiliadosList;
      