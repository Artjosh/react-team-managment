import './App.css';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import { Image } from 'react-bootstrap';
import React, { useEffect, useState, useRef } from 'react';
import CreateForm from './components/CreateForm';
import SelectSupabase from './components/SelectSupabase';
import moment from 'moment';
import Login from './components/Login';
import door1 from './1.png';
import door2 from './2.png';
import door3 from './3.png';
import CardList from './components/CardList';
import Datepicker from './components/Datepicker.js';
import Carrosel from './components/Carrosel.js'
import Sidebar from './components/Sidebar';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(); // novo estado para armazenar a data selecionada
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [GreenLight, setGreenLight] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [eventoArrayConfirmadosFornos, setEventoArrayConfirmadosFornos] = useState([]);
  const [eventoArrayPendingFornos, setEventoArrayPendingFornos] = useState([]);
  const [eventoArrayConfirmadosGarcons, setEventoArrayConfirmadosGarcons] = useState([]);
  const [eventoArrayPendingGarcons, setEventoArrayPendingGarcons] = useState([]);
  const [eventoIndex, setEventoIndex] = useState(0);

  const makeLogin = () => {
      setIsLogedIn(true);
  };
  useEffect(() => {
    if (GreenLight) {
      const timer = setTimeout(() => {
        makeLogin();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [GreenLight]);
  const handleLogin = () => {
      setShowLoginForm(false);
      setGreenLight(true);      
  };
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const handleDashboard = () => {
    setDashboard(!dashboard);
    setSelectedDate(false);
    setActive(!active);
  };
  const handleDateSelect = (date) => {
    const selectedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(selectedDate);
    setDashboard(false);      
  };
  useEffect(() => {
    const selectSupabase = SelectSupabase({ setEventos });
    selectSupabase
      .getEventos()
      .then((results) => {
        // ordene a lista de eventos por data crescente
        results.sort((a, b) => new Date(a.dia) - new Date(b.dia));
        setEventos(results);
      })
      .catch((error) => console.error(error));
    selectSupabase.subscribeToEventsInserts();
    
    return () => {
      selectSupabase.unsubscribe();
    };
  }, []);
  useEffect(() => {
    const selectSupabase = SelectSupabase({ setEventos });
    selectSupabase.subscribeToEventsUpdates();
    return () => {
      selectSupabase.unsubscribe();
    };
  },[]);
  const handleShowForm = () => {
    setShowForm(true);
  };
  const onClickShowForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  const setClose = () => {
    setShowLoginForm(!showLoginForm);
  };
  const handleListItemClick = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };
  useEffect(() => {
    const selectSupabase = SelectSupabase({ setEventos });
    // Exemplo de chamada da função subscribeToEventsDeletes
    selectSupabase.subscribeToEventsDeletes();

    return () => {
      // Chama unsubscribe quando o componente é desmontado
      selectSupabase.unsubscribe();
    };
  }, []); 
const currentDate = new Date();
const formattedCurrentDate = moment(currentDate).format('YYYY-MM-DD');
  // filtragem de eventos baseada em searchTerm e selectedDate
  const filteredEventos = eventos.filter((evento) => {
    if (dashboard) {
      // se não há data selecionada filtrar eventos com data igual ou posterior à data atual
      const eventoDate = evento.dia;
      return evento.nomecontratante.toLowerCase().includes(searchTerm.toLowerCase()) && eventoDate >= formattedCurrentDate;
    }
    else if (selectedDate){
      const eventoDate = evento.dia;
      return evento.nomecontratante.toLowerCase().includes(searchTerm.toLowerCase()) && eventoDate === selectedDate;
    }
    else {
      // caso contrário, aplicar somente a filtragem da searchbar
      return evento.nomecontratante.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });
  useEffect(() => {
    setEventoIndex(0);
  }, [eventos]);
  const handleLogout = () => {
    setGreenLight(false);
    setIsLogedIn(!isLogedIn);
  }
  const gridContainer = document.getElementById('grid-container2');
  if (gridContainer) {
    if (window.matchMedia('(min-width: 499px) and (max-width: 768px)').matches) {
      if (window.innerHeight >= 500 && window.innerHeight < 650) {
        if (filteredEventos.length <= 3) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      } else if (window.innerHeight >= 650 && window.innerHeight < 880) {
        if (filteredEventos.length <= 4) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      } else if (window.innerHeight >= 880) {
        if (filteredEventos.length <= 6) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      }
    } else if (window.matchMedia('(min-width: 769px) and (max-width: 1200px)').matches) {
      if (window.innerHeight >= 500 && window.innerHeight < 650) {
        if (filteredEventos.length <= 3) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      } else if (window.innerHeight >= 650 && window.innerHeight < 880) {
        if (filteredEventos.length <= 5) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      } else if (window.innerHeight >= 880) {
        if (filteredEventos.length <= 8) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      }
    } else if (window.matchMedia('(min-width: 1201px) and (max-width: 1440px)').matches) {
      if (window.innerHeight >= 500 && window.innerHeight < 650) {
        if (filteredEventos.length <= 6) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      } else if (window.innerHeight >= 650 && window.innerHeight < 880) {
        if (filteredEventos.length <= 10) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      } else if (window.innerHeight >= 880) {
        if (filteredEventos.length <= 14) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      }
    } else if (window.matchMedia('(min-width: 1441px) and (max-width: 1680px)').matches) {
      if (window.innerHeight >= 500 && window.innerHeight < 650) {
        if (filteredEventos.length <= 9) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      } else if (window.innerHeight >= 650 && window.innerHeight < 880) {
        if (filteredEventos.length <= 12) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      } else if (window.innerHeight >= 880) {
        if (filteredEventos.length <= 18) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      }
    } else if (window.matchMedia('(min-width: 1681px)').matches) {
      if (window.innerHeight >= 500 && window.innerHeight < 650) {
        if (filteredEventos.length <= 12) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      } else if (window.innerHeight >= 650 && window.innerHeight < 880) {
        if (filteredEventos.length <= 15) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      } else if (window.innerHeight >= 880) {
        if (filteredEventos.length <= 27) {
          gridContainer.style.overflowY = 'hidden';
        } else {
          gridContainer.style.overflowY = 'scroll';
        }
      }
    }
  }
  
  
  
  const selectSupabase = SelectSupabase({ setEventos });
  const eventosRef = useRef([]);
  
  
  useEffect(() => {
    eventosRef.current = filteredEventos.slice();
  
    if (eventoIndex < eventosRef.current.length) {
      const evento = eventosRef.current[eventoIndex];
    
      const confirmados = JSON.parse(evento.confirmados);
      const pending = JSON.parse(evento.pending);
  
      const confirmadosFornosIds = confirmados.forno;
      const pendingFornosIds = pending.forno;
      const confirmadosGarconsIds = confirmados.garcons;
      const pendingGarconsIds = pending.garcons;

      Promise.all([
        selectSupabase.getAfiliadosByIdsBulk(confirmadosFornosIds),
        selectSupabase.getAfiliadosByIdsBulk(pendingFornosIds),
        selectSupabase.getAfiliadosByIdsBulk(confirmadosGarconsIds),
        selectSupabase.getAfiliadosByIdsBulk(pendingGarconsIds)
      ]).then(([confirmadosFornos, pendingFornos, confirmadosGarcons, pendingGarcons]) => {
        const eventoArrayConfirmadosFornos = [evento.id, ...confirmadosFornos.map((afiliado) => afiliado.nome)];
        const eventoArrayPendingFornos = [evento.id, ...pendingFornos.map((afiliado) => afiliado.nome)];
        const eventoArrayConfirmadosGarcons = [evento.id, ...confirmadosGarcons.map((afiliado) => afiliado.nome)];
        const eventoArrayPendingGarcons = [evento.id, ...pendingGarcons.map((afiliado) => afiliado.nome)];
  
        setEventoArrayConfirmadosFornos((prevArray) => {
          const existingArray = prevArray.find((arr) => arr[0] === evento.id);
          if (existingArray) {
            const updatedArray = prevArray.filter((arr) => arr[0] !== evento.id);
            return [...updatedArray, eventoArrayConfirmadosFornos];
          } else {
            return [...prevArray, eventoArrayConfirmadosFornos];
          }
        });
        
        setEventoArrayPendingFornos((prevArray) => {
          const existingArray = prevArray.find((arr) => arr[0] === evento.id);
          if (existingArray) {
            const updatedArray = prevArray.filter((arr) => arr[0] !== evento.id);
            return [...updatedArray, eventoArrayPendingFornos];
          } else {
            return [...prevArray, eventoArrayPendingFornos];
          }
        });
        
        setEventoArrayConfirmadosGarcons((prevArray) => {
          const existingArray = prevArray.find((arr) => arr[0] === evento.id);
          if (existingArray) {
            const updatedArray = prevArray.filter((arr) => arr[0] !== evento.id);
            return [...updatedArray, eventoArrayConfirmadosGarcons];
          } else {
            return [...prevArray, eventoArrayConfirmadosGarcons];
          }
        });
        
        setEventoArrayPendingGarcons((prevArray) => {
          const existingArray = prevArray.find((arr) => arr[0] === evento.id);
          if (existingArray) {
            const updatedArray = prevArray.filter((arr) => arr[0] !== evento.id);
            return [...updatedArray, eventoArrayPendingGarcons];
          } else {
            return [...prevArray, eventoArrayPendingGarcons];
          }
        });
        
  
        setEventoIndex((prevIndex) => prevIndex + 1); // Incrementa o índice do evento
      });
    }
  }, [filteredEventos, selectSupabase, eventoIndex, eventos]);

  return (
    <div className={`App ${isLogedIn ? 'push-right' : ''}`}>
      {isLogedIn ? (
      <>  <Sidebar/>
          <MyNavbar
          handleLogout={handleLogout}
          handleSearch={handleSearch}
          handleShowForm={handleShowForm}
          handleDashboard={handleDashboard} />
          <CardList></CardList>
          <div className="MainContainer">
            {showForm && <CreateForm selectedItem={selectedItem} setShowForm={setShowForm} setSelectedItem={setSelectedItem} />}
            <div className="ContentContainer">
            <div className="header">
              <div className='head'>
                <Datepicker test={handleDateSelect}/>
                <button className={active ? "art active" : "art"} variant="default" onClick={handleDashboard}><span>Dashboard</span></button>
                <div style={{ width:'100%', height:'100%' }}>
                  <div style={{ marginTop:'2%'}}>
                    <span style={{ marginLeft:'5%', color:'white', fontSize:'150%' }}>Eventos listados</span><span style={{ color:'#505e74', fontSize:'200%' }}>|{filteredEventos.length}</span>
                  </div>
                </div>
              </div>
              <div className="footer" style={{color:'white'}}>
              <div className='ft'>
                <table>
                    <tbody>
                      <tr><th>Informações</th></tr>
                    </tbody>
                    <tbody>
                      <tr><th>Detalhes</th></tr>
                    </tbody>
                    <tbody>
                      <tr><th>Afiliados
                      <br/><span className='forno'>Forno</span>
                      <span className='garcon'>Garçon</span></th></tr>
                    </tbody>
                  </table>
              </div>
              <div className='ft'>
                <table>
                    <tbody>
                      <tr><th>Informações</th></tr>
                    </tbody>
                    <tbody>
                      <tr><th>Detalhes</th></tr>
                    </tbody>
                    <tbody>
                      <tr><th>Afiliados
                      <br/><span className='forno'>Forno</span>
                      <span className='garcon'>Garçon</span></th></tr>
                    </tbody>
                  </table>
              </div>
              <div className='ft'>
              <table>
                  <tbody>
                    <tr><th>Informações</th></tr>
                  </tbody>
                  <tbody>
                    <tr><th>Detalhes</th></tr>
                  </tbody>
                  <tbody>
                    <tr><th>Afiliados
                    <br/><span className='forno'>Forno</span>
                    <span className='garcon'>Garçon</span></th></tr>
                  </tbody>
                </table>
              </div>
              </div>
            </div>
            <div className="grid-container2" id='grid-container2'>
            {filteredEventos.map((item) => {
              const foundSubArray = eventoArrayConfirmadosFornos.find((subArray) => subArray[0] === item.id);
              const foundSubArray1 = eventoArrayConfirmadosGarcons.find((subArray) => subArray[0] === item.id);
              const foundSubArray2 = eventoArrayPendingFornos.find((subArray) => subArray[0] === item.id);
              const foundSubArray3 = eventoArrayPendingGarcons.find((subArray) => subArray[0] === item.id);
              
              return (
                <div key={item.id} onClick={() => handleListItemClick(item)} style={{ borderBottom: '1px solid gray' }}>
                <table>
                  <tbody>
                    <tr>
                    <td>
                      <span style={{ fontSize:'10px',color:'gray'}}>{item.nomecontratante}</span><br/>
                      {item.endereco.length <= 32 ? <><br/>{item.endereco}</>  : <>
                        {item.endereco.slice(0, 32)}<br/>{item.endereco.slice(32)}
                      </>}
                      <br/>Lindoia,Porto Alegre
                    </td>
                    </tr>
                  </tbody>
                  <tbody style={{ width:'20%'}}>
                      <tr><td><span>Numero de Pessoas</span><br/><span style={{ marginLeft:'35%' ,color:'yellow'}}>{item.numeropessoas}</span><br/><span style={{ marginLeft:'30%' }}>Data</span><br/><span style={{ color:'orange'}}>{item.hora}/{item.dia}</span></td></tr>
                  </tbody>
                  <tbody style={{ display:'flex',width:'47%'}}>
                    <Carrosel fc={foundSubArray} fp={foundSubArray2}/>
                    <Carrosel gc={foundSubArray1} gp={foundSubArray3}/>
                  </tbody>
                </table>
              </div>
              );
            })}
            </div>
          </div>
          </div></>) : (
          <>{showLoginForm ? (
            <>
              <Login setClose={setClose} handleLogin={handleLogin} />
              <Image src={door2} alt="bg" />
              <Image src={door3} alt="bg" />
              <Image src={door1} alt="bg"  />
            </>
          ) : (
            <>{GreenLight ? (
            <>
            <Image src={door1} alt="bg"  />
            </>) : (
            <>
              <Image src={door3} alt="bg" style={{ position:'fixed' }}  />
              <Image src={door2} alt="bg" style={{ position:'fixed' }} onClick={onClickShowForm}/>
            </>
              )}                          
            </>
          )}</>
            )};                     
    </div>
  );
}
 
export default App;
