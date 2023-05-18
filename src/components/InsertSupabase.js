import { createClient } from '@supabase/supabase-js';

function InsertSupabase() {
  // Configurar o cliente do Supabase com as credenciais do seu projeto
  const supabaseUrl = 'https://roijvfnoognumwjbyymt.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvaWp2Zm5vb2dudW13amJ5eW10Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MzU4MjI5MiwiZXhwIjoxOTg5MTU4MjkyfQ.I77twttru16VK-OJ7t2P0FEegXZrj6lT_RDuShWxDkI';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const insertAfiliado = async (nome, numero, opcao) => {
    try {
      const { error } = await supabase.from("afiliados")
      .insert([{ nome, numero, estado: 'inicial', opcao }])
      if (error) {
        console.error(error);
        throw new Error(error.message);
      } else {
        console.log("Sucesso: afiliado inserido");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const removeAfiliadoPendente = async (id, A) => {
    try {
      // Busca o registro atual na tabela 'afiliados'
      const { data, error } = await supabase
        .from('afiliados')
        .select('pendente')
        .eq('id', id);
  
      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
  
      // Verifica se o valor existe na coluna 'pendente'
      const pendente = data[0].pendente || '';
      const pendenteArray = pendente.split(',');
  
      // Procura A no resultado retornado
      const index = pendenteArray.findIndex((item) => item.startsWith(`${A}=`));
  
      if (index === -1) {
        console.log(`O evento ${A} não existe na coluna pendente do afiliado com ID ${id}`);
        return;
      }
  
      // Remove a string e a vírgula anterior se a string começar com uma vírgula
      const removedString = pendenteArray[index];
      if (removedString.startsWith(',')) {
        pendenteArray.splice(index - 1, 2);
      } else {
        pendenteArray.splice(index, 1);
      }
  
      // Atualiza o registro com o novo valor da coluna 'pendente'
      const newPendente = pendenteArray.join(',');
  
      const { error: updateError } = await supabase
        .from('afiliados')
        .update({ pendente: newPendente })
        .eq('id', id);
  
      if (updateError) {
        console.error(updateError);
        throw new Error(updateError.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const removeAfiliadoEvento = async (id, A) => {
    try {
      // Busca o registro atual na tabela 'afiliados'
      const { data, error } = await supabase
        .from('afiliados')
        .select('evento')
        .eq('id', id);
  
      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
  
      // Verifica se o valor existe na coluna 'pendente'
      const evento = data[0].evento || '';
      const eventoArray = evento.split(',');
  
      // Procura A no resultado retornado
      const index = eventoArray.findIndex((item) => item.startsWith(`${A}=`));
  
      if (index === -1) {
        console.log(`O evento ${A} não existe na coluna evento do afiliado com ID ${id}`);
        return;
      }
  
      // Remove a string e a vírgula anterior se a string começar com uma vírgula
      const removedString = eventoArray[index];
      if (removedString.startsWith(',')) {
        eventoArray.splice(index - 1, 2);
      } else {
        eventoArray.splice(index, 1);
      }
  
      // Atualiza o registro com o novo valor da coluna 'pendente'
      const newEvento = eventoArray.join(',');
  
      const { error: updateError } = await supabase
        .from('afiliados')
        .update({ evento: newEvento })
        .eq('id', id);
  
      if (updateError) {
        console.error(updateError);
        throw new Error(updateError.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const updateAfiliadoPendente = async (id, A) => {
    try {
      // Busca o registro atual na tabela 'afiliados'
      const { data, error } = await supabase
        .from('afiliados')
        .select('pendente')
        .eq('id', id);
  
      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
  
      // Verifica se o valor já existe na coluna 'pendente'
      const pendente = (data[0].pendente || '');
      if (pendente.includes(`${A}`)) {
        console.log(`O evento ${A} já existe na coluna pendente do afiliado com ID ${id}`);
        return;
      }
      
      // Concatena o novo valor à coluna 'pendente' com os valores antigos
      const newPendente =  pendente ? `${pendente},${A}` : `${A}`;
  
      // Atualiza o registro com o valor concatenado
      const { error: updateError } = await supabase
        .from('afiliados')
        .update({ pendente: newPendente })
        .eq('id', id);
  
      if (updateError) {
        console.error(updateError);
        throw new Error(updateError.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const insertEvento = async (evento) => {
    const { contratante, endereco, pessoas, celularContratante, celular2Contratante, afiliados, dia, hora, confirmados } = evento;
    const { data, error } = await supabase.from("eventos").insert([
      {
        nomecontratante: contratante,
        endereco,
        numeropessoas: pessoas,
        numerocontratante: celularContratante,
        numeroextracontratante: celular2Contratante,
        pending: afiliados,
        dia,
        hora,
        confirmados: confirmados
      }
    ]).select();
    const id = data[0].id;
    if (error) {
      console.log("Erro ao inserir evento: ", error);
      console.error(error);
      throw new Error(error.message);      
    }
    console.log("Evento inserido com sucesso!");
    if (afiliados) {
      const { forno, garcons } = afiliados;
      const { dia, hora } = evento;
      const diaFormatado = dia.includes('-') ? dia.split('-').reverse().join('/') : dia;
      const dataHora = `${id}=${diaFormatado};${hora}`;


      for (const id of forno) {
        updateAfiliadoPendente(id, dataHora)
      }
      
      for (const id of garcons) {
        updateAfiliadoPendente(id, dataHora)
      }
    }
    return true;
  }
  const updateEvento = async (eventoId, evento) => {
    const { contratante, endereco, pessoas, celularContratante, celular2Contratante, afiliados, dia, hora, confirmados } = evento;
    const { error } = await supabase
      .from("eventos")
      .update({
        nomecontratante: contratante,
        endereco,
        numeropessoas: pessoas,
        numerocontratante: celularContratante,
        numeroextracontratante: celular2Contratante,
        pending: afiliados,
        dia,
        hora,
        confirmados: confirmados
      })
      .eq('id', eventoId);
    
    if (error) {
      console.log("Erro ao fazer update evento: ", error);
      console.error(error);
      throw new Error(error.message);      
    }
    console.log("Evento atualizado com sucesso!");
    if (afiliados) {
      const { forno, garcons } = afiliados;
      const { dia, hora } = evento;
      const diaFormatado = dia.includes('-') ? dia.split('-').reverse().join('/') : dia;
      const dataHora = `${eventoId}=${diaFormatado};${hora}`;


      for (const id of forno) {
        await removeAfiliadoPendente(id, eventoId)
        updateAfiliadoPendente(id, dataHora)
      }
      
      for (const id of garcons) {
        await removeAfiliadoPendente(id, eventoId)
        updateAfiliadoPendente(id, dataHora)
      }
    }
    return true;
  }
  async function enviarFoto(photoData, photoname) {
    const nomeDoArquivo = photoname;

    const { error } = await supabase.storage
      .from('pfp')
      .upload(nomeDoArquivo, photoData);
  
    if (error) {
      console.error(error);
    } else {
      console.log('Foto enviada com sucesso!');
    }
  }
  return { insertAfiliado , insertEvento, updateEvento, removeAfiliadoPendente, removeAfiliadoEvento, enviarFoto};
}

export default InsertSupabase;
