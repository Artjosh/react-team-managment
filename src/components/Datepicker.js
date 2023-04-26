import br from 'date-fns/locale/pt-BR';
import { range } from 'ramda';
import React, { useRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import './datepicker.css';
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth} from "date-fns";
import Custominput from './Custominput';

function Datepicker({ test }) {
    const [startDate, setStartDate] = useState(new Date());
    const [key, setKey] = useState(0);
    const years = range( getYear(new Date()), 2050 + 1);
    const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    const customInputRef = useRef(null);
    const currentDate = new Date();
    
    useEffect(() => {
        setStartDate(new Date());
    }, [key]);

    const handleTodayButtonClick = () => {
        setKey(key + 1);
        test(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
    }

    const handleDateChange = (date) => {
      setStartDate(date);
      test(date);
      // Chame outras funções aqui
    }

const MyContainer = ({ className, children }) => {
  return (    
    <div className={className}> 
      <div className="header-datepicker">
      <button style={{ border:'none', color:'blue' ,marginLeft: '100px', marginTop: '10px' }} onClick={handleTodayButtonClick}>Hoje</button>
      </div>
      <div className="body">{children}</div>
    </div>
    );
};


return (
<DatePicker
  customInput={<Custominput ref={customInputRef} />}
  key={key}
  locale={br}
  dateFormat="dd/MM/yyyy"
  selected={startDate}
  onChange={handleDateChange}
  calendarContainer={MyContainer}
  renderCustomHeader={({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled
  }) => (
    <div>
      <button style={{ border:'none', fontWeight:'bold' }} onClick={(e) => { e.preventDefault(); decreaseMonth()}} disabled={prevMonthButtonDisabled}>{"🢀"}</button>
      <select
        value={getYear(date)}
        onChange={({ target: { value } }) => changeYear(value)}>
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        value={months[getMonth(date)]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button style={{ border:'none', fontWeight:'bold' }} onClick={(e) => { e.preventDefault(); increaseMonth()}} disabled={nextMonthButtonDisabled}>{"🢂"}</button>
    </div>
  )}
/>

);
}

export default Datepicker;