var modalErros=document.querySelector('#erros')

//filtros na tabela
$(document).ready(function() {
  $("#gfg").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#usuariosTable tr").filter(function() {
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
          listaUsuarios()
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
                      Clique no botão abaixo para ir ao menu.<br>Detalhe do erro: ${err}
                    </div>
                  </div>
                  <div class="modal-footer">
                  <a href="http://sis.captatec.com.br/AdmEmpresa.aspx?codValida=${codValida}&codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}"
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Recarregar</button>
                    </a>
                  </div>
                </div>
              </div>`
    myModal.show()
  
})
}

//modifica os atributos do select ao selecionar outro tipo de usuario
function atualizouAtributos(){
    let tipoUsuarioSelect=document.getElementById('tipoUsuario')
    let valorTipoUsuarioSelected=tipoUsuarioSelect.options[tipoUsuarioSelect.selectedIndex]
    document.getElementById('tipoUsuarioSelecionado').value=valorTipoUsuarioSelected.value
    const tipoUsuarioSelecionado=document.querySelector('#tipoUsuarioSelecionado').value
    if(tipoUsuarioSelecionado==2){
      document.querySelector('#permissoesPersonalizaveis').innerHTML=`
      <div class="col-xl">
                  <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <h5 class="mb-0">Gerencie as permissões</h5>
                    </div>
                    <div class="card-body">
                      <!--permissao Consultas-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-detail"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoConsulta" />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Consultas</label>
                        </div>
                      </div>
                      <!--fim permissao consultas-->
                
                      <!--permissao impressoes cartas-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-note"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoImpressaoCarta" />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Imprimir cartas</label>
                        </div>
                      </div>
                      <!--fim permissao impressoes cartas-->
                
                      <!--permissao download relatórios-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bxs-chart"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoDownloadRelatorios" />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Download Relatórios</label>
                        </div>
                      </div>
                      <!--fim permissao download relatórios-->
                
                      <!--permissao gestaoSenhas-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-check-shield"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoGestaoSenhas" />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Gestão de Senhas</label>
                        </div>
                      </div>
                      <!--fim permissao gestao senhas-->
                
                      <!--permissao acesso documentos-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-note"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoAcessoDocumentos" />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Acesso a documentos</label>
                        </div>
                      </div>
                      <!--fim permissao acesso docuementos-->
                
                      <!--permissao alterar dados config-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-cog"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoAlterarConfiguracoes" />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Alterar dados e configurações</label>
                        </div>
                      </div>
                      <!--fim permissao alterar dados config-->
                      <!--fim permissões-->
                    </div>
                  </div>
                </div>
      `
    }
    else{
      document.querySelector('#permissoesPersonalizaveis').innerHTML=''
    }
}



//verifica se todos os campos estão preenchidos no cadastro
function impedeCadastroUsuario(){
    const modalSalvarUsuario=document.querySelector('#salvar')
    const cpfCadUsuario=document.querySelector('#cpfMaskUsuariosSenhas')
    const nomeUsuariosSenhas=document.querySelector('#nomeUsuariosSenhas')
    const emailUsuariosSenhas=document.querySelector('#emailUsuariosSenhas')
    const senhaUsuariosSenhas=document.querySelector('#senhaUsuariosSenhas')
    const confirmeSenhaUsuariosSenhas=document.querySelector('#confirmeSenhaUsuariosSenhas')
    const tipoUsuarioSelecionado=document.querySelector('#tipoUsuarioSelecionado')
    if(cpfCadUsuario.value==''||nomeUsuariosSenhas.value==''||emailUsuariosSenhas.value==''||senhaUsuariosSenhas.value==''||confirmeSenhaUsuariosSenhas.value==''||tipoUsuarioSelecionado.value==''||cpfCadUsuario.value=='Não Cadastrado'){
        modalSalvarUsuario.innerHTML=`<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar o usuário!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
             Preencha todos os campos para salvar o usuário!
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    `
    errosCss()
    }
    errosCss()
}

//verifica se a senha e a confirmação da senha correspondem
function confirmacaoSenha3(){
    const modalSalvarUsuario=document.querySelector('#salvar')
    const senhaUsuariosSenhas=document.querySelector('#senhaUsuariosSenhas')
    const confirmeSenhaUsuariosSenhas=document.querySelector('#confirmeSenhaUsuariosSenhas')
    if(senhaUsuariosSenhas.value!=confirmeSenhaUsuariosSenhas.value){
      senhaUsuariosSenhas.value=''
      confirmeSenhaUsuariosSenhas.value=''
        modalSalvarUsuario.innerHTML=`
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar o usuário!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
             As senhas não conferem!
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
  `
  errosCss()
    }
}

//cadastra usuario e exibe mensagem de usuario cadastrado
function usuarioCadastrado(){
  const urlParams = new URLSearchParams(location.search)
  const codEmpresa=urlParams.get('codEmpresa')
  const perfilUsu=urlParams.get('perfilUsu')
  const codUsu=urlParams.get('codUsu')
  const usuario=document.querySelector('#usuarioCapta').value

    const modalSalvarUsuario=document.querySelector('#salvar')
    const cpfCadUsuario=document.querySelector('#cpfMaskUsuariosSenhas').value
    const nomeUsuariosSenhas=document.querySelector('#nomeUsuariosSenhas').value
    const emailUsuariosSenhas=document.querySelector('#emailUsuariosSenhas').value
    const senhaUsuariosSenhas=document.querySelector('#senhaUsuariosSenhas').value
    const confirmeSenhaUsuariosSenhas=document.querySelector('#confirmeSenhaUsuariosSenhas').value
    const tipoUsuarioSelecionado=document.querySelector('#tipoUsuarioSelecionado').value

    let permiteConsulta
    let permiteImpressao
    let permiteDownRel
    let permiteGeraSenha
    let permiteAcesDocs
    let permiteAlteraConf

    if(tipoUsuarioSelecionado==1){
       permiteConsulta=true
       permiteImpressao=true
       permiteDownRel=true
       permiteGeraSenha=true
       permiteAcesDocs=true
       permiteAlteraConf=true
    }

    else if(tipoUsuarioSelecionado==3){
       permiteConsulta=false
       permiteImpressao=false
       permiteDownRel=false
       permiteGeraSenha=false
       permiteAcesDocs=false
       permiteAlteraConf=false
    }

    else if(tipoUsuarioSelecionado==2){
       permiteConsulta=document.querySelector('#permissaoConsulta').checked
       permiteImpressao=document.querySelector('#permissaoImpressaoCarta').checked
       permiteDownRel=document.querySelector('#permissaoDownloadRelatorios').checked
       permiteGeraSenha=document.querySelector('#permissaoGestaoSenhas').checked
       permiteAcesDocs=document.querySelector('#permissaoAcessoDocumentos').checked
       permiteAlteraConf=document.querySelector('#permissaoAlterarConfiguracoes').checked
      }

    if(
    cpfCadUsuario!=''&&
    nomeUsuariosSenhas!=''&&
    emailUsuariosSenhas!=''&&
    senhaUsuariosSenhas!=''&&
    confirmeSenhaUsuariosSenhas!=''&&
    tipoUsuarioSelecionado!=''&&
    senhaUsuariosSenhas==confirmeSenhaUsuariosSenhas){
      modalSalvarUsuario.innerHTML=`
      <div class="modal-dialog modal-dialog-centered">
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
      let request=new Request(`http://sismob.captatec.com.br/api/SMob_CadAcesso?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&nome=${nomeUsuariosSenhas}&cpf=${cpfCadUsuario}&email=${emailUsuariosSenhas}&perfilUsuCad=${tipoUsuarioSelecionado}&senha=${senhaUsuariosSenhas}&permiteConsulta=${permiteConsulta}&permiteImpressao=${permiteImpressao}&permiteDownRel=${permiteDownRel}&permiteGeraSenha=${permiteGeraSenha}&permiteAcesDocs=${permiteAcesDocs}&permiteAlteraConf=${permiteAlteraConf}
      `,{
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
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar o usuário!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              Por uma falha de conexão interna não conseguimos salvar o usuário, por favor, tente novamente!
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
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Usuário salvo!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="window.location.reload();"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              O usuário foi salvo com sucesso, e a senha já foi enviada ao seu email.
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
              Por uma falha de conexão interna não conseguimos salvar o usuário, por favor, tente novamente!
              <br>Detalhe do erro: ${err}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        `)
    }
}

//Exibe lista de usuários já cadastrados com botoes de editar ou excluir
function listaUsuarios(){
  

  const urlParams = new URLSearchParams(location.search)
    const codEmpresa=urlParams.get('codEmpresa')
    const perfilUsu=urlParams.get('perfilUsu')
    const codUsu=urlParams.get('codUsu')
    const codValida=urlParams.get('codValida')
    


    const usuariosTable=document.querySelector('#usuariosTable')
    const modaisExcluirUsuarios=document.querySelector('#modaisExcluirUsuarios')

    let request=new Request(`http://sismob.captatec.com.br/api/SMob_CadAcesso?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilusu=${perfilUsu}`)
    fetch(request)
    .then(response=>response.json().then(body=>{
      const codigo=(body).codigo
      const mensagem=(body).msg
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
                        <a href="http://sis.captatec.com.br/AdmEmpresa.aspx?codValida=${codValida}&codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}"
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="window.location.reload()">Recarregar</button>
                          </a>
                        </div>
                      </div>
                    </div>`
          myModal.show()
      }
      else{
      const dadosUsuarios=(body).usuarios
      dadosUsuarios.forEach(dadosUsuarios=>{
        let nomeUsuario=dadosUsuarios.nome
        let cpfUsuario=dadosUsuarios.cpf
        let emailUsuario=dadosUsuarios.email
        let codigoUsuario=dadosUsuarios.codUsuAcesso
        let perfilUsuCad=dadosUsuarios.perfilUsuCad
        let tipoUsuarioCad
        if(perfilUsuCad==1){
          tipoUsuarioCad='Administrador'
        }
        else if(perfilUsuCad==2){
          tipoUsuarioCad='Padrão'
        }
        else if(perfilUsuCad==3){
          tipoUsuarioCad='Motorista'
        }
        else{
          tipoUsuarioCad='Padrão'
        }

        let criarTBody=`
      <tr>
          <td>${nomeUsuario}</td>
          <td>${cpfUsuario}</td>
          <td>${emailUsuario}</td>
          <td>${tipoUsuarioCad}</td>
          <td style="text-align: center; padding-right:0">      
                    <button id="editar" class="btn btn-primary" style="height: 2em; width: 2em" onclick="recuperarRegistroUsuario(${codigoUsuario})"
                    ><i class="bx bx-edit-alt me-1" style="position: relative;
                    right: 0.5em;
                    bottom: 0.25em;"></i></button
                    >
          </td>
          <td style="text-align: center; padding-left:0.5em">          
                    <button data-bs-toggle="modal" data-bs-target="#b${codigoUsuario}" class="btn btn-danger" style="height: 2em; width: 2em"
                    ><i class="bx bx-trash me-1" style="position: relative;
                    right: 0.5em;
                    bottom: 0.25em;"></i></button
                    >
          </td>      
      </tr>
        `
        usuariosTable.insertAdjacentHTML('beforeend',criarTBody)

      let criarModais=`
      <div class="modal fade" id="b${codigoUsuario}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Tem certeza que deseja excluir o usuário abaixo?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div class="modal-body">
                    CPF: ${cpfUsuario}<br> Nome: ${nomeUsuario} <br> E-mail: ${emailUsuario} <br> Tipo: ${tipoUsuarioCad}
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" onclick="excluirUsuario(${codigoUsuario})" data-bs-toggle="modal" data-bs-target="#usuarioExcluido" >Excluir</button>
                  </div>

                </div>
              </div>
            </div>
      `
      modaisExcluirUsuarios.insertAdjacentHTML('beforeend',criarModais)
      }
      )
    }
    }))
}

//função para excluir usuarios
function excluirUsuario(codigoUsuario){
  const urlParams = new URLSearchParams(location.search)
    const codEmpresa=urlParams.get('codEmpresa')
    const perfilUsu=urlParams.get('perfilUsu')
    const codUsu=urlParams.get('codUsu')
    const usuario=document.querySelector('#usuarioCapta').value
    const codUsuAcesso=codigoUsuario

    let modalUsuarioExcluido=document.querySelector('#usuarioExcluido')
    modalUsuarioExcluido.innerHTML=`
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

    let request=new Request(`http://sismob.captatec.com.br/api/SMob_CadAcessoAcao?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codUsuAcesso=${codUsuAcesso}
    `,{
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
      <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível excluir o usuário!</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      <div class="mb-3">
        Por uma falha de conexão interna não conseguimos salvar o usuário, por favor, tente novamente!
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
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Usuário excluído!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="window.location.reload();"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              O usuário foi excluído com sucesso!
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
      <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível excluir o usuário!</h5>
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
function recuperarRegistroUsuario(codigoUsuario){
  const urlParams = new URLSearchParams(location.search)
    const codEmpresa=urlParams.get('codEmpresa')
    const perfilUsu=urlParams.get('perfilUsu')
    const codUsu=urlParams.get('codUsu')
    const codUsuAcesso=codigoUsuario
    var myModal = new bootstrap.Modal(document.getElementById('aguarde'))
    $('#editar').click(
      myModal.show()
    )
    var myCollapse = document.getElementById('tabelaUsuarios')
    var bsCollapse = new bootstrap.Collapse(myCollapse)

   
    document.querySelector('#senhasUsuario').innerHTML=`
    <!--checkbok alterar senha-->
    <div id="checkboxAlteraSenha">
    <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                            <i class="bx bx-check-shield"></i>
                      <input class="form-check-input" type="checkbox" id="alterarSenha" onchange="alterarSenha()" onclick="alterarSenha()"/>
                      <label class="form-check-label" for="flexSwitchCheckDefault"
                        >Alterar senha</label
                      >
                    </div>
                      </div>
    </div>                  
    <!--senha-->
                      <div class="mb-3">
                        <label class="form-label" for="basic-icon-default-senhaUS" id="labelSenha">Nova senha</label>
                        <div class="input-group input-group-merge">
                          <span id="senhaUsuariosSenhasSpan" class="input-group-text"
                            ><i class="bx bx-check-shield"></i
                          ></span>
                          <input
                            type="password"
                            id="senhaUsuariosSenhas"
                            class="form-control"
                            placeholder="Máx. 8 caract."
                            aria-label=""
                            aria-describedby="basic-icon-default-nome2"
                            maxlength="8"
                          />
                        </div>
                      </div>
                      <!--fim senha-->

                      <!--confirmação de senha-->
                      <div class="mb-3">
                        <label class="form-label" for="basic-icon-default-confirmeSenhalUS" id="labelConfirmeSenha">Confirme a nova senha </label>
                        <div class="input-group input-group-merge">
                          <span id="confirmeSenhaUsuariosSenhasSpan" class="input-group-text"
                            ><i class="bx bx-check-shield"></i
                          ></span>
                          <input
                            type="password"
                            id="confirmeSenhaUsuariosSenhas"
                            class="form-control"
                            placeholder="Máx. 8 caract."
                            aria-label=""
                            aria-describedby="basic-icon-default-nome2"
                            maxlength="8"
                          />
                        </div>
                      </div>
                     <!--fim confirmação de senha-->
    `
    
    document.querySelector('#tituloUsuariosEdicao').innerHTML='Edição'
    document.querySelector('#cpfMaskUsuariosSenhas').disabled=true

    document.querySelector('#senhaUsuariosSenhas').disabled=true
    document.querySelector('#confirmeSenhaUsuariosSenhas').disabled=true
    
    let request=new Request(`http://sismob.captatec.com.br/api/SMob_CadAcessoAcao?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&codUsuAcesso=${codUsuAcesso}`)
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
    let permiteConsulta=(body).permiteConsulta
    let permiteImpressao=(body).permiteImpressao
    let permiteDownRel=(body).permiteDownRel
    let permiteGeraSenha=(body).permiteGeraSenha
    let permiteAcesDocs=(body).permiteAcesDocs
    let permiteAlteraConf=(body).permiteAlteraConf
    permiteConsulta == true ? permiteConsulta='checked' :  permiteConsulta=''
    permiteImpressao == true ? permiteImpressao='checked' :  permiteImpressao=''
    permiteDownRel == true ? permiteDownRel='checked' :  permiteDownRel=''
    permiteGeraSenha == true ? permiteGeraSenha='checked' :  permiteGeraSenha=''
    permiteAcesDocs == true ? permiteAcesDocs='checked' :  permiteAcesDocs=''
    permiteAlteraConf == true ? permiteAlteraConf='checked' :  permiteAlteraConf=''
      document.querySelector('#cpfMaskUsuariosSenhas').value=(body).cpf

      document.querySelector('#cpfMaskUsuariosSenhas').value=='Não Cadastrado' ? document.querySelector('#cpfMaskUsuariosSenhas').disabled=false : document.querySelector('#cpfMaskUsuariosSenhas').disabled=true

      document.querySelector('#nomeUsuariosSenhas').value=(body).nome
      document.querySelector('#emailUsuariosSenhas').value=(body).email
      document.querySelector('#tipoUsuarioSelecionado').value=(body).perfilUsuCad
      document.querySelector('#senhaUsuariosSenhas').value=''
      document.querySelector('#confirmeSenhaUsuariosSenhas').value=''
      document.querySelector('#botaoSalvar').innerHTML=`
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#salvar" onclick="impedeEdicaoUsuario();confirmacaoNovaSenha();usuarioEditado(${codUsuAcesso})" style="
    width: 49%;">Confirmar alterações</button>
    <button type="button" class="btn btn-secondary" onclick="voltaParaInclusao()" style="
    width: 49%; float:right;">Cancelar</button>
    `
    if((body).perfilUsuCad==3){
      document.querySelector('#tipoUsuario').disabled=true
      document.querySelector('#tipoUsuario').innerHTML=`
      <option value="" >Selecione o tipo de usuário</option>
                        <option value="1">Administrador</option>
                        <option value="2">Padrão</option>
                        <option value="3" selected>Motorista</option>
      `
      document.querySelector('#permissoesPersonalizaveis').innerHTML=''
    }
    else if((body).perfilUsuCad==2){
      document.querySelector('#tipoUsuario').disabled=false
      document.querySelector('#tipoUsuario').innerHTML=`
      <option value="" >Selecione o tipo de usuário</option>
                        <option value="1">Administrador</option>
                        <option value="2" selected>Padrão</option>
      `
      document.querySelector('#permissoesPersonalizaveis').innerHTML=`
      <div class="col-xl">
                  <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <h5 class="mb-0">Gerencie as permissões</h5>
                    </div>
                    <div class="card-body">

                      <!--permissao Consultas-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-detail"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoConsulta" ${permiteConsulta} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Consultas</label>
                        </div>
                      </div>
                      <!--fim permissao consultas-->
                
                      <!--permissao impressoes cartas-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-note"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoImpressaoCarta" ${permiteImpressao} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Imprimir cartas</label>
                        </div>
                      </div>
                      <!--fim permissao impressoes cartas-->
                
                      <!--permissao download relatórios-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bxs-chart"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoDownloadRelatorios" ${permiteDownRel} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Download Relatórios</label>
                        </div>
                      </div>
                      <!--fim permissao download relatórios-->
                
                      <!--permissao gestaoSenhas-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-check-shield"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoGestaoSenhas" ${permiteGeraSenha} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Gestão de Senhas</label>
                        </div>
                      </div>
                      <!--fim permissao gestao senhas-->
                
                      <!--permissao acesso documentos-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-note"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoAcessoDocumentos" ${permiteAcesDocs} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Acesso a documentos</label>
                        </div>
                      </div>
                      <!--fim permissao acesso docuementos-->
                
                      <!--permissao alterar dados config-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-cog"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoAlterarConfiguracoes" ${permiteAlteraConf} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Alterar dados e configurações</label>
                        </div>
                      </div>
                      <!--fim permissao alterar dados config-->
                      <!--fim permissões-->
                    </div>
                  </div>
                </div>
      `
    }
    else if((body).perfilUsuCad==1){
      document.querySelector('#tipoUsuario').disabled=false
      document.querySelector('#tipoUsuario').innerHTML=`
      <option value="" >Selecione o tipo de usuário</option>
                        <option value="1" selected>Administrador</option>
                        <option value="2">Padrão</option>
      `
      document.querySelector('#permissoesPersonalizaveis').innerHTML=''
    }
    else if((body).perfilUsuCad==0){
      document.querySelector('#tipoUsuario').disabled=false
      document.querySelector('#tipoUsuario').innerHTML=`
      <option value="" >Selecione o tipo de usuário</option>
                        <option value="1">Administrador</option>
                        <option value="2" selected>Padrão</option>
      `
      document.querySelector('#permissoesPersonalizaveis').innerHTML=`
      <div class="col-xl">
                  <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <h5 class="mb-0">Gerencie as permissões</h5>
                    </div>
                    <div class="card-body">

                      <!--permissao Consultas-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-detail"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoConsulta" ${permiteConsulta} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Consultas</label>
                        </div>
                      </div>
                      <!--fim permissao consultas-->
                
                      <!--permissao impressoes cartas-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-note"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoImpressaoCarta" ${permiteImpressao} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Imprimir cartas</label>
                        </div>
                      </div>
                      <!--fim permissao impressoes cartas-->
                
                      <!--permissao download relatórios-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bxs-chart"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoDownloadRelatorios" ${permiteDownRel} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Download Relatórios</label>
                        </div>
                      </div>
                      <!--fim permissao download relatórios-->
                
                      <!--permissao gestaoSenhas-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-check-shield"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoGestaoSenhas" ${permiteGeraSenha} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Gestão de Senhas</label>
                        </div>
                      </div>
                      <!--fim permissao gestao senhas-->
                
                      <!--permissao acesso documentos-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-note"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoAcessoDocumentos" ${permiteAcesDocs} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Acesso a documentos</label>
                        </div>
                      </div>
                      <!--fim permissao acesso docuementos-->
                
                      <!--permissao alterar dados config-->
                      <div class="mb-3">
                        <div class="form-check form-switch mb-2">
                          <i class="bx bx-cog"></i>
                          <input class="form-check-input" type="checkbox" id="permissaoAlterarConfiguracoes" ${permiteAlteraConf} />
                          <label class="form-check-label" for="flexSwitchCheckDefault">Alterar dados e configurações</label>
                        </div>
                      </div>
                      <!--fim permissao alterar dados config-->
                      <!--fim permissões-->
                    </div>
                  </div>
                </div>
      `
    }
    bsCollapse.hide()
    myModal.hide()
    errosCss()
    document.querySelector('#senhaUsuariosSenhas').style.borderColor='#d9eed3'
    document.querySelector('#senhaUsuariosSenhasSpan').style.borderColor='#d9eed3'
    document.querySelector('#confirmeSenhaUsuariosSenhas').style.borderColor='#d9eed3'
    document.querySelector('#confirmeSenhaUsuariosSenhasSpan').style.borderColor='#d9eed3'
  }))
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
}

//Cancela a edição, voltando a página para preparar a inclusão
function voltaParaInclusao(){
  document.querySelector('#tituloUsuariosEdicao').innerHTML='Inclusão'
  document.querySelector('#checkboxAlteraSenha').innerHTML=''
document.querySelector('#cpfMaskUsuariosSenhas').value=''
document.querySelector('#cpfMaskUsuariosSenhas').disabled=false
document.querySelector('#nomeUsuariosSenhas').value=''
document.querySelector('#emailUsuariosSenhas').value=''
document.querySelector('#senhaUsuariosSenhas').value=''
document.querySelector('#labelSenha').innerHTML='Senha'
document.querySelector('#senhaUsuariosSenhas').disabled=false
document.querySelector('#confirmeSenhaUsuariosSenhas').value=''
document.querySelector('#labelConfirmeSenha').innerHTML='Confirme a senha'
document.querySelector('#confirmeSenhaUsuariosSenhas').disabled=false
document.querySelector('#tipoUsuarioSelecionado').value=''
document.querySelector('#tipoUsuario').innerHTML=`
                        <option value="" selected="">Selecione o tipo de usuário</option>
                        <option value="1">Administrador</option>
                        <option value="2">Padrão</option>
                        <option value="3">Motorista</option>                    
`
document.querySelector('#tipoUsuario').disabled=false
document.querySelector('#permissoesPersonalizaveis').innerHTML='' 
  
  document.querySelector('#botaoSalvar').innerHTML=`
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#salvar" onclick="impedeCadastroUsuario();usuarioCadastrado()" style="
                  width: 100%;">Salvar</button>
`
const cpfCadUsuario=document.querySelector('#cpfMaskUsuariosSenhas')
    const cpfCadUsuarioSpan=document.querySelector('#cpfMaskUsuariosSenhasSpan')
    const nomeUsuariosSenhas=document.querySelector('#nomeUsuariosSenhas')
    const nomeUsuariosSenhasSpan=document.querySelector('#nomeUsuariosSenhasSpan')
    const emailUsuariosSenhas=document.querySelector('#emailUsuariosSenhas')
    const emailUsuariosSenhasSpan=document.querySelector('#emailUsuariosSenhasSpan')
    const senhaUsuariosSenhas=document.querySelector('#senhaUsuariosSenhas')
    const senhaUsuariosSenhasSpan=document.querySelector('#senhaUsuariosSenhasSpan')
    const confirmeSenhaUsuariosSenhas=document.querySelector('#confirmeSenhaUsuariosSenhas')
    const confirmeSenhaUsuariosSenhasSpan=document.querySelector('#confirmeSenhaUsuariosSenhasSpan')
    const tipoUsuario=document.querySelector('#tipoUsuario')

    cpfCadUsuario.style.borderColor='#d9eed3'
    cpfCadUsuarioSpan.style.borderColor='#d9eed3'
    nomeUsuariosSenhas.style.borderColor='#d9eed3'
    nomeUsuariosSenhasSpan.style.borderColor='#d9eed3'
    emailUsuariosSenhas.style.borderColor='#d9eed3'
    emailUsuariosSenhasSpan.style.borderColor='#d9eed3'
    senhaUsuariosSenhas.style.borderColor='#d9eed3'
    senhaUsuariosSenhasSpan.style.borderColor='#d9eed3'
    confirmeSenhaUsuariosSenhas.style.borderColor='#d9eed3'
    confirmeSenhaUsuariosSenhasSpan.style.borderColor='#d9eed3'
    tipoUsuario.style.borderColor='#d9eed3'
}

//habilita alteração da senha na edição se estiver marcado evento onchange
function alterarSenha(){
  let checkbokAlterarSenha=document.querySelector('#alterarSenha')
    if(checkbokAlterarSenha.checked){
      document.querySelector('#senhaUsuariosSenhas').disabled=false
      document.querySelector('#confirmeSenhaUsuariosSenhas').disabled=false
    }
    else{
      document.querySelector('#senhaUsuariosSenhas').disabled=true
      document.querySelector('#confirmeSenhaUsuariosSenhas').disabled=true
    }
}

//validações para impedir edição de usuario
function impedeEdicaoUsuario(){
  const modalSalvarUsuario=document.querySelector('#salvar')
    const cpfCadUsuario=document.querySelector('#cpfMaskUsuariosSenhas')
    const nomeUsuariosSenhas=document.querySelector('#nomeUsuariosSenhas')
    const emailUsuariosSenhas=document.querySelector('#emailUsuariosSenhas')
    const tipoUsuarioSelecionado=document.querySelector('#tipoUsuarioSelecionado')
    if(cpfCadUsuario.value==''||nomeUsuariosSenhas.value==''||emailUsuariosSenhas.value==''||tipoUsuarioSelecionado.value==''||cpfCadUsuario.value=='Não Cadastrado'){
      
        modalSalvarUsuario.innerHTML=`<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível editar o usuário!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
             Preencha todos os campos para editar o usuário!
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    `
    errosCss()
    }
    errosCss()
}

//conferencia de novas senhas
function confirmacaoNovaSenha(){
  const modalSalvarUsuario=document.querySelector('#salvar')
    const senhaUsuariosSenhas=document.querySelector('#senhaUsuariosSenhas').value
    const confirmeSenhaUsuariosSenhas=document.querySelector('#confirmeSenhaUsuariosSenhas').value
    if(senhaUsuariosSenhas!=confirmeSenhaUsuariosSenhas){
      senhaUsuariosSenhas=''
      confirmeSenhaUsuariosSenhas=''
        modalSalvarUsuario.innerHTML=`
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível editar o usuário!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
             As senhas não conferem!
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
  `
  errosCss()
    }
}

//função que edita o usuário
function usuarioEditado(codUsuAcesso){
  const urlParams = new URLSearchParams(location.search)
  const codEmpresa=urlParams.get('codEmpresa')
  const perfilUsu=urlParams.get('perfilUsu')
  const codUsu=urlParams.get('codUsu')
  const usuario=document.querySelector('#usuarioCapta').value
  const cpfCadUsuario=document.querySelector('#cpfMaskUsuariosSenhas').value

    const modalSalvarUsuario=document.querySelector('#salvar')
    const nomeUsuariosSenhas=document.querySelector('#nomeUsuariosSenhas').value
    const emailUsuariosSenhas=document.querySelector('#emailUsuariosSenhas').value
    const senhaUsuariosSenhas=document.querySelector('#senhaUsuariosSenhas').value
    const confirmeSenhaUsuariosSenhas=document.querySelector('#confirmeSenhaUsuariosSenhas').value
    const tipoUsuarioSelecionado=document.querySelector('#tipoUsuarioSelecionado').value

    let permiteConsulta
    let permiteImpressao
    let permiteDownRel
    let permiteGeraSenha
    let permiteAcesDocs
    let permiteAlteraConf

    if(tipoUsuarioSelecionado==1){
       permiteConsulta=true
       permiteImpressao=true
       permiteDownRel=true
       permiteGeraSenha=true
       permiteAcesDocs=true
       permiteAlteraConf=true
    }

    else if(tipoUsuarioSelecionado==3){
       permiteConsulta=false
       permiteImpressao=false
       permiteDownRel=false
       permiteGeraSenha=false
       permiteAcesDocs=false
       permiteAlteraConf=false
    }

    else if(tipoUsuarioSelecionado==2){
       permiteConsulta=document.querySelector('#permissaoConsulta').checked
       permiteImpressao=document.querySelector('#permissaoImpressaoCarta').checked
       permiteDownRel=document.querySelector('#permissaoDownloadRelatorios').checked
       permiteGeraSenha=document.querySelector('#permissaoGestaoSenhas').checked
       permiteAcesDocs=document.querySelector('#permissaoAcessoDocumentos').checked
       permiteAlteraConf=document.querySelector('#permissaoAlterarConfiguracoes').checked
      }

    if(
    nomeUsuariosSenhas!=''&&
    emailUsuariosSenhas!=''&&
    tipoUsuarioSelecionado!=''&&
    cpfCadUsuario!='Não Cadastrado'&&
    senhaUsuariosSenhas==confirmeSenhaUsuariosSenhas &&
    senhaUsuariosSenhas!=''){
      modalSalvarUsuario.innerHTML=`
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" id="modalAguarde">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Aguarde enquanto salvamos as alterações e enviamos a nova senha ao usuário...</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
            <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            </div>
          </div>
        </div>
      </div>
      `
      let request=new Request(`http://sismob.captatec.com.br/api/SMob_CadAcesso?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&nome=${nomeUsuariosSenhas}&cpf=${cpfCadUsuario}&email=${emailUsuariosSenhas}&senha=${senhaUsuariosSenhas}&alteraSenha=true&codUsuAcesso=${codUsuAcesso}&perfilUsuCad=${tipoUsuarioSelecionado}&permiteConsulta=${permiteConsulta}&permiteImpressao=${permiteImpressao}&permiteDownRel=${permiteDownRel}&permiteGeraSenha=${permiteGeraSenha}&permiteAcesDocs=${permiteAcesDocs}&permiteAlteraConf=${permiteAlteraConf}
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
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar o usuário!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              Por uma falha de conexão interna não conseguimos realizar as alterações, por favor, tente novamente!
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
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Edições e nova senha salvas!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="window.location.reload();"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              As alterações foram salvas com sucesso e a nova senha já foi enviada ao e-mail do usuário!
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
    }
    else if(nomeUsuariosSenhas!=''&&
    cpfCadUsuario!='Não Cadastrado'&&
    emailUsuariosSenhas!=''&&
    tipoUsuarioSelecionado!=''&&
    senhaUsuariosSenhas==confirmeSenhaUsuariosSenhas &&
    senhaUsuariosSenhas==''){
      modalSalvarUsuario.innerHTML=`
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" id="modalAguarde">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Aguarde enquanto salvamos as alterações...</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
            <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            </div>
          </div>
        </div>
      </div>
      `
      let request=new Request(`http://sismob.captatec.com.br/api/SMob_CadAcesso?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&nome=${nomeUsuariosSenhas}&cpf=${cpfCadUsuario}&email=${emailUsuariosSenhas}&senha=naoAlterada&alteraSenha=false&codUsuAcesso=${codUsuAcesso}&perfilUsuCad=${tipoUsuarioSelecionado}&permiteConsulta=${permiteConsulta}&permiteImpressao=${permiteImpressao}&permiteDownRel=${permiteDownRel}&permiteGeraSenha=${permiteGeraSenha}&permiteAcesDocs=${permiteAcesDocs}&permiteAlteraConf=${permiteAlteraConf}
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
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar o usuário!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              Por uma falha de conexão interna não conseguimos realizar as alterações, por favor, tente novamente!
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
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Alterações salvas!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="window.location.reload();"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              As alterações foram salvas com sucesso!
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
    }
}

function errosCss(){
    const cpfCadUsuario=document.querySelector('#cpfMaskUsuariosSenhas')
    const cpfCadUsuarioSpan=document.querySelector('#cpfMaskUsuariosSenhasSpan')
    const nomeUsuariosSenhas=document.querySelector('#nomeUsuariosSenhas')
    const nomeUsuariosSenhasSpan=document.querySelector('#nomeUsuariosSenhasSpan')
    const emailUsuariosSenhas=document.querySelector('#emailUsuariosSenhas')
    const emailUsuariosSenhasSpan=document.querySelector('#emailUsuariosSenhasSpan')
    const senhaUsuariosSenhas=document.querySelector('#senhaUsuariosSenhas')
    const senhaUsuariosSenhasSpan=document.querySelector('#senhaUsuariosSenhasSpan')
    const confirmeSenhaUsuariosSenhas=document.querySelector('#confirmeSenhaUsuariosSenhas')
    const confirmeSenhaUsuariosSenhasSpan=document.querySelector('#confirmeSenhaUsuariosSenhasSpan')
    const tipoUsuarioSelecionado=document.querySelector('#tipoUsuarioSelecionado')
    const tipoUsuario=document.querySelector('#tipoUsuario')

  if(tipoUsuarioSelecionado.value==''){
    tipoUsuario.style.borderColor='#FF0000'
  }
  else{
    tipoUsuario.style.borderColor='#d9dee3'
  }

  if(cpfCadUsuario.value==''||cpfCadUsuario.value=='Não Cadastrado'){
    cpfCadUsuario.style.borderColor='#FF0000'
    cpfCadUsuarioSpan.style.borderColor='#FF0000'
  }
  else{
    cpfCadUsuario.style.borderColor='#d9dee3'
    cpfCadUsuarioSpan.style.borderColor='#d9dee3'
  }

  if(nomeUsuariosSenhas.value==''){
    nomeUsuariosSenhas.style.borderColor='#FF0000'
    nomeUsuariosSenhasSpan.style.borderColor='#FF0000'
  }
  else{
    nomeUsuariosSenhas.style.borderColor='#d9dee3'
    nomeUsuariosSenhasSpan.style.borderColor='#d9dee3'
  }


  if(emailUsuariosSenhas.value==''){
    emailUsuariosSenhas.style.borderColor='#FF0000'
    emailUsuariosSenhasSpan.style.borderColor='#FF0000'
  }
  else{
    emailUsuariosSenhas.style.borderColor='#d9dee3'
    emailUsuariosSenhasSpan.style.borderColor='#d9dee3'
  }

  if(senhaUsuariosSenhas.value==''&&senhaUsuariosSenhas.disabled==false){
    senhaUsuariosSenhas.style.borderColor='#FF0000'
    senhaUsuariosSenhasSpan.style.borderColor='#FF0000'
  }
  else{
    senhaUsuariosSenhas.style.borderColor='#d9dee3'
    senhaUsuariosSenhasSpan.style.borderColor='#d9dee3'
  }

  if(confirmeSenhaUsuariosSenhas.value==''&&confirmeSenhaUsuariosSenhas.disabled==false){
    confirmeSenhaUsuariosSenhas.style.borderColor='#FF0000'
    confirmeSenhaUsuariosSenhasSpan.style.borderColor='#FF0000'
  }
  else{
    confirmeSenhaUsuariosSenhas.style.borderColor='#d9dee3'
    confirmeSenhaUsuariosSenhasSpan.style.borderColor='#d9dee3'
  }
}