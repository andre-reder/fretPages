var modalErros=document.querySelector('#erros')

//filtros na tabela
$(document).ready(function() {
  $("#gfg").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#linhasFretamentoTable tr").filter(function() {
          $(this).toggle($(this).text()
          .toLowerCase().indexOf(value) > -1)
      });
  });
});

//Realiza a validação e cria o menu lateral
function validarAcesso(){
  var myModal2 = new bootstrap.Modal(document.getElementById('aguarde'))
  myModal2.show()
  const urlParams = new URLSearchParams(location.search)
  const codEmpresa=urlParams.get('codEmpresa')
  const codValida=urlParams.get('codValida')
  const perfilUsu=urlParams.get('perfilUsu')
  const codUsu=urlParams.get('codUsu')

  const indexMenu=document.querySelector('#indexMenu')
  const veiculosMenu=document.querySelector('#veiculosMenu')
  const linhasMenu=document.querySelector('#linhasMenu')
  const usuariosMenu=document.querySelector('#usuariosMenu')
  const sairMenu=document.querySelector('#sair')

  let request=new Request (`http://sismob.captatec.com.br/api/SMob_ValidaAcesso?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}`)
  fetch(request)
  .then(response=>response.json().then(body=>{
      const codigo=(body).codigo
      const empresa=(body).empresa
      const usuario=(body).usuario
      if(codigo==0){
          window.location.href=`http://sis.captatec.com.br/AdmEmpresa.aspx?codValida=${codValida}&codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}`
      }
      else{
          indexMenu.innerHTML=`
          <input type="hidden" id="empresaHidden" value="${empresa}">
          <input type="hidden" id="usuarioCapta" value="${usuario}">
          <a href="index.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}" class="app-brand-link">
            <span class="app-brand-logo demo">
              <img src="./images/CAPTA MOBILIDADE 8.png" id="logoCapta" alt="">
            </span>
          </a>
          `
          veiculosMenu.innerHTML=`
          <a href="veiculosFretamento.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}" class="menu-link">
                  <div data-i18n="Dados Gerais">Veículos</div>
          </a>
          `

          linhasMenu.innerHTML=`
          <a href="linhasFretamento.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}" class="menu-link">
                  <div data-i18n="Locais de trabalho">Linhas</div>
          </a>
          `

          usuariosMenu.innerHTML=`
          <a href="usuariosSenhas.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}" class="menu-link">
              <i class="menu-icon tf-icons bx bx-check-shield"></i>
              <div data-i18n="Senhas">Usuários/senhas</div>
          </a>
          `

          sairMenu.innerHTML=`
          <a href="http://sis.captatec.com.br/AdmEmpresa.aspx?codValida=${codValida}&codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}" class="menu-link">
              <i class="menu-icon tf-icons bx bx-exit"></i>
              <div data-i18n="Senhas">Sair</div>
          </a>
          `
          listaDadosLinhasFretamento()
          myModal2.hide()
      }
  }))
  .catch(err=>{
    var myModal = new bootstrap.Modal(document.getElementById('erros'))
    modalErros.innerHTML=`
    <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Tivemos um erro ao carregar a página!</h5>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      Clique no botão abaixo para tentar carregá-la novamente.<br>Detalhe do erro: ${err}
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="window.location.reload()">Recarregar</button>
                  </div>
                </div>
              </div>`
    myModal.show()
  
})

}

//modifica os atributos do select ao selecionar outro (Local de trabalho)
function atualizouAtributosLT(){
    let localTrabalhoSelect=document.getElementById('localTrabalho')
    let valorLocalTrabalhoSelected=localTrabalhoSelect.options[localTrabalhoSelect.selectedIndex]
    document.getElementById('localTrabalhoSelecionado').value=valorLocalTrabalhoSelected.value
}

//modifica os atributos do select ao selecionar outro (Operadora)
function atualizouAtributosOperadora(){
    let operadoraSelect=document.getElementById('operadora')
    let valorOperadoraSelected=operadoraSelect.options[operadoraSelect.selectedIndex]
    let descrOperadoraSelected=valorOperadoraSelected.getAttribute('data-descr')
    let operadoraSelecionada=document.getElementById('operadoraSelecionada')
    operadoraSelecionada.value=valorOperadoraSelected.value
    operadoraSelecionada.setAttribute('data-descr',`${descrOperadoraSelected}`)
}

//modifica os atributos do select ao selecionar outro (Sentido)
function atualizouAtributosSentido(){
    let sentidoSelect=document.getElementById('sentido')
    let valorSentidoSelected=sentidoSelect.options[sentidoSelect.selectedIndex]
    document.getElementById('sentidoSelecionado').value=valorSentidoSelected.value
}

//verifica se todos os campos estão preenchidos no cadastro da linha
function impedeCadastroLinha(){
  const modalSalvarLinha=document.querySelector('#salvar')
  const localTrabalhoSelecionado=document.querySelector('#localTrabalhoSelecionado')
  const operadoraSelecionada=document.querySelector('#operadoraSelecionada')
  const codigoLinha=document.querySelector('#codigoLinha')
  const letreiroLinha=document.querySelector('#letreiroLinha')
  const sentidoSelecionado=document.querySelector('#sentidoSelecionado')

  const valorMes=document.querySelector('#valorMes')
  const valorMesSemVirgula=valorMes.value.replace('.', '')
  const valorMesFinal=valorMesSemVirgula.replace(',','.')

  const pontoEquilibrio=document.querySelector('#pontoEquilibrio')
  const pontoEquilibrioFinal=pontoEquilibrio.value.replace(',','.')

  const capacidade=document.querySelector('#capacidadeVeiculo')
  const routeID=document.querySelector('#routeIdLinha')
  const codGeo=document.querySelector('#codGeoLinha')
  if(localTrabalhoSelecionado.value==''||operadoraSelecionada.value==''||codigoLinha.value==''||letreiroLinha.value==''||sentidoSelecionado.value==''||valorMes.value==''||pontoEquilibrio.value==''||capacidade.value==''||routeID.value==''||codGeo.value=='')
  {
      modalSalvarLinha.innerHTML=`<div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível editar a linha!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
           Preencha todos os campos para editar a linha!
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>`
  errosCss()
  }
  else if(valorMes.value==0||pontoEquilibrio.value==0||
    capacidade.value==0||
    capacidade.value>50||
    capacidade.value<7||
    valorMesFinal==0||
    valorMesFinal==undefined||
    valorMesFinal==''||
    valorMesFinal==null||
    valorMesFinal==0.0||
    valorMesFinal==0.00||
    valorMesFinal==0.||
    valorMesFinal>30000||
    valorMesFinal<5000||
    pontoEquilibrioFinal==0||
    pontoEquilibrioFinal>100||
    pontoEquilibrioFinal<50||
    pontoEquilibrioFinal==undefined||
    pontoEquilibrioFinal==''||
    pontoEquilibrioFinal==null||
    pontoEquilibrioFinal==0.0||
    pontoEquilibrioFinal==0.00||
    pontoEquilibrioFinal==0.){
    modalSalvarLinha.innerHTML=`<div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar a linha!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
           Certifique-se de inserir valores válidos!<br>
           <strong>Capacidade:</strong> entre 7 e 50<br>
           <strong>Valor/mes:</strong> entre R$5.000,00 e R$30.000,00<br>
           <strong>Ponto de equilíbrio:</strong> entre 50% e 100%
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>`
  errosCss()
  }
  errosCss()
}

//Exibe mensagem de linha cadastrada, e cadastra a linha
function linhaCadastrada(){
  const urlParams = new URLSearchParams(location.search)
  const codEmpresa=urlParams.get('codEmpresa')
  const perfilUsu=urlParams.get('perfilUsu')
  const codUsu=urlParams.get('codUsu')
  const usuario=document.querySelector('#usuarioCapta').value

    const modalSalvarLinha=document.querySelector('#salvar')
    const localTrabalhoSelecionado=document.querySelector('#localTrabalhoSelecionado').value
    const operadoraSelecionada=document.getElementById('operadoraSelecionada')
    const codigoOperadoraSelecionada=operadoraSelecionada.value
    const descrOperadoraSelecionada=operadoraSelecionada.getAttribute('data-descr')
    const codigoLinha=document.querySelector('#codigoLinha').value
    const letreiroLinha=document.querySelector('#letreiroLinha').value
    const sentidoSelecionado=document.querySelector('#sentidoSelecionado').value

    const valorMes=document.querySelector('#valorMes').value
    const valorMesSemVirgula=valorMes.replace('.', '')
    const valorMesFinal=valorMesSemVirgula.replace(',','.')

    const pontoEquilibrio=document.querySelector('#pontoEquilibrio').value.replace(',','.')
    const capacidade=document.querySelector('#capacidadeVeiculo').value
    const codGeo=document.querySelector('#codGeoLinha').value
    const routeID=document.querySelector('#routeIdLinha').value
    if(
        localTrabalhoSelecionado!=''&&
        codigoOperadoraSelecionada!=''&&
        descrOperadoraSelecionada!=''&&
        codigoLinha!=''&&
        letreiroLinha!=''&&
        sentidoSelecionado!=''&&
        valorMes!=''&&
        pontoEquilibrio!=''&&
        capacidade!=''&&
        codGeo!=''&&
        routeID!=''&&
        valorMes!=0&&
        pontoEquilibrio!=0&&
        pontoEquilibrio!=null&&
        pontoEquilibrio!=undefined&&
        pontoEquilibrio!=0.0&&
        pontoEquilibrio!=0.00&&
        pontoEquilibrio!=0.&&
        pontoEquilibrio>=50&&
        pontoEquilibrio<=100&&
        capacidade>=7&&
        capacidade<=50&&
        capacidade!=0&&
        valorMesFinal!=0&&
        valorMesFinal!=undefined&&
        valorMesFinal!=''&&
        valorMesFinal!=null&&
        valorMesFinal!=0.&&
        valorMesFinal!=0.0&&
        valorMesFinal!=0.00&&
        valorMesFinal<=30000&&
        valorMesFinal>=5000
        ){
            modalSalvarLinha.innerHTML=` <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" id="modalAguarde">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Aguarde enquanto salvamos o usuário...</h5>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
                </div>
              </div>
            </div>
          </div>
          `
          let request=new Request(`http://sismob.captatec.com.br/api/SMob_CadLinhasFreta?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codEmpresa=${codEmpresa}&codOperadora=${codigoOperadoraSelecionada}&descrOperadora=${descrOperadoraSelecionada}&codLinhaF=${codigoLinha}&letreiro=${letreiroLinha}&sentido=${sentidoSelecionado}&capacidade=${capacidade}&valorMes=${valorMesFinal}&pontoEquilib=${pontoEquilibrio}&codGeo=${codGeo}&routeID=${routeID}`,{
            method: 'POST'
          })
          fetch(request)
          .then(response=>response.json().then(body=>{
            let codigo=(body).codigo
            let mensagem=(body).msg
            let modalAguarde=document.querySelector('#modalAguarde')
            if(codigo==0){
              modalAguarde.innerHTML=`
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar a linha!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  Não conseguimos salvar a linha, por favor, tente novamente!
                  <br>Detalhe do erro: ${mensagem}
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              </div>
              `
            } else{
              modalAguarde.innerHTML=`
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Linha salva!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="window.location.reload();"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  A linha foi salva com sucesso!
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="window.location.reload();">Fechar</button>
              </div>
            `
            }
          }))
            .catch(err=>modalAguarde.innerHTML=`
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar a linha!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  Por uma falha de conexão interna não conseguimos salvar a linha, por favor, tente novamente!
                  <br>Detalhe do erro: ${err}
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              </div>
            `)
    }
  }

//Exibe lista de linhas, operadoras e LT's já cadastrados com botoes de editar ou excluir
function listaDadosLinhasFretamento(){
  
  
  const urlParams = new URLSearchParams(location.search)
    const codEmpresa=urlParams.get('codEmpresa')
    const perfilUsu=urlParams.get('perfilUsu')
    const codUsu=urlParams.get('codUsu')
    const codValida=urlParams.get('codValida')
    
    const modaisExcluirLinhas=document.querySelector('#modaisExcluirLinhas')

    let request=new Request(`http://sismob.captatec.com.br/api/SMob_CadLinhasFreta?codUsu=${codUsu}&perfilUsu=${perfilUsu}&codEmpresa=${codEmpresa}`)
    fetch(request)
    .then(response=>response.json().then(body=>{
      const codigo=(body).codigo
      const mensagem=(body).msg
      const listaOP=(body).listaOP
      const listaLT=(body).listaLT
      const listaLinhas=(body).listaLinhas
      const usuario=document.querySelector('#usuarioCapta').value
      if(codigo==0){
          var myModal = new bootstrap.Modal(document.getElementById('erros'))
          modalErros.innerHTML=`
          <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Tivemos um erro ao carregar a página!</h5>
                        </div>
                        <div class="modal-body">
                          <div class="mb-3">
                            Clique no botão abaixo para ir ao menu.<br>Detalhe do erro: ${mensagem}
                          </div>
                        </div>
                        <div class="modal-footer">
                        <a href="index.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Menu</button>
                          </a>
                        </div>
                      </div>
                    </div>`
          myModal.show()
      }
      else if(codigo==1&&listaOP==false){
        var myModal = new bootstrap.Modal(document.getElementById('erros'))
          modalErros.innerHTML=`
          <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Tivemos um erro ao carregar a página!</h5>
                        </div>
                        <div class="modal-body">
                          <div class="mb-3">
                            A empresa não têm nenhuma operadora de fretamento cadastrada, para cadastrar uma linha, crie uma operadora para a empresa!<br>Clique no botão abaixo para ir ao menu.
                          </div>
                        </div>
                        <div class="modal-footer">
                        <a href="index.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Menu</button>
                          </a>
                        </div>
                      </div>
                    </div>`
          myModal.show()
      }
      else if (codigo==1&&listaLT==false){
        var myModal = new bootstrap.Modal(document.getElementById('erros'))
          modalErros.innerHTML=`
          <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Tivemos um erro ao carregar a página!</h5>
                        </div>
                        <div class="modal-body">
                          <div class="mb-3">
                            A empresa não têm nenhum local de trabalho, para cadastrar uma linha de fretamento, crie um local de trabalho para a empresa!<br>Clique no botão abaixo para ir ao menu.
                          </div>
                        </div>
                        <div class="modal-footer">
                        <a href="index.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Menu</button>
                          </a>
                        </div>
                      </div>
                    </div>`
          myModal.show()
      }
      else if(codigo==1&&listaLinhas==false){
        document.querySelector('#botaoAbrirTabela').innerHTML=`
        <button type="button" class="btn btn-outline-primary accordion-button collapsed" >
                  A empresa ainda não possui nenhuma linha cadastrada!
                </button>`
        //cria select dos locais de trabalho
      const locaisTrabLinhasFretamento=(body).locaisTrabalho
      locaisTrabLinhasFretamento.forEach(locaisTrabLinhasFretamento=>{
        let codLocTrab=locaisTrabLinhasFretamento.codLocTrab
        let descrLocTrab=locaisTrabLinhasFretamento.descrLocTrab
        let selectLocTrab=document.querySelector('#localTrabalho')
        let criarOptions=`
        <option value="${codLocTrab}" data-tokens="(${codLocTrab}) - ${descrLocTrab}">(${codLocTrab}) - ${descrLocTrab}</option>
        `
        selectLocTrab.insertAdjacentHTML('beforeend', criarOptions)

        //searchable select
        let selectBoxElementLocalTrabalho=document.querySelector('#localTrabalho')
        dselect(selectBoxElementLocalTrabalho,{
          search:true,
          
        })
      })

      //cria select das operadoras
      const operadorasLinhasFretamento=(body).operadoras
      operadorasLinhasFretamento.forEach(operadorasLinhasFretamento=>{
        let codOperadora=operadorasLinhasFretamento.codOperadora
        let descrOperadora=operadorasLinhasFretamento.descrOperadora
        let selectOperadoras=document.querySelector('#operadora')
        let criarOptionsOperadoras=`
        <option id="b${codOperadora}" value="${codOperadora}" data-tokens="${descrOperadora} ${codOperadora}" data-descr="${descrOperadora}">${descrOperadora}</option> 
        
        `
        selectOperadoras.insertAdjacentHTML('beforeend', criarOptionsOperadoras)
        
        //searchable select
        let selectBoxElementOperadoras=document.querySelector('#operadora')
        dselect(selectBoxElementOperadoras,{
          search:true
        })

      })
        
         
                

      }
      else{
        //cria select dos locais de trabalho
      const locaisTrabLinhasFretamento=(body).locaisTrabalho
      locaisTrabLinhasFretamento.forEach(locaisTrabLinhasFretamento=>{
        let codLocTrab=locaisTrabLinhasFretamento.codLocTrab
        let descrLocTrab=locaisTrabLinhasFretamento.descrLocTrab
        let selectLocTrab=document.querySelector('#localTrabalho')
        let criarOptions=`
        <option value="${codLocTrab}" data-tokens="(${codLocTrab}) - ${descrLocTrab}">(${codLocTrab}) - ${descrLocTrab}</option>
        `
        selectLocTrab.insertAdjacentHTML('beforeend', criarOptions)

        //searchable select
        let selectBoxElementLocalTrabalho=document.querySelector('#localTrabalho')
        dselect(selectBoxElementLocalTrabalho,{
          search:true,
          
        })
      })

      //cria select das operadoras
      const operadorasLinhasFretamento=(body).operadoras
      operadorasLinhasFretamento.forEach(operadorasLinhasFretamento=>{
        let codOperadora=operadorasLinhasFretamento.codOperadora
        let descrOperadora=operadorasLinhasFretamento.descrOperadora
        let selectOperadoras=document.querySelector('#operadora')
        let criarOptionsOperadoras=`
        <option id="b${codOperadora}" value="${codOperadora}" data-tokens="${descrOperadora} ${codOperadora}" data-descr="${descrOperadora}">${descrOperadora}</option> 
        
        `
        selectOperadoras.insertAdjacentHTML('beforeend', criarOptionsOperadoras)
        
        //searchable select
        let selectBoxElementOperadoras=document.querySelector('#operadora')
        dselect(selectBoxElementOperadoras,{
          search:true
        })

      })

      const linhasLinhasFretamento=(body).linhasFretado
      linhasLinhasFretamento.forEach(linhasLinhasFretamento=>{
        const linhasFretamentoTable=document.querySelector('#linhasFretamentoTable')

        let codLinhaSis=linhasLinhasFretamento.codLinhaSis

        let codLinhaF=linhasLinhasFretamento.codLinhaF
        codLinhaF=='' ? codLinhaF='Não informado' : codLinhaF=codLinhaF.toUpperCase()

        

        let sentido=linhasLinhasFretamento.sentido
          if(sentido==0){
            sentido=='Não informado'
          }
          else if (sentido==1){
            sentido='Ida'
          }
          else if(sentido==2){
            sentido='Volta'
          }
          else{
            sentido=sentido
          }

        let sentidoDescr=linhasLinhasFretamento.sentidoDescr
        sentidoDescr=='' ? sentidoDescr='Não informado' : sentidoDescr=sentidoDescr

        let valorMes=linhasLinhasFretamento.valorMes
        valorMes=='' ? valorMes='Não informado' : valorMes=valorMes.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

        let capacidade=linhasLinhasFretamento.capacidade
        capacidade=='' ? capacidade='Não informado' : capacidade=Number(capacidade.toFixed())

        let pontoEquilibrio=linhasLinhasFretamento.pontoEquilib
        pontoEquilibrio==0 ? pontoEquilibrio='Não informado' : pontoEquilibrio=Number(pontoEquilibrio.toFixed(2))
        
        let ocupacaoMinima

        pontoEquilibrio=='Não informado'||capacidade=='Não informado' ? ocupacaoMinima=='Não informado' : ocupacaoMinima=((pontoEquilibrio/100)*capacidade).toFixed()

        pontoEquilibrio=='Não informado' ? pontoEquilibrio='Não Informado' : pontoEquilibrio = pontoEquilibrio+'%'



        let letreiro=linhasLinhasFretamento.letreiro.toUpperCase()
        let routeID=linhasLinhasFretamento.routeID

        
        let descrLocTrab=linhasLinhasFretamento.descrLocTrab

        let criarTBody=`
      <tr>
          <td>${codLinhaF}</td>
          <td>${letreiro}</td>
          <td>${valorMes=='Não informado' ? 'Não informado' : valorMes}</td>
          <td>${sentido==0 ? 'Não informado' : sentido}</td>
          <td>${capacidade}</td>
          <td style="text-align: center; padding-right: 0">
          <button onclick="renderMap()" data-bs-toggle="modal" data-bs-target="#mapa" class="btn btn-success" style="height: 2em; width: 2em"
                    ><i class="bx bx-trip me-1" style="position: relative;
                    right: 0.5em;
                    bottom: 0.25em;"></i></button
                    >
          </td>
          <td style="text-align: center; padding-right:0; padding-left: 0">      
                    <button id="editar" class="btn btn-primary" style="height: 2em; width: 2em" onclick="recuperarRegistroLinha(${codLinhaSis},'${descrLocTrab}')"
                    ><i class="bx bx-edit-alt me-1" style="position: relative;
                    right: 0.5em;
                    bottom: 0.25em;"></i></button
                    >
          </td>
          <td style="text-align: center; padding-left:0">          
                    <button data-bs-toggle="modal" data-bs-target="#b${codLinhaSis}" class="btn btn-danger" style="height: 2em; width: 2em"
                    ><i class="bx bx-trash me-1" style="position: relative;
                    right: 0.5em;
                    bottom: 0.25em;"></i></button
                    >
          </td>      
      </tr>
        `
        linhasFretamentoTable.insertAdjacentHTML('beforeend',criarTBody)

      let criarModais=`
      <div class="modal fade" id="b${codLinhaSis}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Tem certeza que deseja excluir a linha abaixo?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div class="modal-body">
                    Código: ${codLinhaF}<br> Letreiro: ${letreiro} <br> Sentido: ${sentido} <br> Route ID: ${routeID}
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" onclick="excluirLinha(${codLinhaSis})" data-bs-toggle="modal" data-bs-target="#linhaExcluida" >Excluir</button>
                  </div>

                </div>
              </div>
            </div>
      `
      modaisExcluirLinhas.insertAdjacentHTML('beforeend',criarModais)
      }) 
      }
    })
    .catch(err=>{
      var myModal = new bootstrap.Modal(document.getElementById('erros'))
      modalErros.innerHTML=`
      <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Tivemos um erro ao carregar a página!</h5>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        Clique no botão abaixo para tentar carregá-la novamente.<br>Detalhe do erro: ${err}
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="window.location.reload()">Recarregar</button>
                    </div>
                  </div>
                </div>`
      myModal.show()
    
  })
    )}

    //função para excluir linhas
    function excluirLinha(codLinhaSis){
      const urlParams = new URLSearchParams(location.search)
    const perfilUsu=urlParams.get('perfilUsu')
    const codUsu=urlParams.get('codUsu')
    const usuario=document.querySelector('#usuarioCapta').value

    let modalLinhaExcluida=document.querySelector('#linhaExcluida')
    modalLinhaExcluida.innerHTML=`
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" id="modalAguardeExclusao">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Aguarde enquanto excluímos o usuário...</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
            <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            </div>
          </div>
        </div>
      </div>
    `

    let request=new Request(`http://sismob.captatec.com.br/api/SMob_LinhasFretaAcao?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codLinhaSis=${codLinhaSis}`,{
      method:'POST'
    })
    fetch(request)
    .then(response=>response.json().then(body=>{
      let codigo=(body).codigo
      let mensagem=(body).msg
      let modalUsuarioExclusao=document.querySelector('#modalAguardeExclusao')
      if(codigo==0){
      modalUsuarioExclusao.innerHTML=`
      <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível excluir a linha.</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      <div class="mb-3">
        Não conseguimos excluir a linha, por favor, tente novamente!
        <br>Detalhe do erro: ${mensagem}
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
    </div>
      `
      } else{
        modalUsuarioExclusao.innerHTML=`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Linha excluída!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="window.location.reload();"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              A linha foi excluída com sucesso!
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="window.location.reload();">Fechar</button>
          </div>
          `
      }
    }))
    .catch(err=>modalUsuarioExclusao.innerHTML=`
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível excluir a linha!</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      <div class="mb-3">
        Por uma falha de conexão interna não conseguimos excluir a linha, por favor, tente novamente!
        <br>Detalhe do erro: ${err}
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
    </div>
    `)
  
}
    

    //função para recuperar registro e preparar a pagina para edição
    function recuperarRegistroLinha(codLinhaSis,descrLocTrab){
    const urlParams = new URLSearchParams(location.search)
    const codEmpresa=urlParams.get('codEmpresa')
    const perfilUsu=urlParams.get('perfilUsu')
    const codUsu=urlParams.get('codUsu')
    var myModal = new bootstrap.Modal(document.getElementById('aguarde'))
    $('#editar').click(
      myModal.show()
    )
    var myCollapse = document.getElementById('tabelaUsuarios')
    var bsCollapse = new bootstrap.Collapse(myCollapse)

    document.querySelector('#tituloLinhasEdicao').innerHTML='Edição'
  
    let request=new Request(`http://sismob.captatec.com.br/api/SMob_LinhasFretaAcao?codUsu=${codUsu}&perfilUsu=${perfilUsu}&codLinhaSis=${codLinhaSis}&codEmpresa=${codEmpresa}`)
    fetch(request)
    .then(response=>response.json().then(body=>{
      let codigo=(body).codigo
      let mensagem=(body).msg
      if(codigo==0){
         var myModal2 = new bootstrap.Modal(document.getElementById('erros'))
        modalErros.innerHTML=`
        <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Tivemos um erro ao carregar os dados para edição!</h5>
                      </div>
                      <div class="modal-body">
                        <div class="mb-3">
                          Por favor, tente novamente.<br>Detalhe do erro: ${mensagem}
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Fechar</button>
                      </div>
                    </div>
                  </div>`
        myModal2.show()
      }
      else{
      document.querySelector('#codigoLinha').value=(body).linha.codLinhaF
      document.querySelector('#codigoLinha').disabled=true
      document.querySelector('#letreiroLinha').value=(body).linha.letreiro
      document.querySelector('#capacidadeVeiculo').value=(body).linha.capacidade
      document.querySelector('#codGeoLinha').value=(body).linha.codGeo
      document.querySelector('#codGeoLinha').disabled=true
      document.querySelector('#routeIdLinha').value=(body).linha.routeID
      document.querySelector('#routeIdLinha').disabled=true
      document.querySelector('#valorMes').value=(body).linha.valorMes.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).replace('R$ ','')
      document.querySelector('#pontoEquilibrio').value=(body).linha.pontoEquilib

      document.querySelector('#ltSelected').value=(body).linha.codLocTrab
      document.querySelector('#localTrabalhoSelecionado').value=(body).linha.codLocTrab
      document.querySelector('#ltSelected').textContent=`(${(body).linha.codLocTrab})-${descrLocTrab}`
      document.querySelector('#ltSelected').disabled=true

      //searchable select
      let selectBoxElementLocalTrabalho=document.querySelector('#localTrabalho')
      dselect(selectBoxElementLocalTrabalho,{
        search:true
      })

      document.querySelector('#opSelected').value=(body).linha.codOperadora
      document.querySelector('#operadoraSelecionada').value=(body).linha.codOperadora
      let descricaoOperadora=document.querySelector(`#b${(body).linha.codOperadora}`).getAttribute('data-descr')
      document.querySelector('#opSelected').textContent=descricaoOperadora
      document.querySelector('#opSelected').setAttribute('data-descr',descricaoOperadora)
      document.querySelector('#operadoraSelecionada').setAttribute('data-descr',descricaoOperadora)
      document.querySelector('#opSelected').disabled=true

      //searchable select
      let selectBoxElementOperadoras=document.querySelector('#operadora')
      dselect(selectBoxElementOperadoras,{
        search:true
      })

      let sentidoLinha=(body).linha.sentido
      document.querySelector('#sentidoSelecionado').value=sentidoLinha
      document.querySelector('#sentidoSelecionado').disabled=true
      document.querySelector('#sentido').disabled=true

      if(sentidoLinha==1){
      document.querySelector('#sentido').innerHTML=`
      <option value="" >Selecione o sentido</option>
                            <option value="1" selected>Ida</option>
                            <option value="2">Volta</option>
      `
      document.querySelector('#sentido').disabled=true
    }
      else if(sentidoLinha==2){
        document.querySelector('#sentido').innerHTML=`
      <option value="" >Selecione o sentido</option>
                            <option value="1">Ida</option>
                            <option value="2" selected>Volta</option>
      `
      document.querySelector('#sentido').disabled=true
      }
      else{
        document.querySelector('#sentido').innerHTML=`
      <option value="" selected >Selecione o sentido</option>
                            <option value="1">Ida</option>
                            <option value="2">Volta</option>`                       
     }
      document.querySelector('#botaoSalvar').innerHTML=`
    
    <button type="button" class="btn btn-secondary" onclick="voltaParaInclusao()" style="
    width: 49%; float:right;">Cancelar</button>
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#salvar" onclick="impedeEdicaoLinha();linhaEditada(${codLinhaSis})" style="
    width: 49%;">Confirmar alterações</button>
    `
    errosCss()
    bsCollapse.hide()
    myModal.hide()
    }})
  
    .catch(err=>{
      var myModal2 = new bootstrap.Modal(document.getElementById('erros'))
      modalErros.innerHTML=`
      <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Tivemos um erro ao carregar os dados para edição!</h5>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        Por favor, tente novamente.<br>Detalhe do erro: ${err}
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Fechar</button>
                    </div>
                  </div>
                </div>`
      myModal2.show()
    
  })
    )
    }

    //Cancela a edição, voltando a página para preparar a inclusão
    function voltaParaInclusao(){
      document.querySelector('#tituloLinhasEdicao').innerHTML='Inclusão'
      document.querySelector('#codigoLinha').value=''
      document.querySelector('#codigoLinha').disabled=false
      document.querySelector('#letreiroLinha').value=''
      document.querySelector('#capacidadeVeiculo').value=''
      document.querySelector('#codGeoLinha').value=''
      document.querySelector('#codGeoLinha').disabled=false
      document.querySelector('#routeIdLinha').value=''
      document.querySelector('#routeIdLinha').disabled=false
      document.querySelector('#valorMes').value=''
      document.querySelector('#pontoEquilibrio').value=''
      document.querySelector('#ltSelected').value=''
      document.querySelector('#localTrabalhoSelecionado').value=''
      document.querySelector('#ltSelected').textContent=`Selecione um local de trabalho`
      document.querySelector('#ltSelected').disabled=false
      document.querySelector('#opSelected').value=''
      document.querySelector('#operadoraSelecionada').value=''
      document.querySelector('#opSelected').textContent='Selecione uma operadora'
      document.querySelector('#opSelected').disabled=false
      document.querySelector('#sentido').innerHTML=`
                            <option value="" selected>Selecione o sentido</option>
                            <option value="1"="">Ida</option>
                            <option value="2">Volta</option>`
      document.querySelector('#sentidoSelecionado').value=''
      document.querySelector('#sentidoSelecionado').disabled=false
      document.querySelector('#sentido').disabled=false
      document.querySelector('#opSelected').textContent='Selecione um sentido'

  const codigoLinha=document.querySelector('#codigoLinha')
  const letreiroLinha=document.querySelector('#letreiroLinha')
  const sentido=document.querySelector('#sentido')
  const valorMes=document.querySelector('#valorMes')
  const pontoEquilibrio=document.querySelector('#pontoEquilibrio')
  const capacidade=document.querySelector('#capacidadeVeiculo')
  const routeID=document.querySelector('#routeIdLinha')
  const localTrabalhoBorder=document.querySelector('div.local button.form-select')
  const operadora=document.querySelector('div.operadora button.form-select')
  const codGeo=document.querySelector('#codGeoLinha')
  const codGeoSpan=document.querySelector('#codGeoSpan')
  const codigoLinhaSpan=document.querySelector('#codigoLinhaSpan')
  const letreiroSpan=document.querySelector('#letreiroSpan')
  const valorMesSpan=document.querySelector('#valorMesSpan')
  const pontoEquilibrioSpan=document.querySelector('#pontoEquilibrioSpan')
  const capacidadeSpan=document.querySelector('#capacidadeSpan')
  const routeIDSpan=document.querySelector('#routeIDSpan')

  codigoLinha.style.borderColor='#d9dee3'
  letreiroLinha.style.borderColor='#d9dee3'
  sentido.style.borderColor='#d9dee3'
  valorMes.style.borderColor='#d9dee3'
  pontoEquilibrio.style.borderColor='#d9dee3'
  capacidade.style.borderColor='#d9dee3'
  routeID.style.borderColor='#d9dee3'
  localTrabalhoBorder.style.borderColor='#d9dee3'
  operadora.style.borderColor='#d9dee3'
  codGeo.style.borderColor='#d9dee3'
  codGeoSpan.style.borderColor='#d9dee3'
  codigoLinhaSpan.style.borderColor='#d9dee3'
  letreiroSpan.style.borderColor='#d9dee3'
  valorMesSpan.style.borderColor='#d9dee3'
  pontoEquilibrioSpan.style.borderColor='#d9dee3'
  capacidadeSpan.style.borderColor='#d9dee3'
  routeIDSpan.style.borderColor='#d9dee3'
      //searchable select
      let selectBoxElementLocalTrabalho=document.querySelector('#localTrabalho')
      dselect(selectBoxElementLocalTrabalho,{
        search:true
      })
      //searchable select
      let selectBoxElementOperadora=document.querySelector('#operadora')
      dselect(selectBoxElementOperadora,{
        search:true
      })
      
      document.querySelector('#botaoSalvar').innerHTML=`
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#salvar" onclick="impedeCadastroLinha();linhaCadastrada()" style="
                      width: 100%;">Salvar</button>
    `
    }

    //validações para impedir edição de linha
function impedeEdicaoLinha(){
  const modalSalvarLinha=document.querySelector('#salvar')
  const localTrabalhoSelecionado=document.querySelector('#localTrabalhoSelecionado')
  const operadoraSelecionada=document.querySelector('#operadoraSelecionada')
  const codigoLinha=document.querySelector('#codigoLinha')
  const letreiroLinha=document.querySelector('#letreiroLinha')
  const sentidoSelecionado=document.querySelector('#sentidoSelecionado')

  const valorMes=document.querySelector('#valorMes')
  const valorMesSemVirgula=valorMes.value.replace('.', '')
  const valorMesFinal=valorMesSemVirgula.replace(',','.')

  const pontoEquilibrio=document.querySelector('#pontoEquilibrio')
  const pontoEquilibrioFinal=pontoEquilibrio.value.replace(',','.')

  const capacidade=document.querySelector('#capacidadeVeiculo')
  const routeID=document.querySelector('#routeIdLinha')
  const codGeo=document.querySelector('#codGeoLinha')
  if(localTrabalhoSelecionado.value==''||operadoraSelecionada.value==''||codigoLinha.value==''||letreiroLinha.value==''||sentidoSelecionado.value==''||valorMes.value==''||pontoEquilibrio.value==''||capacidade.value==''||routeID.value==''||codGeo.value=='')
  {
      modalSalvarLinha.innerHTML=`<div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível editar a linha!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
           Preencha todos os campos para editar a linha!
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>`
  errosCss()
  }
  else if(valorMes.value==0||pontoEquilibrio.value==0||capacidade.value==0||
    capacidade.value>50||
    capacidade.value<7||
    valorMesFinal==0||
    valorMesFinal==undefined||
    valorMesFinal==''||
    valorMesFinal==null||
    valorMesFinal==0.0||
    valorMesFinal==0.00||
    valorMesFinal==0.||
    valorMesFinal>30000||
    valorMesFinal<5000||
    pontoEquilibrioFinal==0||
    pontoEquilibrioFinal>100||
    pontoEquilibrioFinal<50||
    pontoEquilibrioFinal==undefined||
    pontoEquilibrioFinal==''||
    pontoEquilibrioFinal==null||
    pontoEquilibrioFinal==0.0||
    pontoEquilibrioFinal==0.00||
    pontoEquilibrioFinal==0.||
    valorMes.value=='R$ 0,00'||
    valorMes.value=='R$ 0,0'||
    valorMes.value=='R$ 0,'||
    valorMes.value=='R$ 0'||
    valorMes.value=='R$ '||
    valorMes.value=='R$'||
    valorMes.value=='R'){
    modalSalvarLinha.innerHTML=`<div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar a linha!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
          Certifique-se de inserir valores válidos!<br>
          <strong>Capacidade:</strong> entre 7 e 50<br>
          <strong>Valor/mes:</strong> entre R$5.000,00 e R$30.000,00<br>
          <strong>Ponto de equilíbrio:</strong> entre 50% e 100%
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>`
  errosCss()
  }
  errosCss()
}


    //função que edita a linha
function linhaEditada(codLinhaSis){
  const urlParams = new URLSearchParams(location.search)
  const codEmpresa=urlParams.get('codEmpresa')
  const perfilUsu=urlParams.get('perfilUsu')
  const codUsu=urlParams.get('codUsu')

  const modalSalvarLinha=document.querySelector('#salvar')

  let codigo=document.querySelector('#codigoLinha').value
  let letreiro=document.querySelector('#letreiroLinha').value
  let capacidade=document.querySelector('#capacidadeVeiculo').value
  let codGeo=document.querySelector('#codGeoLinha').value
  let routeId=document.querySelector('#routeIdLinha').value

  let valorMes=document.querySelector('#valorMes').value
  const valorMesSemVirgula=valorMes.replace('.', '')
  const valorMesFinal=valorMesSemVirgula.replace(',','.')

  const pontoEquilibrio=document.querySelector('#pontoEquilibrio').value.replace(',','.')
  let localTrab=document.querySelector('#localTrabalhoSelecionado').value
  let operadora=document.querySelector('#operadoraSelecionada').value
  let descrOperadora=document.querySelector('#operadoraSelecionada').getAttribute('data-descr')
  let sentido=document.querySelector('#sentidoSelecionado').value
    
    if(codigo!=''&&letreiro!=''&&capacidade!=''&&codGeo!=''&&routeId!=''&&valorMes!=''&&pontoEquilibrio!=''&&localTrab!=''&&operadora!=''&&sentido!=''&&capacidade!=0&&
    valorMes!=0&&
    capacidade>=7&&
    capacidade<=50&&
    pontoEquilibrio!=0&&
    pontoEquilibrio!=null&&
    pontoEquilibrio!=undefined&&
    pontoEquilibrio!=0.0&&
    pontoEquilibrio!=0.00&&
    pontoEquilibrio!=0.&&
    pontoEquilibrio>=50&&
    pontoEquilibrio<=100&&
    valorMesFinal!=0&&
    valorMesFinal!=undefined&&
    valorMesFinal!=''&&
    valorMesFinal!=null&&
    valorMesFinal!=0.&&
    valorMesFinal!=0.0&&
    valorMesFinal!=0.00&&
    valorMesFinal>=5000&&
    valorMesFinal<=30000&&
    valorMes!='R$ 0,00'&&
    valorMes!='R$ 0,0'&&
    valorMes!='R$ 0,'&&
    valorMes!='R$ 0'&&
    valorMes!='R$ '&&
    valorMes!='R$'&&
    valorMes!='R'){
      modalSalvarLinha.innerHTML=`
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" id="modalAguarde">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Aguarde enquanto salvamos as alterações da linha...</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
            <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            </div>
          </div>
        </div>
      </div>
      `
      let request=new Request(`http://sismob.captatec.com.br/api/SMob_CadLinhasFreta?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&codOperadora=${operadora}&descrOperadora=${descrOperadora}&letreiro=${letreiro}&sentido=${sentido}&capacidade=${capacidade}&valorMes=${valorMesFinal}&pontoEquilib=${pontoEquilibrio}&codLinhaSis=${codLinhaSis}
      `,{
        method: 'PUT'
      })
      fetch(request)
      .then(response=>response.json().then(body=>{
        let codigo=(body).codigo
        let mensagem=(body).msg
        let modalAguarde=document.querySelector('#modalAguarde')
        if(codigo==0){
          modalAguarde.innerHTML=`
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar a linha!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              Não conseguimos realizar as alterações, por favor, tente novamente!
              <br>Detalhe do erro: ${mensagem}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
          `
        } else{
          modalAguarde.innerHTML=`
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Linha alterada!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="window.location.reload();"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              As alterações da linha foram salvas com sucesso!
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="window.location.reload();">Fechar</button>
          </div>
        `
        }
      }))
        .catch(err=>modalAguarde.innerHTML=`
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar o usuário!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              Por uma falha de conexão interna não conseguimos realizar as alterações, por favor, tente novamente!
              <br>Detalhe do erro: ${err}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        `)
      }}
      
function errosCss(){
  const localTrabalhoSelecionado=document.querySelector('#localTrabalhoSelecionado')
  const operadoraSelecionada=document.querySelector('#operadoraSelecionada')
  const codigoLinha=document.querySelector('#codigoLinha')
  const letreiroLinha=document.querySelector('#letreiroLinha')
  const sentidoSelecionado=document.querySelector('#sentidoSelecionado')
  const sentido=document.querySelector('#sentido')
  const valorMes=document.querySelector('#valorMes')
  const pontoEquilibrio=document.querySelector('#pontoEquilibrio')
  const capacidade=document.querySelector('#capacidadeVeiculo')
  const routeID=document.querySelector('#routeIdLinha')
  const localTrabalhoBorder=document.querySelector('div.local button.form-select')
  const operadora=document.querySelector('div.operadora button.form-select')
  const codGeo=document.querySelector('#codGeoLinha')
  const codGeoSpan=document.querySelector('#codGeoSpan')
  const codigoLinhaSpan=document.querySelector('#codigoLinhaSpan')
  const letreiroSpan=document.querySelector('#letreiroSpan')
  const valorMesSpan=document.querySelector('#valorMesSpan')
  const pontoEquilibrioSpan=document.querySelector('#pontoEquilibrioSpan')
  const capacidadeSpan=document.querySelector('#capacidadeSpan')
  const routeIDSpan=document.querySelector('#routeIDSpan')
  const valorMesSemVirgula=valorMes.value.replace('.', '')
  const valorMesFinal=valorMesSemVirgula.replace(',','.')
  const pontoEquilibrioFinal=pontoEquilibrio.value.replace(',','.')

  if(localTrabalhoSelecionado.value==''){
    localTrabalhoBorder.style.borderColor='#FF0000'
  }
  else{
    localTrabalhoBorder.style.borderColor='#d9dee3'
  }

  if(operadoraSelecionada.value==''){
    operadora.style.borderColor='#FF0000'
  }
  else{
    operadora.style.borderColor='#d9dee3'
  }

  if(codigoLinha.value==''){
    codigoLinha.style.borderColor='#FF0000'
    codigoLinhaSpan.style.borderColor='#FF0000'
  }
  else{
    codigoLinha.style.borderColor='#d9dee3'
    codigoLinhaSpan.style.borderColor='#d9dee3'
  }

  if(letreiroLinha.value==''){
    letreiroLinha.style.borderColor='#FF0000'
    letreiroSpan.style.borderColor='#FF0000'
  }
  else{
    letreiroLinha.style.borderColor='#d9dee3'
    letreiroSpan.style.borderColor='#d9dee3'
  }

  if(sentidoSelecionado.value==''){
    sentido.style.borderColor='#FF0000'
  }
  else{
    sentido.style.borderColor='#d9dee3'
  }

  if(valorMes.value==''||valorMes.value==0||valorMes.value=='0,0'||valorMes.value=='0,'||valorMes.value=='0,00'||valorMes.value=='R$ 0,00'||
  valorMes.value=='R$ 0,0'||
  valorMes.value=='R$ 0,'||
  valorMes.value=='R$ 0'||
  valorMes.value=='R$ '||
  valorMes.value=='R$'||
  valorMes.value=='R'||
  valorMes.value=='00,00'||
  valorMesFinal>30000||
  valorMesFinal<5000
  ){
    valorMes.style.borderColor='#FF0000'
    valorMesSpan.style.borderColor='#FF0000'
  }
  else{
    valorMes.style.borderColor='#d9dee3'
    valorMesSpan.style.borderColor='#d9dee3'
  }

  if(pontoEquilibrio.value==''||pontoEquilibrio.value==0||pontoEquilibrio.value=='0,0'||pontoEquilibrio.value=='0,'||pontoEquilibrio.value=='0,00'||pontoEquilibrioFinal>100||pontoEquilibrioFinal<50){
    pontoEquilibrio.style.borderColor='#FF0000'
    pontoEquilibrioSpan.style.borderColor='#FF0000'
  }
  else{
    pontoEquilibrio.style.borderColor='#d9dee3'
    pontoEquilibrioSpan.style.borderColor='#d9dee3'
  }

  if(capacidade.value==''||capacidade.value==0||capacidade.value>50||capacidade.value<7){
    capacidade.style.borderColor='#FF0000'
    capacidadeSpan.style.borderColor='#FF0000'
  }
  else{
    capacidade.style.borderColor='#d9dee3'
    capacidadeSpan.style.borderColor='#d9dee3'
  }

  if(routeID.value==''){
    routeID.style.borderColor='#FF0000'
    routeIDSpan.style.borderColor='#FF0000'
  }
  else{
    routeID.style.borderColor='#d9dee3'
    routeIDSpan.style.borderColor='#d9dee3'
  }

  if(codGeo.value==''){
    codGeo.style.borderColor='#FF0000'
    codGeoSpan.style.borderColor='#FF0000'
  }
  else{
    codGeo.style.borderColor='#d9dee3'
    codGeoSpan.style.borderColor='#d9dee3'
  }
}


//Teste de criação de mapas, exibe shape no modal
//mock dos linestring
const linhas = 
  {
    sentido: 1,
    shape: [
      {lat: -19.93853323274136, lng: -44.02972386842927},
      {lat: -19.93977974160103, lng: -44.02808974860836},
      {lat: -19.94052315754294, lng: -44.02744383365599},
      {lat: -19.94058014230409, lng: -44.02738341200299},
      {lat: -19.94065607687745, lng: -44.02734340705952},
      {lat: -19.94075092530409, lng: -44.02728331776888},
      {lat: -19.94086463915915, lng: -44.02724365557882},
      {lat: -19.94092145040851, lng: -44.02718337431908},
      {lat: -19.9409782364625, lng: -44.02714335100968},
      {lat: -19.94109172029163, lng: -44.02706336299816},
      {lat: -19.94116731320804, lng: -44.02698313535183},
      {lat: -19.94128060895554, lng: -44.02692349473856},
      {lat: -19.94135607473808, lng: -44.0268837686895},
      {lat: -19.9414314921104, lng: -44.02682388021557},
      {lat: -19.94150686038307, lng: -44.02680439422636},
      {lat: -19.94158217679361, lng: -44.02674457306558},
      {lat: -19.9416198165794, lng: -44.02674493136308},
      {lat: -19.94287349646946, lng: -44.02555342249617},
      {lat: -19.94328202685175, lng: -44.0242581809883},
      {lat: -19.9438551591809, lng: -44.02279238467604},
      {lat: -19.94459591453198, lng: -44.02093902924263},
      {lat: -19.9453550643473, lng: -44.01909339383469},
      {lat: -19.94545589764755, lng: -44.01707834986768},
      {lat: -19.94575872714059, lng: -44.01517693896062},
      {lat: -19.94565749089526, lng: -44.01370416939166},
      {lat: -19.94494934870382, lng: -44.01243441404103},
      {lat: -19.9441889263648, lng: -44.01176106024454},
      {lat: -19.94363001064241, lng: -44.01076343855362},
      {lat: -19.94337543701277, lng: -44.009608877036},
      {lat: -19.94312042276199, lng: -44.00839975049183},
      {lat: -19.9425081151438, lng: -44.00696025858907},
      {lat: -19.94153659496993, lng: -44.00528749985603},
      {lat: -19.94081906766645, lng: -44.00438663570934},
      {lat: -19.93994583060024, lng: -44.00369793300619},
      {lat: -19.93886402984796, lng: -44.00305491979397},
      {lat: -19.93808914886256, lng: -44.00236635365365},
      {lat: -19.93751974656579, lng: -44.00157399263631},
      {lat: -19.93714733736079, lng: -44.00057351931169},
      {lat: -19.93725819460478, lng: -43.99927086348459},
      {lat: -19.93742457691484, lng: -43.99838420111775},
      {lat: -19.93759082677112, lng: -43.99743894556747},
      {lat: -19.93720199284828, lng: -43.99607098886282},
      {lat: -19.93670150248127, lng: -43.99523274764916},
      {lat: -19.93575392841003, lng: -43.99480007478795},
      {lat: -19.9345789406405, lng: -43.99430207439671},
      {lat: -19.93294820406617, lng: -43.99325570482404},
      {lat: -19.93147812607978, lng: -43.99208757270726},
      {lat: -19.92925869070846, lng: -43.99017391037278},
      {lat: -19.92811096723358, lng: -43.9884535714487},
      {lat: -19.92683621421667, lng: -43.9860466926228},
      {lat: -19.92619477851068, lng: -43.98456366055421},
      {lat: -19.92537203930201, lng: -43.98190835532721},
      {lat: -19.92527594738602, lng: -43.97936960758491},
      {lat: -19.92543879975626, lng: -43.97772204506609},
      {lat: -19.92582350812892, lng: -43.97542837476446},
      {lat: -19.92553952989111, lng: -43.97406853809877},
      {lat: -19.92435346730627, lng: -43.97227456508974},
      {lat: -19.9230472739919, lng: -43.97088197095692},
      {lat: -19.92161596577884, lng: -43.96917759211497},
      {lat: -19.9201175719478, lng: -43.96787801114741},
      {lat: -19.9191860507857, lng: -43.96640628699012},
      {lat: -19.91842498637476, lng: -43.96511414227118},
      {lat: -19.91830273832854, lng: -43.96402262274687},
      {lat: -19.91829648233873, lng: -43.96287410338518},
      {lat: -19.91852044889477, lng: -43.9612510760217},
      {lat: -19.9178001944317, lng: -43.95751819784392},
      {lat: -19.91702703372748, lng: -43.95546730590764},
      {lat: -19.91696147307853, lng: -43.95430546380887},
      {lat: -19.91695244142909, lng: -43.95277997353097},
      {lat: -19.91716350542756, lng: -43.95067081793075},
      {lat: -19.91738888438787, lng: -43.94928026062416},
      {lat: -19.91738212456199, lng: -43.94789040613322},
      {lat: -19.91677069175766, lng: -43.94649520770903},
      {lat: -19.91592593518773, lng: -43.94600700203313},
      {lat: -19.9147891811387, lng: -43.94473703901746},
      {lat: -19.91398047815908, lng: -43.94428890497592},
      {lat: -19.91349960806742, lng: -43.94296655052493},
      {lat: -19.91272867187596, lng: -43.94168092932564},
      {lat: -19.91224409858822, lng: -43.94073881197984},
      {lat: -19.91195138429402, lng: -43.93979914141313},
      {lat: -19.91223818558333, lng: -43.93868128491722},
      {lat: -19.91257376497327, lng: -43.93795898094892},
      {lat: -19.91286035171785, lng: -43.93718748488873},
      {lat: -19.91295402717268, lng: -43.93631127842222},
      {lat: -19.9130460093034, lng: -43.93484872816397},
      {lat: -19.9130429994941, lng: -43.93377273664125},
      {lat: -19.91352039450767, lng: -43.93301700764837},
      {lat: -19.91409262306215, lng: -43.93265936765927},
      {lat: -19.91480583494983, lng: -43.93270053259467},
      {lat: -19.91680251196838, lng: -43.93303243015037},
      {lat: -19.918534192052, lng: -43.93358393519105},
      {lat: -19.91978053935293, lng: -43.93348061697184},
      {lat: -19.92078535810949, lng: -43.9328913666832},
      {lat: -19.92105775875728, lng: -43.931876462533},
      {lat: -19.92078553325758, lng: -43.93063103404327},
      {lat: -19.92051271630618, lng: -43.92900573322493},
      {lat: -19.92017196993901, lng: -43.92672136419417},
      {lat: -19.92021392880628, lng: -43.92477931339074},
      {lat: -19.91992142489026, lng: -43.9233460405455},
      {lat: -19.91971201709922, lng: -43.92225815717929},
      {lat: -19.91937605618389, lng: -43.92094627655077},
      {lat: -19.91903897423631, lng: -43.91989045201849},
      {lat: -19.91903922573493, lng: -43.91871976000708},
      {lat: -19.91908174548946, lng: -43.91724873674995},
      {lat: -19.91925056696704, lng: -43.91630716979652},
      {lat: -19.91929286967819, lng: -43.91514199180143},
      {lat: -19.918828994341, lng: -43.91380707356893},
      {lat: -19.91819280771329, lng: -43.91288602812713},
      {lat: -19.91738130206371, lng: -43.91133274142828},
      {lat: -19.91612942250597, lng: -43.91020640863992},
      {lat: -19.91459721138153, lng: -43.90908278497132},
      {lat: -19.91302019617734, lng: -43.90892044372575},
      {lat: -19.91203602173309, lng: -43.90920393343033},
      {lat: -19.9116757391485, lng: -43.91006903963007},
      {lat: -19.91090601812146, lng: -43.91138916427019},
      {lat: -19.90999425752889, lng: -43.91280984385603},
      {lat: -19.90853899892542, lng: -43.91325431073016},
      {lat: -19.90757522564297, lng: -43.91338064179183},
      {lat: -19.9064588942845, lng: -43.9132201391751},
      {lat: -19.90477031335249, lng: -43.91169251888896},
      {lat: -19.90392292073019, lng: -43.91082688597047},
      {lat: -19.90177430412984, lng: -43.90964811764808},
      {lat: -19.89965659666088, lng: -43.90886589840699},
      {lat: -19.89716332693427, lng: -43.90941270236539},
      {lat: -19.89600725179741, lng: -43.90988276840825},
      {lat: -19.89181888733465, lng: -43.91171579120773},
      {lat: -19.88989879875969, lng: -43.91196180690428},
      {lat: -19.88821825714776, lng: -43.91166947596891},
      {lat: -19.88661062539548, lng: -43.91166460364166},
      {lat: -19.88649734231947, lng: -43.91173784818798},
      {lat: -19.88531574310492, lng: -43.91240261335978},
      {lat: -19.88269963808967, lng: -43.91336501008828},
      {lat: -19.88131697180048, lng: -43.91390666448211},
      {lat: -19.88057056504465, lng: -43.91524316211797},
      {lat: -19.87946189898431, lng: -43.91639849033804},
      {lat: -19.87812679296417, lng: -43.91797520193246},
      {lat: -19.8726525717423, lng: -43.92478221074358},
      {lat: -19.87084851030023, lng: -43.92609619725},
      {lat: -19.86958870405071, lng: -43.92693840319919},
      {lat: -19.86782583695044, lng: -43.92761405334133},
      {lat: -19.86701292666363, lng: -43.9274006309574},
      {lat: -19.86586199601885, lng: -43.92709846148675},
      {lat: -19.86475182148862, lng: -43.92668284373833},
      {lat: -19.86285133550815, lng: -43.9262345788317},
      {lat: -19.86203270118294, lng: -43.92650168176828},
      {lat: -19.86078420824004, lng: -43.92716015592461},
      {lat: -19.85982888680712, lng: -43.92807799527448},
      {lat: -19.85920199639606, lng: -43.92916675111548},
      {lat: -19.85868170685184, lng: -43.93146427537454},
      {lat: -19.85852582706266, lng: -43.93279935887309},
      {lat: -19.857898875789, lng: -43.93399621850473},
      {lat: -19.85696518272456, lng: -43.93480789123923},
      {lat: -19.85686690796276, lng: -43.93482636556184},
      {lat: -19.85555706509449, lng: -43.935313669436},
      {lat: -19.85316219537869, lng: -43.93502069954976},
      {lat: -19.84872216648962, lng: -43.93282489199154},
      {lat: -19.84655024475886, lng: -43.932628279593},
      {lat: -19.84497807916279, lng: -43.9329685252558},
      {lat: -19.84324576163418, lng: -43.93373450654541},
      {lat: -19.84202149001036, lng: -43.93504465627728},
      {lat: -19.84049130684912, lng: -43.93622959990998},
      {lat: -19.83896056002009, lng: -43.93726189604586},
      {lat: -19.83806517520989, lng: -43.93825786530243},
      {lat: -19.83795184489768, lng: -43.93836577251187},
      {lat: -19.83679401496671, lng: -43.93960932273759},
      {lat: -19.83469159374356, lng: -43.94029119708402},
      {lat: -19.83235936606306, lng: -43.94055462089943},
      {lat: -19.83057161018375, lng: -43.94122189534347},
      {lat: -19.82891073602982, lng: -43.94227201771404},
      {lat: -19.8271754175017, lng: -43.94307423192321},
      {lat: -19.82540793973688, lng: -43.94390741684191},
      {lat: -19.82380160005618, lng: -43.94452958129229},
      {lat: -19.82221910542587, lng: -43.94580648412054},
      {lat: -19.82172627018753, lng: -43.94657552268868},
      {lat: -19.82155316024706, lng: -43.94730859512681},
      {lat: -19.82142099742988, lng: -43.94774730601042},
      {lat: -19.82126641147019, lng: -43.9481730834445},
      {lat: -19.82102660129097, lng: -43.9488311433209},
      {lat: -19.82084438821582, lng: -43.94926820637619},
      {lat: -19.8206647681473, lng: -43.94950766038322},
      ],
      employees: [
        {
         name: 'José de Abreu',
         registration: '489148',
         coords: {lat:-19.87053725278837, lng:-44.00960691581737} 
        },
        {
          name: 'Aline Silva',
          registration: '5498',
          coords: {lat:-19.78712005889129, lng:-43.96375560286141} 
         },
         {
          name: 'Matias Santos',
          registration: '4891787148',
          coords: {lat:-19.80950457900114, lng:-43.93131363614728} 
         },
         {
          name: 'Pedro de Paulo',
          registration: '19484894',
          coords: {lat:-19.954510293286774, lng:-43.935698758306046} 
         },
         {
          name: 'Luana Souza',
          registration: '184264',
          coords: {lat:-19.93443901471831, lng:-43.904959027317034} 
         },
         {
          name: 'Zé da Timba',
          registration: '2187899',
          coords: {lat:-19.95315881062802, lng:-44.05375375254149} 
         },
      ],
      stops: [
        {lat: -19.945542722146378, lng: -44.01650543266026},
        {lat: -19.9386220195354, lng: -44.0027202145935},
        {lat: -19.92818387840437, lng: -43.98821027238126},
        {lat: -19.922456486198747, lng: -43.97031141366629},
        {lat: -19.917650509043888, lng: -43.95656563007414},
        {lat: -19.913165422308737, lng: -43.94259644727026},
        {lat: -19.917410025345823, lng: -43.93323277610609},
        {lat: -19.91944936487352, lng: -43.92226168959805},
        {lat: -19.91791105133687, lng: -43.91274057425407},
        {lat: -19.90608088660985, lng: -43.913060774254326},
        {lat: -19.89525098443402, lng: -43.91053846803387},
        {lat: -19.883354894707082, lng: -43.912926496686175},
        {lat: -19.872259834623843, lng: -43.92518508677116},
        {lat: -19.863243907667037, lng: -43.926218109424866},
        {lat: -19.85774565688585, lng: -43.93401759429284},
        {lat: -19.84779017864102, lng: -43.93269471824817},
        {lat: -19.83427962378448, lng: -43.94036517578854},
      ]
  }

  //tamanho do array shape
const shapeLength = linhas.shape.length

      //Teste de criação de mapas, exibe shape no modal
/**
 * Adds a polyline (create shape)
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
 function addPolylineToMap(map) {
  var lineString = new H.geo.LineString();

  linhas.shape.forEach(coordsObj => {
    lineString.pushPoint(coordsObj)
  }
)

  map.addObject(new H.map.Polyline(
    lineString, { style: { lineWidth: 4 }}
  ));
}

//adds markers to the map
function addMarkersToMap(map) {
  if(linhas.sentido === 1) {
    var originMarker = new H.map.Marker(linhas.shape[0], {icon: originIcon})
  map.addObject(originMarker)

  var destinyMarker = new H.map.Marker(linhas.shape[shapeLength-1], {icon: companyIcon})
  map.addObject(destinyMarker)
  }

  else {
    var originMarker = new H.map.Marker(linhas.shape[shapeLength-1], {icon: originIcon})
  map.addObject(originMarker)

  var destinyMarker = new H.map.Marker(linhas.shape[0], {icon: companyIcon})
  map.addObject(destinyMarker)
  }

  linhas.employees.forEach(employee => {
    let employeeCoord = employee.coords
    let employeeName = employee.name
    let employeeRegistration = employee.registration
    let employeeMarker = new H.map.Marker(employeeCoord, {icon: employeeIcon})
    
    function addMarkerToGroup(group, coordinate, html) {
      var marker = new H.map.Marker(coordinate, {icon: employeeIcon});
      // add custom data to the marker
      marker.setData(html);
      group.addObject(marker);
    }
    
    function addInfoBubble(map) {
      var group = new H.map.Group();
    
      map.addObject(group);
    
      // add 'tap' event listener, that opens info bubble, to the group
      group.addEventListener('tap', function (evt) {
        // event target is the marker itself, group is a parent event target
        // for all objects that it contains
        var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
          // read custom data
          content: evt.target.getData()
        });
        // show info bubble
        ui.addBubble(bubble);
      }, false);
    
      addMarkerToGroup(group, employeeCoord,
        `<div style="
        min-inline-size: max-content;
    ">${employeeName}<br>${employeeRegistration}</div>`);
    }
    map.addObject(employeeMarker)
    addInfoBubble(map)
  })

  linhas.stops.forEach(stopCoord => {
    let stopMarker = new H.map.Marker(stopCoord, {icon: stopIcon})
    map.addObject(stopMarker)
  })
}


//markers icons
const svgOriginIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m12 17 1-2V9.858c1.721-.447 3-2 3-3.858 0-2.206-1.794-4-4-4S8 3.794 8 6c0 1.858 1.279 3.411 3 3.858V15l1 2z"></path><path d="m16.267 10.563-.533 1.928C18.325 13.207 20 14.584 20 16c0 1.892-3.285 4-8 4s-8-2.108-8-4c0-1.416 1.675-2.793 4.267-3.51l-.533-1.928C4.197 11.54 2 13.623 2 16c0 3.364 4.393 6 10 6s10-2.636 10-6c0-2.377-2.197-4.46-5.733-5.437z"></path></svg>`
const originIcon = new H.map.Icon(svgOriginIcon)

const svgCompanyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M7 14.001h2v2H7z"></path><path d="M19 2h-8a2 2 0 0 0-2 2v6H5c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2zM5 20v-8h6v8H5zm9-12h-2V6h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V6h2v2z"></path></svg>`
const companyIcon = new H.map.Icon(svgCompanyIcon)

const svgEmployeeIcon = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g/><g><circle cx="12" cy="4" r="2"/><path d="M15.89,8.11C15.5,7.72,14.83,7,13.53,7c-0.21,0-1.42,0-2.54,0C8.24,6.99,6,4.75,6,2H4c0,3.16,2.11,5.84,5,6.71V22h2v-6h2 v6h2V10.05L18.95,14l1.41-1.41L15.89,8.11z"/></g></g></svg>`
const employeeIcon = new H.map.Icon(svgEmployeeIcon)

const svgStopIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1c-2.4 0-4.52 1.21-5.78 3.05.01-.01.01-.02.02-.03C9.84 4 9.42 4 9 4c-4.42 0-8 .5-8 4v10c0 .88.39 1.67 1 2.22V22c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22v-3.08c3.39-.49 6-3.39 6-6.92 0-3.87-3.13-7-7-7zM4.5 19c-.83 0-1.5-.67-1.5-1.5S3.67 16 4.5 16s1.5.67 1.5 1.5S5.33 19 4.5 19zM3 13V8h6c0 1.96.81 3.73 2.11 5H3zm10.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2.5-6c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm.5-9H15v5l3.62 2.16.75-1.23-2.87-1.68z"/></svg>`
const stopIcon = new H.map.Icon(svgStopIcon)

document.getElementById('legenda').innerHTML = `
${svgOriginIcon} Ponto inicial/final || ${svgCompanyIcon} Empresa || ${svgEmployeeIcon}Casa dos funcionários || ${svgStopIcon} Pontos de embarque/desembarque
`

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: 'j_2nd1oo9KEEZjtXMr00yXv-lGuogKpehnyWQfs-zJM'
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: linhas.shape[shapeLength/2],
  zoom: 12,
  pixelRatio: window.devicePixelRatio || 1,
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//renderizar mapa após 1 segundo do clique do botao
function renderMap() {
  setTimeout(() => map.getViewPort().resize(), 300)
} 

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);


// Now use the map as required...
addPolylineToMap(map);
addMarkersToMap(map);