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
          <input type="hidden" id="usuarioCapta" value="${usuario}">
          <input type="hidden" id="empresa" value=${empresa}>
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
          montarIndex()
          relogio()
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

function montarIndex(){
  const urlParams = new URLSearchParams(location.search)
  const codEmpresa=urlParams.get('codEmpresa')
  const codValida=urlParams.get('codValida')
  const perfilUsu=urlParams.get('perfilUsu')
  const codUsu=urlParams.get('codUsu')

  const index=document.querySelector('#montarPagina')
  const usuario=document.querySelector('#usuarioCapta').value
  const empresa=document.querySelector('#empresa').value

  index.innerHTML=`<h4 class="fw-bold py-3 mb-4" style="font-size:2rem;"><span class="text-muted fw-light" id="saudacao"></span> ${usuario}!</h4>

  <div class="row mb-5">
    <div class="col-md">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img class="card-img card-img-left" src="./images/busGif.gif" alt="Card image">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Você está acessando a empresa ${empresa}</h5>
              <p class="card-text">
                Seja bem vindo(a) ao sistema de fretamento!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <h4 class="card-title" style="font-size: 2rem;" id="hora"></h4>
              <p class="card-text">
                Aqui você poderá cadastrar, editar, ver e excluir usuários, veículos,e linhas da empresa acessada!
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <img class="card-img card-img-right" src="./images/empresa.png" alt="Card image">
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <h5 class="pb-1 mb-4">O que você deseja fazer?</h5>
              <div class="row mb-5">
                <div class="col-md-6 col-lg-4">
                  <div class="card text-center mb-3">
                    <div class="card-body">
                      <h5 class="card-title">Linhas</h5>
                      <p class="card-text">Acesse aqui as linhas de fretamento da ${empresa}</p>
                      <a href="linhasFretamento.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}" class="btn btn-primary">Linhas</a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4">
                  <div class="card text-center mb-3">
                    <div class="card-body">
                      <h5 class="card-title">Veículos</h5>
                      <p class="card-text">Acesse aqui os veículos de fretamento da ${empresa}</p>
                      <a href="veiculosFretamento.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}" class="btn btn-primary">Veículos</a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4">
                  <div class="card text-center mb-3">
                    <div class="card-body">
                      <h5 class="card-title">Usuários</h5>
                      <p class="card-text">Acesse aqui os usuários cadastrados da ${empresa}</p>
                      <a href="usuariosSenhas.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}" class="btn btn-primary">Usuários</a>
                    </div>
                  </div>
                </div>
              </div>
  `
}

 function relogio(){
  setInterval(()=>{
  let novaHora = new Date();
  let hora = novaHora.getHours();
  if(hora>=6&&hora<=12){
    document.querySelector('#saudacao').textContent='Bom dia,'
  }
  else if(hora>=13&&hora<=17){
    document.querySelector('#saudacao').textContent='Boa tarde,'
  }
  else{
    document.querySelector('#saudacao').textContent='Boa noite,'
  }
  let minuto = novaHora.getMinutes();
  let segundo = novaHora.getSeconds();
  minuto = zero(minuto);
  segundo = zero(segundo);
  document.getElementById('hora').textContent = hora+':'+minuto+':'+segundo;
},100)
 }

function zero(x) {
  if (x < 10) {
      x = '0' + x;
  } return x;
}