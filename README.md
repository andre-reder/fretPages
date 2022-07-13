# fretPages
That's a project I'm developing, currently being written in VanillaJS, but I'm studying React and will rewrite it, there are also some libs being used. It consists in a CRUD of users, vehicles and routes of private transport from home to job, with some cool features like maps and QR Code generator.

Este projeto consiste em um CRUD de veículos e linhas de fretamento para empresas, e de usuários com acesso ao sistema. Feito em VanillaJS, com utilização do Bootstrap, tornando-o assim responsivo. O menu principal possui um relógio, saudação com base na hora atual, informação da empresa que está acessando o sistema, e atalhos para as demais páginas.

A renderização das páginas depende da integração com as API's próprias da empresa, portanto não é possível acessar uma live demo. Logo abaixo haverá um vídeo do sistema em funcionamento

A navegação entre as páginas é feita pelo menu lateral. Abrindo o collapse de fretamento é possível observar as opções de linhas e veículos, e logo abaixo a opção de usuários e senhas.

Todas as páginas possuem a lista dos itens já cadastrados, com a opção de pesquisar para maior facilidade de encontrar o item específico desejado através de qualquer campo da lista. Todas as páginas também possuem validações para impedir o cadastro de dados inválidos, caso um dado inválido seja inserido, o campo ficará vermelho e uma mensagem de aviso será exibida.

Na página de veículos é possível cadastrar veículos, que possuem um código único que é impresso em um QR code, com a opção de baixar esse qrCode em formato jpg, os campos de cadastro de veículos contém validações para impedir que algum dado incorreto seja cadastrado.

Na página de linhas é possível cadastrar, editar alguns dados de linhas já existentes, excluir linhas já cadastradas, e visualizar os mapas de cada uma delas, que contém o trajeto e o endereço dos funcionários que as utilizam. Clicando em cada ícone de funcionário no mapa, detalhes do mesmo são exibidos (nome e matrícula). No cadastro e edição das linhas, as tags select possuem também a opção de pesquisa para maior facilidade de encontrar o dado correto.

Na página de usuários é possível cadastrar, editar e excluir funcionários. Na edição é possível alterar a senha do mesmo, caso seja solicitado.

https://user-images.githubusercontent.com/105744180/178622586-81a7091e-3800-4624-8c75-c3a0e4213e84.mp4
