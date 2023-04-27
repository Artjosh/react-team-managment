import { createClient } from '@supabase/supabase-js';

function InsertSupabase() {
  // Configurar o cliente do Supabase com as credenciais do seu projeto
  const supabaseUrl = 'https://roijvfnoognumwjbyymt.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvaWp2Zm5vb2dudW13amJ5eW10Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MzU4MjI5MiwiZXhwIjoxOTg5MTU4MjkyfQ.I77twttru16VK-OJ7t2P0FEegXZrj6lT_RDuShWxDkI';
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Inserir um afiliado na tabela 'afiliados'
  const insertAfiliado = async (nome, numero, opcao) => {
    try {
      const { error } = await supabase.from("afiliados").insert([{ nome, numero, estado: 'inicial', opcao }]);
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
      if (pendente.includes(`${A},`)) {
        console.log(`O evento ${A} já existe na coluna pendente do afiliado com ID ${id}`);
        return;
      }
  
      // Concatena o novo valor à coluna 'pendente' com os valores antigos
      const newPendente = `${pendente}${A},`;
  
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
  
  // Inserir um evento na tabela 'eventos'
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
 
  return { insertAfiliado , insertEvento};
}

export default InsertSupabase;
