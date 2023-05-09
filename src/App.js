import './App.css';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import { Image } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import CreateForm from './components/CreateForm';
import SelectSupabase from './components/SelectSupabase';
import moment from 'moment';
import Login from './components/Login';
import door1 from './1.png';
import door2 from './2.png';
import door3 from './3.png';
import CardList from './components/CardList';
import Datepicker from './components/Datepicker.js';

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
    selectSupabase.subscribeToEventsUpdates();
    
    return () => {
      selectSupabase.unsubscribe();
    };
  }, []);
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
    console.log(item);
  };

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
  const handleLogout = () => {
    setGreenLight(false);
    setIsLogedIn(!isLogedIn);
  }
  const gridContainer = document.getElementById('grid-container2');
  if (gridContainer) {
    if (filteredEventos.length <= 30) {
      gridContainer.style.overflowY = 'hidden';
    } else {
      gridContainer.style.overflowY = 'scroll';
    }
  } 

  return (
    <div className={`App ${isLogedIn ? 'push-right' : ''}`}>
      {isLogedIn ? (
      <><MyNavbar
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
              <div className='4ft'>
                <table>
                    <tbody>
                      <tr><th>Informações</th></tr>
                    </tbody>
                    <tbody>
                      <tr><th>Detalhes</th></tr>
                    </tbody>
                    <tbody>
                      <tr><th>Afiliados
                      <br/><span style={{fontSize:'15px', position:'absolute', marginTop:'-0.5%', marginLeft: '-3%'}}>Forno</span>
                      <span style={{fontSize:'15px', position:'absolute', marginTop:'-0.5%', marginLeft: '3%'}}>Garçon</span></th></tr>
                    </tbody>
                  </table>
              </div>
              <div className='4ft'>
                <table>
                    <tbody>
                      <tr><th>Informações</th></tr>
                    </tbody>
                    <tbody>
                      <tr><th>Detalhes</th></tr>
                    </tbody>
                    <tbody>
                      <tr><th>Afiliados
                      <br/><span style={{fontSize:'15px', position:'absolute', marginTop:'-0.5%', marginLeft: '-3%'}}>Forno</span>
                      <span style={{fontSize:'15px', position:'absolute', marginTop:'-0.5%', marginLeft: '3%'}}>Garçon</span></th></tr>
                    </tbody>
                  </table>
              </div>
              <div className='4ft'>
              <table>
                  <tbody>
                    <tr><th>Informações</th></tr>
                  </tbody>
                  <tbody>
                    <tr><th>Detalhes</th></tr>
                  </tbody>
                  <tbody>
                    <tr><th>Afiliados
                    <br/><span style={{fontSize:'15px', position:'absolute', marginTop:'-0.5%', marginLeft: '-3%'}}>Forno</span>
                    <span style={{fontSize:'15px', position:'absolute', marginTop:'-0.5%', marginLeft: '3%'}}>Garçon</span></th></tr>
                  </tbody>
                </table>
              </div>
              </div>
            </div>
            <div className="grid-container2" id='grid-container2'>
              {filteredEventos.slice(0).map((item) => (  
            <div key={item.id} onClick={() => handleListItemClick(item)}>
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
                  <tr><td>
                  <div style={{ border:'none'}}>
                    <img style={{ borderRadius:'30px', marginTop:'15%',width:'50px', height:'50px'}} alt='test' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_4.png"></img>
                  </div></td></tr>
                  <tr><td>
                  <div style={{  border:'none'}}>
                    <br/>
                    <span style={{color:'gray', display:'inline-block', marginLeft:'5%'}}>Myrtle Erickson</span>
                    <br/>
                    <span style={{color:'green'}}>Confirmado</span>
                  </div></td></tr>
                  <tr><td>
                  <div style={{ border:'none'}}>
                    <img style={{ borderRadius:'30px', marginTop:'15%' ,width:'50px', height:'50px'}} alt='test' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png"></img>
                  </div></td></tr>
                  <tr><td>
                  <div style={{ border:'none'}}>
                    <br/>
                    <span style={{color:'gray', display:'inline-block', marginLeft:'5%'}}>Myrtle Erickson</span>
                    <br/>
                    <span style={{color:'green'}}>Confirmado</span>
                  </div></td></tr>
                </tbody>
              </table>
            </div>
              ))}
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
              <Image src={door3} alt="bg" style={{ position:'fixed' }} onClick={onClickShowForm} />
              <Image src={door2} alt="bg"  />
            </>
              )}                          
            </>
          )}</>
            )};                     
    </div>
  );
}
 
export default App;
