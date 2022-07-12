var modalErros=document.querySelector('#erros')

//download qr code
function downloadQrCode() {
  html2canvas(document.querySelector("#pdfQrCode"), {scale: 2}).then(canvas => {
    canvas.toBlob(function(blob) {
      window.saveAs(blob, 'QR_code_veiculo.jpeg');
    });
    });
}


//download all qr codes
function downloadAllQrCodes(){
  html2canvas(document.querySelector("#allQrCodes"), {scale: 4}).then(canvas => {
    canvas.toBlob(function(blob) {
      window.saveAs(blob, 'QR_code_veiculos.jpeg');
    });
    });
}

$( "#downloadQr2" ).on( "click", function() {
  html2canvas(document.querySelector("#pdfQrCode2"), {scale: 2}).then(canvas => {
    canvas.toBlob(function(blob) {
      window.saveAs(blob, 'QR_code_veiculo.jpeg');
    });
    });
});

//filtros na tabela
$(document).ready(function() {
  $("#gfg").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#veiculosFretamentoTable tr").filter(function() {
          $(this).toggle($(this).text()
          .toLowerCase().indexOf(value) > -1)
      });
  });
});

//searchable select
let selectBoxElementTiposV=document.querySelector('#tipoVeiculo')
dselect(selectBoxElementTiposV,{
  search:false
})

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
          listaDadosVeiculosFretamento()
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
              console.log(err, 'erro na validacao')
    myModal.show()
  
})
}

//modifica os atributos do select ao selecionar outro
function atualizouAtributos(){
    let tipoVeiculoSelect=document.getElementById('tipoVeiculo')
    let valorTipoVeiculoSelected=tipoVeiculoSelect.options[tipoVeiculoSelect.selectedIndex]
    document.getElementById('tipoVeiculoSelecionado').value=valorTipoVeiculoSelected.value
}

//lista os dados dos veiculos ja cadastrados
function listaDadosVeiculosFretamento(){
  
  
  const urlParams = new URLSearchParams(location.search)
    const codEmpresa=urlParams.get('codEmpresa')
    const perfilUsu=urlParams.get('perfilUsu')
    const codUsu=urlParams.get('codUsu')
    const codValida=urlParams.get('codValida')
    const modaisExcluirVeiculos=document.querySelector('#modaisExcluirVeiculos')

    let request=new Request(`http://sismob.captatec.com.br/api/SMob_FretaCadVeiculo?codEmpresa=${codEmpresa}&codUsu=${codUsu}&perfilUsu=${perfilUsu}`)
    fetch(request)
    .then(response=>response.json().then(body=>{
      const codigo=(body).codigo
      const mensagem=(body).msg
      const empresa=(body).empresa
      const usuario=document.querySelector('#usuarioCapta').value
      if(codigo==0&&mensagem!='Não existem veículos de fretamento cadastrados.'){
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
                        <a href=""index.html?codEmpresa=${codEmpresa}&codValida=${codValida}&perfilUsu=${perfilUsu}&codUsu=${codUsu}&usuario=${usuario}"
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Recarregar</button>
                        </a>
                        </div>
                      </div>
                    </div>`
          myModal.show()
      }
      else if(codigo==0&&mensagem=='Não existem veículos de fretamento cadastrados.'){
        document.querySelector('#tituloVeiculosCollapse').innerHTML=`
        <button type="button" class="btn btn-outline-primary accordion-button collapsed" data-bs-toggle="collapse" aria-expanded="true" aria-controls="collapseOne">
                  Ainda não há veículos cadastrados nessa empresa!
        </button>
        `
      }
      else{
      const veiculosFretamento=(body).veiculos
      veiculosFretamento.forEach(veiculosFretamento=>{
        const veiculosFretamentoTable=document.querySelector('#veiculosFretamentoTable')

        let codVeiculoSis=veiculosFretamento.codVeiculoSis
        let qrCode=veiculosFretamento.qRCode
        let codVeiculo=veiculosFretamento.codVeiculo.toUpperCase()
        let tituloQr=`${codVeiculo} <br> ${empresa} <br> Código: ${qrCode}`
        let modelo=veiculosFretamento.modelo
        let tipoTransporte=veiculosFretamento.tipoTransporte
        let marca=veiculosFretamento.marca.toUpperCase()
        let capacidade=veiculosFretamento.capacidade
        let consumo=veiculosFretamento.consumo

        let criarTBody=`
      <tr>
          <td>${codVeiculo}</td>
          <td>${marca}</td>
          <td>${modelo}</td>
          <td>${tipoTransporte}</td>
          <td>${capacidade}</td>
          <td>${consumo}km/L</td>
          <td style="text-align: center; padding-right:0">      
                    <button class="btn btn-primary" style="height: 2em; width: 2em" onclick="verQrCode('${qrCode}', '${tituloQr}')" data-bs-toggle="modal" data-bs-target="#verQrCode""
                    ><i class="bx bx-qr" style="position: relative;
                    right: 0.5em;
                    bottom: 0.25em;"></i></button
                    >
          </td>
          <td style="text-align: center; padding-left:0.5em">          
                    <button data-bs-toggle="modal" data-bs-target="#b${codVeiculoSis}" class="btn btn-danger" style="height: 2em; width: 2em"
                    ><i class="bx bx-trash me-1" style="position: relative;
                    right: 0.5em;
                    bottom: 0.25em;"></i></button
                    >
          </td>      
      </tr>
        `
        veiculosFretamentoTable.insertAdjacentHTML('beforeend',criarTBody)

      let criarModais=`
      <div class="modal fade" id="b${codVeiculoSis}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Tem certeza que deseja excluir o veículo abaixo?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div class="modal-body">
                    Código: ${codVeiculo}<br> Marca: ${marca} <br> Ano: ${modelo} <br> Capacidade: ${capacidade}
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" onclick="excluirVeiculo(${codVeiculoSis})" data-bs-toggle="modal" data-bs-target="#veiculoExcluido" >Excluir</button>
                  </div>

                </div>
              </div>
            </div>
      `
      modaisExcluirVeiculos.insertAdjacentHTML('beforeend',criarModais)

      let criarAllQrCodes=`
      <div class="col">
        <div style="text-align: center; font-size: 0.45em">${tituloQr}</div>
        <div id="c${qrCode}" style="text-align: center; margin-bottom: 1.2em">
        
        </div>
      </div>
      `
      let allQrCodes=document.querySelector('#allQrCodes')
      allQrCodes.insertAdjacentHTML('beforeend', criarAllQrCodes)
      generateQrCodes(qrCode)
      /*fim do forEach dos veiculos*/}) 
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
                console.log(err, 'erro na lista dados')
      myModal.show()
    
  })
    )}

//gera QrCode
function gerarQrCode(qrCode, tituloQr){
  // Clear Previous QR Code
  $('#qrCodeImg').empty();

  // Clear Previous title QR Code
  document.querySelector('#tituloQrCode').innerHTML=``

  //insere titulo no qrCode
  document.querySelector('#tituloQrCode').innerHTML=`<h5 style="text-align: center">${tituloQr}</h5>`
  
  // Generate and Output QR Code
  $('#qrCodeImg').qrcode({width: '228',height: '228',text: qrCode});
  $('#qrCodeImgVer').qrcode({width: '228',height: '228',text: qrCode});

}

//gerar todos os qr codes
function generateQrCodes(qrCode){
  $('#c'+qrCode).qrcode({width: '58',height: '58',text: qrCode});
}

//visualiza qr code
function verQrCode(qrCode, tituloQr){
    // Clear Previous QR Code
  $('#qrCodeImgVer').empty();

  // Clear Previous title QR Code
  document.querySelector('#tituloQrCode2').innerHTML=``

  //insere titulo no qrCode
  document.querySelector('#tituloQrCode2').innerHTML=`<h5 style="text-align: center">${tituloQr}</h5>`
    
  // Generate and Output QR Code
  $('#qrCodeImgVer').qrcode({width: '228',height: '228',text: qrCode});
}

//verifica se todos os campos estão preenchidos no cadastro do veiculo
function impedeCadastroVeiculo(){
    const modalSalvarVeiculo=document.querySelector('#salvar')
    const codigoVeiculo=document.querySelector('#codigoVeiculo')
    const marcaVeiculo=document.querySelector('#marcaVeiculo')
    const modeloVeiculo=document.querySelector('#modeloVeiculo')
    const tipoVeiculo=document.querySelector('#tipoVeiculoSelecionado')
    const capacidadeVeiculo=document.querySelector('#capacidadeVeiculo')
    const consumoVeiculo=document.querySelector('#consumoVeiculo')
    if(codigoVeiculo.value==''||marcaVeiculo.value==''||modeloVeiculo.value==''||tipoVeiculo.value==''||capacidadeVeiculo.value==''||consumoVeiculo.value==''||consumoVeiculo.value<5||consumoVeiculo.value>20||capacidadeVeiculo.value==0||capacidadeVeiculo.value>50||capacidadeVeiculo.value<7||consumoVeiculo.value==0||modeloVeiculo.value<2000||modeloVeiculo.value>2024){

        modalSalvarVeiculo.innerHTML=`<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar o veículo!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
            Certifique-se de inserir valores válidos, e preencher todos os campos!
            <strong>Capacidade:</strong> entre 7 e 50<br>
            <strong>Consumo médio:</strong> entre 5km/L e 20km/L<br>
            <strong>Ano:</strong> entre 2000 e 2023
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
    
}

//Exibe mensagem de veiculo cadastrado, gera qrCode
function veiculoCadastrado(){
  const urlParams = new URLSearchParams(location.search)
    const codEmpresa=urlParams.get('codEmpresa')
    const perfilUsu=urlParams.get('perfilUsu')
    const codUsu=urlParams.get('codUsu')
    const usuario=document.querySelector('#usuarioCapta').value
    const empresa=document.querySelector('#empresaHidden').value
    

    const modalSalvarVeiculo=document.querySelector('#salvar')
    const codigoVeiculo=document.querySelector('#codigoVeiculo').value
    const marcaVeiculo=document.querySelector('#marcaVeiculo').value
    const modeloVeiculo=document.querySelector('#modeloVeiculo').value
    const tipoVeiculo=document.querySelector('#tipoVeiculoSelecionado').value
    const capacidadeVeiculo=document.querySelector('#capacidadeVeiculo').value
    const consumoVeiculo=document.querySelector('#consumoVeiculo').value
    if(
        codigoVeiculo!=''&&
        marcaVeiculo!=''&&
        modeloVeiculo!=''&&
        tipoVeiculo!=''&&
        capacidadeVeiculo!=''&&
        consumoVeiculo!=''&&
        consumoVeiculo!=0&&
        capacidadeVeiculo!=0&&
        modeloVeiculo>=2000&&
        modeloVeiculo<=2024&&
        capacidadeVeiculo>=7&&
        capacidadeVeiculo<=50&&
        consumoVeiculo>=5&&
        consumoVeiculo<=20
        ){
            modalSalvarVeiculo.innerHTML=`<div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" id="modalAguarde">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">
                    Aguarde enquanto salvamos o veículo<br><div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div><br>
                  <div id="tituloQrCode">
                  </div>
                </h5>
              </div>
              <div class="modal-body">

                <!--Imagem do qr code-->
                <div class="mb-3">
                    <div id="qrCodeImg">
                        
                    </div>
                  </div>
                  <!--fim Imagem do qr code-->
              </div>
            </div>
          </div>
            `
       let request=new Request(`http://sismob.captatec.com.br/api/SMob_FretaCadVeiculo?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codVeiculo=${codigoVeiculo}&marca=${marcaVeiculo}&modelo=${modeloVeiculo}&tipoTransp=${tipoVeiculo}&capacidade=${capacidadeVeiculo}&consumo=${consumoVeiculo}&codEmpresa=${codEmpresa}`,{
        method:'POST'
       })
       fetch(request)
       .then(response=>response.json().then(body=>{
        let codigo=(body).codigo
        let mensagem=(body).msg
        let modalAguarde=document.querySelector('#modalAguarde')
        let qrCode=(body).qRCode
        let tituloQr=`${codigoVeiculo} <br> ${empresa} <br> Código: ${qrCode}`
        if(codigo==0){
          modalAguarde.innerHTML=`
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível salvar o veículo!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              Não conseguimos salvar o veículo, por favor, tente novamente!
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
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Veículo salvo!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="window.location.reload();"></button>
          </div>
          <div class="modal-body" id="pdfQrCode">
                    <div id="tituloQrCode"></div><br>
                    <!--Imagem do qr code-->
                    <div class="mb-3">
                        <div id="qrCodeImg">
                            <!--inserido via javascript-->
                        </div>
                      </div>
                      <!--fim Imagem do qr code-->

                  </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-primary" onclick="downloadQrCode()">Download QR Code</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="window.location.reload();">Fechar</button>
            
          </div>
        `
        gerarQrCode(qrCode,tituloQr)
        }
      }))
        .catch(err=>{
          let modalAguarde=document.querySelector('#modalAguarde')
          modalAguarde.innerHTML=`
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
        `})
        errosCss()
    }
    errosCss()
}

    //função para excluir veiculos
    function excluirVeiculo(codVeiculoSis){
      const urlParams = new URLSearchParams(location.search)
    const perfilUsu=urlParams.get('perfilUsu')
    const codUsu=urlParams.get('codUsu')
    const usuario=document.querySelector('#usuarioCapta').value
    const codEmpresa=urlParams.get('codEmpresa')

    let modalVeiculoExcluido=document.querySelector('#veiculoExcluido')
    modalVeiculoExcluido.innerHTML=`
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" id="modalAguardeExclusao">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Aguarde enquanto excluímos o veículo...</h5>
          </div>
          <div class="modal-body">
            <div class="mb-3">
            <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            </div>
          </div>
        </div>
      </div>
    `

    let request=new Request(`http://sismob.captatec.com.br/api/SMob_FretaCadVeiculoAcao?codUsu=${codUsu}&perfilUsu=${perfilUsu}&usuario=${usuario}&codVeiculoSis=${codVeiculoSis}&codEmpresa=${codEmpresa}`,{
      method:'POST'
    })
    fetch(request)
    .then(response=>response.json().then(body=>{
      let codigo=(body).codigo
      let mensagem=(body).msg
      let modalVeiculoExclusao=document.querySelector('#modalAguardeExclusao')
      if(codigo==0){
        modalVeiculoExclusao.innerHTML=`
      <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Não foi possível excluir o veículo.</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
      <div class="mb-3">
        Não conseguimos excluir o veículo, por favor, tente novamente!
        <br>Detalhe do erro: ${mensagem}
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
    </div>
      `
      } else{
        modalVeiculoExclusao.innerHTML=`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="text-align: left !important; margin-top: 10px; margin-left: 20px; font-weight: bold; font-size: 20px !important;">Veículo excluído!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="window.location.reload();"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              O veículo foi excluído com sucesso!
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="window.location.reload();">Fechar</button>
          </div>
          `
      }
    }))
    .catch(err=>document.querySelector('#modalAguardeExclusao').innerHTML=`
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

function errosCss(){
  const tipoVeiculoSelecionado=document.querySelector('#tipoVeiculoSelecionado')
  const tipoVeiculo=document.querySelector('div.veiculo button.form-select')
  const capacidadeVeiculo=document.querySelector('#capacidadeVeiculo')
  const capacidadeVeiculoSpan=document.querySelector('#capacidadeVeiculoSpan')
  const consumoVeiculo=document.querySelector('#consumoVeiculo')
  const consumoVeiculoSpan=document.querySelector('#consumoVeiculoSpan')
  const marcaVeiculo=document.querySelector('#marcaVeiculo')
  const marcaVeiculoSpan=document.querySelector('#marcaVeiculoSpan')
  const codigoVeiculo=document.querySelector('#codigoVeiculo')
  const codigoVeiculoSpan=document.querySelector('#codigoVeiculoSpan')
  const anoVeiculo=document.querySelector('#modeloVeiculo')
  const anoVeiculoSpan=document.querySelector('#modeloVeiculoSpan')


  if(tipoVeiculoSelecionado.value==''){
    tipoVeiculo.style.borderColor='#FF0000'
  }
  else{
    tipoVeiculo.style.borderColor='#d9dee3'
  }

  if(capacidadeVeiculo.value==''||capacidadeVeiculo.value==0||capacidadeVeiculo.value<7||capacidadeVeiculo.value>50){
    capacidadeVeiculo.style.borderColor='#FF0000'
    capacidadeVeiculoSpan.style.borderColor='#FF0000'
  }
  else{
    capacidadeVeiculo.style.borderColor='#d9dee3'
    capacidadeVeiculoSpan.style.borderColor='#d9dee3'
  }

  if(consumoVeiculo.value==''||consumoVeiculo.value==0||consumoVeiculo.value<5||consumoVeiculo.value>20){
    consumoVeiculo.style.borderColor='#FF0000'
    consumoVeiculoSpan.style.borderColor='#FF0000'
  }
  else{
    consumoVeiculo.style.borderColor='#d9dee3'
    consumoVeiculoSpan.style.borderColor='#d9dee3'
  }


  if(marcaVeiculo.value==''){
    marcaVeiculo.style.borderColor='#FF0000'
    marcaVeiculoSpan.style.borderColor='#FF0000'
  }
  else{
    marcaVeiculo.style.borderColor='#d9dee3'
    marcaVeiculoSpan.style.borderColor='#d9dee3'
  }

  if(codigoVeiculo.value==''){
    codigoVeiculo.style.borderColor='#FF0000'
    codigoVeiculoSpan.style.borderColor='#FF0000'
  }
  else{
    codigoVeiculo.style.borderColor='#d9dee3'
    codigoVeiculoSpan.style.borderColor='#d9dee3'
  }

  if(anoVeiculo.value==''||anoVeiculo.value<2000||anoVeiculo.value>2024){
    anoVeiculo.style.borderColor='#FF0000'
    anoVeiculoSpan.style.borderColor='#FF0000'
  }
  else{
    anoVeiculo.style.borderColor='#d9dee3'
    anoVeiculoSpan.style.borderColor='#d9dee3'
  }
}