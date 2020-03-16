class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo 
    this.descricao = descricao
    this.valor = valor
  }

  validarDados() {
    //Recuperando todos os atributos do objeto, é necessário percorrer todos os campos
    for(let i in this) {
      // console.log(i, this[i])
      //Lógica 
      if(this[i] == undefined || this[i] == '' || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem('id') //null 

    if(id === null) {
      localStorage.setItem('id', 0);
    }
     
  }
  //Verificando se existe um id no banco de dados,
  //precisamos id qual é o id, para ele ser unico.
  getProximoid() {
    // logica para retorna ela, mais um.
    let proximoId = localStorage.getItem('id') //null 
    // console.log(parseInt(proximoId) + 1);
    
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    // Ao cadastrar um novo item e em seguida cadastrar novamente o anterior é substituido pelo forma.
    // Necessário adiconar essa lógica que era esse gravar(despesa) e agora passou a ser uma class junto com bd.gravar(despesa);
    // localStorage.setItem('despesa', JSON.stringify(d))
    let id = this.getProximoid();
    localStorage.setItem(id, JSON.stringify(d)) 
    localStorage.setItem('id', id);
  }

  recuperarTodosRegistro() {
    //array de despesas 
    let despesas = Array()

    // console.log('estamos chegando até aqui');
    let id = localStorage.getItem('id')

    //recuperar todos as despesa do cadastrados em localstorage
    for(let i = 1; i <= id; i++) {
      //recupera a despesa
      let despesa = JSON.parse(localStorage.getItem(i));

      //existe a possibilidade de haver indices que foram pulados ou removidos
      //nestes casos nos vamos pular esses indices
      if(despesa === null) {
        continue
      }

      // console.log(i, despesa)
      despesas.push(despesa)
    }
    // console.log(despesas);
    return despesas;
  }

  pesquisar(despesa) {
    // console.log(despesa);
    let despesasFiltradas = Array()
    despesasFiltradas = this.recuperarTodosRegistro()
    console.log(despesasFiltradas);

    //ano
    if(despesa.ano != ''){
      console.log('filtro de ano');
      
      despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
    }

    //mes
    if(despesa.mes != '') {
      console.log('filtro de mes');
      
      despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
    }

    //dia
    if(despesa.dia != '') {
      console.log('filtro de dia')
      despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)  
    
    }   
    //tipo
    if(despesa.tipo != '' ) {
      console.log('filtro de tipo')

      despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)  
    } 

    //descricao
    if(despesa.descricao != '' ) {
      console.log('filtro de descricao');
      despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)  
    } 

    //valor
    if(despesa.valor != '' ) {
      console.log('filtro de valor');
      despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)  
    } 
    
    return despesasFiltradas
  }
  
}


//instancia
let bd = new Bd();

function cadastrarDespesa() {

  let ano = document.getElementById('ano');
  let mes = document.getElementById('mes');
  let   = document.getElementById(' ');
  let tipo = document.getElementById('tipo');
  let descricao = document.getElementById('descricao');
  let valor = document.getElementById('valor');

  let despesa = new Despesa(
    ano.value, 
    mes.value,
    dia.value, 
    tipo.value, 
    descricao.value,
    valor.value
  );

  if (despesa.validarDados()) {
    bd.gravar(despesa);
    // console.log('dados válidos');
    document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
    document.getElementById('modal_titulo_text').className = 'modal-header text-success'
    document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
    document.getElementById('idaVolta').innerHTML = 'Voltar'
    document.getElementById('idaVolta').className = 'btn btn-success'

    //Dialog de sucesso
    $('#modalRegistraDespesa').modal('show')

    //Limpando os campos
    ano.value = '' 
    mes.value = '' 
    dia.value = '' 
    tipo.value = '' 
    descricao.value = '' 
    valor.value = '' 

  } else {
    //false
    // let error = document.getElementById('erroGravacao')
    document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
    document.getElementById('modal_titulo_text').className = 'modal-header text-danger'
    document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente'
    document.getElementById('idaVolta').innerHTML = 'Voltar e corrigir'
    document.getElementById('idaVolta').className = 'btn btn-danger'

    //dialog de erro
    $('#modalRegistraDespesa').modal('show')
  }
 
}


function carregaListaDespesa() {

  let despesas = Array()

  despesas = bd.recuperarTodosRegistro()

  // console.log(despesas);

  //selecionando os elementos tbody da tabela
  let listaDespesas = document.getElementById('listaDespesas');

  //percoorer o array despesas, listando cada despesa de forma dinamica
  despesas.forEach(function(d) {
    console.log(d);

    //criando a linha (tr)
    let linha = listaDespesas.insertRow()

    //ajustar o mes
    switch(d.mes) {
    case '0': d.mes = ''
      break
    case '1': d.mes = 'Janeiro'
      break
    case '2': d.mes = 'Fevereiro'
      break
    case '3': d.mes = 'Março'
      break
    case '4': d.mes = 'Abril'
      break
    case '5': d.mes = 'Maio'
      break
    case '6': d.mes = 'Junho'
      break
    case '7': d.mes = 'Julho'
      break
    case '8': d.mes = 'Agosto'
      break
    case '9': d.mes = 'Setembro'
      break
    case '10': d.mes = 'Outubro'
      break
    case '11': d.mes = 'Novembro'
      break
    case '12': d.mes = 'Dezembro'
      break
    }

    //ajustar o tipo
    switch(d.tipo) {
      case '1': d.tipo = 'Alimentação'
      break
      case '2': d.tipo = 'Educação'
      break
      case '3': d.tipo = 'Lazer'
      break
      case '4': d.tipo = 'Saúde'
      break
      case '5': d.tipo = 'Transporte'
      break
    }
    
    //inserir valores, colunas (td)
    linha.insertCell(0).innerHTML =  `${d.dia}/${d.mes}/${d.ano}`
    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor
  });

}

//Filtro de pesquisa
function pesquisarDespesa() {
  let ano = document.getElementById('ano').value;
  let mes = document.getElementById('mes').value;
  let dia = document.getElementById('dia').value;
  let tipo = document.getElementById('tipo').value;
  let descricao = document.getElementById('descricao').value;
  let valor = document.getElementById('valor').value;

  //Recuperando o value do campos
  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

  let despesas = bd.pesquisar(despesa)

  // console.log(despesa);

  //selecionando os elementos tbody da tabela
  let listaDespesas = document.getElementById('listaDespesas');
  listaDespesas.innerHTML = ''

  //percoorer o array despesas, listando cada despesa de forma dinamica
  despesas.forEach(function(d) {
    // console.log(d);

    //criando a linha (tr)
    let linha = listaDespesas.insertRow()

    //ajustar o mes
    switch(d.mes) {
    case '0': d.mes = ''
      break
    case '1': d.mes = 'Janeiro'
      break
    case '2': d.mes = 'Fevereiro'
      break
    case '3': d.mes = 'Março'
      break
    case '4': d.mes = 'Abril'
      break
    case '5': d.mes = 'Maio'
      break
    case '6': d.mes = 'Junho'
      break
    case '7': d.mes = 'Julho'
      break
    case '8': d.mes = 'Agosto'
      break
    case '9': d.mes = 'Setembro'
      break
    case '10': d.mes = 'Outubro'
      break
    case '11': d.mes = 'Novembro'
      break
    case '12': d.mes = 'Dezembro'
      break
    }

    //ajustar o tipo
    switch(d.tipo) {
      case '1': d.tipo = 'Alimentação'
      break
      case '2': d.tipo = 'Educação'
      break
      case '3': d.tipo = 'Lazer'
      break
      case '4': d.tipo = 'Saúde'
      break
      case '5': d.tipo = 'Transporte'
      break
    }
    
    //inserir valores, colunas (td)
    linha.insertCell(0).innerHTML =  `${d.dia}/${d.mes}/${d.ano}`
    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor
  });

}