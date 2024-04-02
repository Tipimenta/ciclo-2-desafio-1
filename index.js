const btnPlus = document.querySelectorAll(".plus");
const contador = document.querySelectorAll(".contador");
const pedidos = document.querySelector(".inicio-pedidos");
const totalPedidos = document.querySelector(".valor-total");
const falaGarcom = document.querySelector("#balaoGarcom");
const falaPessoas = document.querySelector("#balaoPessoa");
const garcom = document.querySelector("#img-garcom");
const pessoas = document.querySelector("#img-pessoas");
const boaNoiteGarcom = document.querySelector("#texto-boa-noite-garcom");
const boaNoitePessoas = document.querySelector("#texto-boa-noite-pessoas");
const pergunta = document.querySelector("#mesa-pessoas");
const respostaPessoas = document.querySelector("#resposta-pessoas");
const btnEnviar = document.querySelector(".enviarResposta");
const menu = document.querySelector("#menu-boteco");
const criarBtnPagamento = document.querySelector(".btnpagamento");
const finazarPagamento = document.querySelector(".btnpagamento");
const pagamentos = document.querySelector("#pagamentos");
const conversa = document.querySelector(".conversa");
const pagAtivo = document.querySelectorAll(".pgAtivos");
const btnPagar = document.querySelector("#pagar");

const btnpg = document.createElement("button");
const verConta = document.createElement("div");
const formasPagamento = document.createElement("div");
const metodos = document.createElement("li");

let pedido = []; 
let subtotal = 0;
let totalPedido = 0;
let quantidadePessoas = 0;
let gorgeta = 0;
let clienteAtivo = 0; 

btnpg.innerHTML = `Fechar a conta`;
btnpg.style.display = "none";
btnpg.setAttribute("class", "btnpagamentos");
criarBtnPagamento.appendChild(btnpg);
finazarPagamento.addEventListener("click", pagamentosClientes);
btnEnviar.addEventListener("click", numeroPessoas);



function pagamentosClientes() {
  conversa.style.display = "none";
  finazarPagamento.removeEventListener("click", pagamentosClientes);
  btnPlus.forEach((btn) => {
    btn.removeEventListener("click", qntPedido);
  });
  

  for (let i = 0; i < quantidadePessoas; i++) {
    const clientes = document.createElement("ul");
    clientes.setAttribute("class", "pgAtivos");
    clientes.innerHTML = `<li><img class="img-clientes" src="./img/cliente.png" /></li>`;
    pagamentos.appendChild(clientes);
  }

  formasPagamento.setAttribute("id", "formasPagamento");
  formasPagamento.setAttribute("class", "inativo");

  metodos.innerHTML = `<img id="forma" class="pix" src="./img/pix.png" alt"pix">
  <img id="forma" class="dinheiro" src="./img/dinheiro.png" alt"dinheiro">
  <img id="forma" class="cartao" src="./img/cartao.png" alt"cartao"><button id="pagar" class="ativo">Pagar</button>`;

  escolhaPagamento();
}

function escolhaPagamento() {
  const pagAtivo = document.querySelectorAll(".pgAtivos");


  function atualizarExibicao() {
    for (let i = 0; i < pagAtivo.length; i++) {
      if (i === clienteAtivo) {
        pagAtivo[clienteAtivo].style.height = "220px";
        pagAtivo[clienteAtivo].style.width = "220px";
        pagAtivo[i].style.backgroundColor = "rgb(143, 91, 91)";
        metodos.setAttribute("class", "pagAtivos");
        pagAtivo[i].appendChild(metodos);
      } else {
        pagAtivo[i].style.backgroundColor = "rgb(116, 137, 196)";
      }

      function pix() {
        verConta.setAttribute("class", "verConta");
        let valorGorjeta = 0;
        verConta.innerHTML = ``;
        pagAtivo[clienteAtivo].style.height = "330px";
        pagAtivo[clienteAtivo].style.width = "300px";
        pagAtivo[clienteAtivo].style.justifyContent = "start";
        pagAtivo[clienteAtivo].style.paddingTop = "15px"; 
        pagAtivo[clienteAtivo].style.position = "relative";
        verConta.innerHTML = `
            <p>Conta com (10% desconto) = <span class="bold">R$ ${(
              (totalPedido / quantidadePessoas) *
              0.9
            ).toFixed(
              2
            )}</span></p><p>Gostaria de dar gorjeta?</p><input class="gorjeta" type="text" placeholder="Valor"></input><button class="darGorjeta">Dar gorjeta</button>
        `;
        pagAtivo[clienteAtivo].appendChild(verConta);

        const darGorjeta = document.querySelector(".darGorjeta");

        darGorjeta.addEventListener("click", calcularGorjeta);

        function calcularGorjeta() {
          pagAtivo[clienteAtivo].style.height = "400px";
          valorGorjeta = parseFloat(document.querySelector(".gorjeta").value); 

          if (valorGorjeta !== 0) {
            verConta.innerHTML += `</p><p>Conta + gorjeta = <span class="bold">R$ ${(
              (totalPedido / quantidadePessoas) * 0.9 +
              valorGorjeta
            ).toFixed(2)}</span>
                `;
          } else {

          }
        }
      }

      function dinheiro() {
        verConta.setAttribute("class", "verConta");
        let valorGorjeta = 0;
        verConta.innerHTML = ``;
        pagAtivo[clienteAtivo].style.height = "330px";
        pagAtivo[clienteAtivo].style.width = "300px";
        pagAtivo[clienteAtivo].style.justifyContent = "start";
        pagAtivo[clienteAtivo].style.paddingTop = "15px";
        pagAtivo[clienteAtivo].style.position = "relative";
        verConta.innerHTML = `
            <p>Conta com (10% desconto) = <span class="bold">R$ ${(
              (totalPedido / quantidadePessoas) *
              0.9
            ).toFixed(
              2
            )}</span></p><p>Gostaria de dar gorjeta?</p><input class="gorjeta" type="text" placeholder="Valor"></input><button class="darGorjeta">Dar gorjeta</button>
        `;
        pagAtivo[clienteAtivo].appendChild(verConta);

        const darGorjeta = document.querySelector(".darGorjeta");
        darGorjeta.style.position = "relative"
        darGorjeta.addEventListener("click", calcularGorjeta);

        function calcularGorjeta() {
          pagAtivo[clienteAtivo].style.height = "400px";
          valorGorjeta = parseFloat(document.querySelector(".gorjeta").value);

          if (valorGorjeta !== 0) {
            verConta.innerHTML += `</p><p>Conta + gorjeta = <span class="bold">R$ ${(
              (totalPedido / quantidadePessoas) * 0.9 +
              valorGorjeta
            ).toFixed(2)}</span>
                `;
          }
        }
      }

      function cartao() {
        verConta.setAttribute("class", "verConta");
        let valorGorjeta = 0;
        verConta.innerHTML = ``;
        pagAtivo[clienteAtivo].style.height = "330px";
        pagAtivo[clienteAtivo].style.width = "300px";
        pagAtivo[clienteAtivo].style.justifyContent = "start";
        pagAtivo[clienteAtivo].style.paddingTop = "15px";
        pagAtivo[clienteAtivo].style.position = "relative";
        verConta.innerHTML = `
            <p>Conta (sem desconto) = <span class="bold">R$ ${(totalPedido / quantidadePessoas).toFixed(
              2
            )}</span></p><p>Gostaria de dar gorjeta?</p><input class="gorjeta" type="text" placeholder="Valor"></input><button class="darGorjeta">Dar gorjeta</button>
        `;
        pagAtivo[clienteAtivo].appendChild(verConta);

        const darGorjeta = document.querySelector(".darGorjeta");
          
        darGorjeta.addEventListener("click", calcularGorjeta);

        function calcularGorjeta() {
          pagAtivo[clienteAtivo].style.height = "400px";
          valorGorjeta = parseFloat(document.querySelector(".gorjeta").value);

          if (valorGorjeta !== 0) 
            verConta.innerHTML += `</p><p>Conta + gorjeta = <span class="bold"> R$ ${(
              totalPedido / quantidadePessoas +
              valorGorjeta
            ).toFixed(2)}</span>
                `;
        }
      }
    }
    const btnPix = document.querySelector(".pix");
    const btnDinheiro = document.querySelector(".dinheiro");
    const btnCartao = document.querySelector(".cartao");
    btnPix.addEventListener("click", pix);
    btnCartao.addEventListener("click", cartao);
    btnDinheiro.addEventListener("click", dinheiro);
  }

  
  function avancarCliente() {
    pagAtivo[clienteAtivo].style.height = "200px";
    pagAtivo[clienteAtivo].style.width = "200px";
    verConta.innerHTML = ``;
    clienteAtivo++;
    if (clienteAtivo >= pagAtivo.length) {

      metodos.setAttribute("class", "inativo")
      pagAtivo[clienteAtivo-1].style.backgroundColor = "rgb(116, 137, 196)";
      carimbar();
    } else {
      atualizarExibicao();
    }
  }

  atualizarExibicao();

  document.querySelector("#pagar").addEventListener("click", avancarCliente);
}

function carimbar(){
  const carimboPago = document.createElement("div")
  carimboPago.innerHTML = `<img src="./img/pago.png" class="carimbo">`
  pedidos.appendChild(carimboPago)
}

function cardapio() {
  menu.setAttribute("class", "ativo");
  garcom.setAttribute("class", "inativo");
  boaNoiteGarcom.setAttribute("class", "inativo");
  falaGarcom.setAttribute("class", "inativo");
}

function numeroPessoas() {
  if (document.querySelector("#input-resposta").value == ""){
  document.querySelector("#input-resposta").setAttribute("placeholder", "?")
  }else {
    quantidadePessoas = document.querySelector("#input-resposta").value;
    pergunta.setAttribute("class", "inativo");
    boaNoiteGarcom.textContent = "Por aqui... Aqui está o nosso cardápio";
    setTimeout(cardapio, 2000);

    boaNoiteGarcom.setAttribute("class", "ativo");
    pessoas.setAttribute("class", "inativo");
    boaNoitePessoas.setAttribute("class", "inativo");
    falaGarcom.setAttribute("class", "ativo");
    falaPessoas.setAttribute("class", "inativo");
    respostaPessoas.setAttribute("class", "inativo");
  }
}

function iniciarConversaGarcom() {
  falaGarcom.setAttribute("class", "ativo");
  garcom.setAttribute("class", "ativo");
  boaNoiteGarcom.setAttribute("class", "ativo");
}

function iniciarConversaPessoa() {
  falaPessoas.setAttribute("class", "ativo");
  pessoas.setAttribute("class", "ativo");
  boaNoitePessoas.setAttribute("class", "ativo");
}

function perguntaGarcom() {
  boaNoiteGarcom.setAttribute("class", "inativo");
  pergunta.setAttribute("class", "ativo");
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(iniciarConversaGarcom, 4000);
  setTimeout(iniciarConversaPessoa, 5000);
  setTimeout(perguntaGarcom, 6500);
  setTimeout(resposta, 7600);
});

function resposta() {
  boaNoitePessoas.setAttribute("class", "inativo");
  btnEnviar.setAttribute("class", "ativo");
  respostaPessoas.setAttribute("class", "ativo");
}

contador.forEach((cont) => {
  cont.textContent = 0; 
});

function qntPedido(event) {
  const index = Array.from(btnPlus).indexOf(event.target); 
  const contadorAtual = contador[index];
  
  if (contadorAtual) {
    const numeracao = parseInt(contadorAtual.textContent);
    contadorAtual.textContent = numeracao + 1;

    const itemNome = document.querySelectorAll(".gray")[index].textContent;
    const itemPreco = document.querySelectorAll(".valor")[index].textContent;

    if (numeracao >= 0) {
      btnpg.style.display = "flex"; 
    }

    if (numeracao >= 0) {
      let itemAdicionado = pedido.find((item) => item.nome === itemNome);
      if (!itemAdicionado) {
        pedido.push({
          nome: itemNome,
          preco: itemPreco,
          quantidade: 1,
        });
      } else {
        itemAdicionado.quantidade++;
      }
      atualizarTabelaPedidos();
    }
  } else {
    console.error("Elemento contador não encontrado para o índice:", index);
  }
}

btnPlus.forEach((btn) => {
  btn.addEventListener("click", qntPedido);
});

function atualizarTabelaPedidos() {
  
  pedidos.innerHTML = "";

  totalPedido = 0;

  
  pedido.forEach((item) => {
    const { nome, preco, quantidade } = item;
    subtotal = preco * quantidade;

    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${quantidade}</td>
            <td>${nome}</td>
            <td>${preco}</td>
            <td>${subtotal.toFixed(2)}</td>
        `;

    pedidos.appendChild(tr);

    item.subtotal = subtotal;
    totalPedido += subtotal;
  });

  totalPedidos.innerHTML = `${totalPedido.toFixed(2)}`;

}
