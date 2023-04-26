import React from "react";
import "./Custominput.css";


function formatarData(str) {
  var partes = str.split('/').map(Number);
  var data = new Date('20' + partes[2], partes[1] - 1, partes[0]);
  return data.toLocaleString([], { weekday: 'short' }).slice(0, 3);
  
}

const Custominput = React.forwardRef((props, ref) => {
  const { value } = props;

  // Extrai o dia, mês e ano da propriedade value
  const [dia, mes] = value.split('/');

  // Formata a data para obter a abreviação do dia da semana
  const diaSemanaAbreviado = formatarData(value).charAt(0).toUpperCase() + formatarData(value).slice(1).toLowerCase();

  // Converte o mês de número para texto
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const mesTexto = meses[parseInt(mes) - 1];
  
  return (
    <div>
      <p ref={ref} onClick={(event) => {
        event.preventDefault();
        props.onClick();
      }} className="calendar"><span className="dia">{dia}/</span><span className="diasemana">{diaSemanaAbreviado}</span><em>{mesTexto}</em></p>
    </div>
  );
});

export default Custominput;
