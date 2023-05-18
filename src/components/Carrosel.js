import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SelectSupabase from './SelectSupabase';

const CarouselComponent = ({ fc, fp, gc, gp }) => {
  const [jsonItems, setJsonItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const selectSupabase = SelectSupabase({ setEventos: 1 });

  const getConfirmationColor = () => {
    if ((fc && fc.includes(jsonItems[currentSlide]?.nome)) || (gc && gc.includes(jsonItems[currentSlide]?.nome))) {
      return 'green';
    } else if ((fp && fp.includes(jsonItems[currentSlide]?.nome)) || (gp && gp.includes(jsonItems[currentSlide]?.nome))) {
      return 'red';
    } else {
      return 'black';
    }
  };
  const getConfirmationText = () => {
    if ((fc && fc.includes(jsonItems[currentSlide]?.nome)) || (gc && gc.includes(jsonItems[currentSlide]?.nome))) {
      return 'Confirmado';
    } else if ((fp && fp.includes(jsonItems[currentSlide]?.nome)) || (gp && gp.includes(jsonItems[currentSlide]?.nome))) {
      return 'Pendente';
    } else {
      return '';
    }
  };
  async function getLinks(items) {
    for (const item of items) {
      const nomeDoArquivo = item.nome;
      const urlPublica = await selectSupabase.obterUrlPublica(nomeDoArquivo);

      if (urlPublica) {
        item.urlPublica = urlPublica;
      }
    }
    setJsonItems([...items]);
  }
  useEffect(() => {
    if (fc && fp) {
      const fcJsonItems = [];
      for (let i = 1; i < fc.length; i++) {
        const item = fc[i];
        const jsonItem = { nome: item, urlPublica: '' };
        fcJsonItems.push(jsonItem);
      }

      const fpJsonItems = [];
      for (let i = 1; i < fp.length; i++) {
        const item = fp[i];
        const jsonItem = { nome: item, urlPublica: '' };
        fpJsonItems.push(jsonItem);
      }

      setJsonItems([...fcJsonItems, ...fpJsonItems]);
      getLinks([...fcJsonItems, ...fpJsonItems]);
    } else if (gc && gp) {
      const gcJsonItems = [];
      for (let i = 1; i < gc.length; i++) {
        const item = gc[i];
        const jsonItem = { nome: item, urlPublica: '' };
        gcJsonItems.push(jsonItem);
      }

      const gpJsonItems = [];
      for (let i = 1; i < gp.length; i++) {
        const item = gp[i];
        const jsonItem = { nome: item, urlPublica: '' };
        gpJsonItems.push(jsonItem);
      }

      setJsonItems([...gcJsonItems, ...gpJsonItems]);
      getLinks([...gcJsonItems, ...gpJsonItems]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fc, fp, gc, gp]);
  useEffect(() => {
    const timer = setTimeout(() => {
      // Verificar se é o último slide
      if (currentSlide === jsonItems.length - 1 || currentSlide > jsonItems.length) {
        setCurrentSlide(0); // Reiniciar para o primeiro slide
      } else if (jsonItems.length > 1) {
        setCurrentSlide((prevSlide) => prevSlide + 1); // Avançar para o próximo slide
      }
    }, 3000); // Intervalo de 3 segundos
  
    return () => clearTimeout(timer); // Limpar o temporizador ao desmontar o componente
  }, [currentSlide, jsonItems]);
  
  return (
    <>
      <tr style={{ width: '50%' }}>
        <td>
          <div style={{ width: '50px', height: '60px', overflow: 'hidden', borderBottom: 'none !important' }}>
            <Carousel
              showThumbs={false}
              selectedItem={currentSlide}
              interval={3000}
              showIndicators={false}
              renderArrowPrev={() => false}
              renderArrowNext={() => false}
              style={{ width: '100%', height: '100%', borderBottom: 'none !important' }}
            >
              {jsonItems.map((item, index) => (
                <div key={index} style={{ borderBottom: 'none !important' }}>
                  <img
                    src={item.urlPublica || ''}
                    alt={`Slide ${index + 1}`}
                    style={{ borderRadius: '30px', marginTop: '18.5%', width: '100%', height: '100%' }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </td>
      </tr>
      <tr style={{ width: '50%' }}>
        <td>
          <div style={{ border: 'none' }}>
            <br />
            <span style={{ color: 'gray', display: 'inline-block', marginLeft: '5%' }}>{jsonItems[currentSlide]?.nome}</span>
            <br />
            <span style={{ color: getConfirmationColor() }}>
              {getConfirmationText()}
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CarouselComponent;
