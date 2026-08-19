import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./componentes/Header";
import CardProd from "./componentes/CardProd";
import Funcionario from "./componentes/Funcionario";
import "./App.css";
import Contador from "./componentes/contador";
import Home from "../pages/home";
import Carrinho from "../pages/carrinho";
import Pedido from "../pages/pedido";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";

const CHAVE_CARRINHO = "lanchonete-carrinho";

const produtosIniciais = [
  { nome: "X-Bozze", preco: 19, quantidade: 0, imagem: "/imagens/xbozze.jpg" },
  { nome: "X-Pimentel", preco: 17, quantidade: 0, imagem: "/imagens/xpimentel.jpg" },
  { nome: "X-Fermino", preco: 15, quantidade: 0, imagem: "/imagens/xfermino.jpg" },
  { nome: "Refrigerante", preco: 6, quantidade: 0, imagem: "/imagens/refrigerante.jpg" },
  { nome: "Suco", preco: 5, quantidade: 0, imagem: "/imagens/suco.jpg" },
  { nome: "Água", preco: 3.5, quantidade: 0, imagem: "/imagens/agua.jpg" },
];

function carregarProdutos() {
  try {
    const carrinhoSalvo = JSON.parse(localStorage.getItem(CHAVE_CARRINHO));

    if (!Array.isArray(carrinhoSalvo)) {
      return produtosIniciais;
    }

    return produtosIniciais.map((produto) => {
      const produtoSalvo = carrinhoSalvo.find((item) => item.nome === produto.nome);
      const quantidade = Number(produtoSalvo?.quantidade);

      return {
        ...produto,
        quantidade: Number.isInteger(quantidade) && quantidade > 0 ? quantidade : 0,
      };
    });
  } catch {
    return produtosIniciais;
  }
}


function App(){
  const navigate = useNavigate();
  const location = useLocation();
  const [produtos, setProdutos] = useState(carregarProdutos);
  const paginasPorRota = {
    "/": "login",
    "/home": "home",
    "/carrinho": "carrinho",
    "/pedido": "pedido",
    "/login": "login",
    "/cadastro": "cadastro",
  };
  const pagina = paginasPorRota[location.pathname] ?? "home";
  const exibirHeader = pagina !== "login" && pagina !== "cadastro";

  useEffect(() => {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(produtos));
  }, [produtos]);

  const itensPedido = produtos.filter((produto) => produto.quantidade > 0);
  const quantidadeCarrinho = produtos.reduce((total, produto) => {
    return total + produto.quantidade;
  }, 0);
  const totalPedido = produtos.reduce((total, produto) => {
    return total + produto.preco * produto.quantidade;
  }, 0);

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function adicionarItem(nome) {
    setProdutos(produtos.map((produto) => {
      if (produto.nome === nome) {
        return { ...produto, quantidade: produto.quantidade + 1 };
      }

      return produto;
    }));
  }

  function removerItem(nome) {
    setProdutos(produtos.map((produto) => {
      if (produto.nome === nome && produto.quantidade > 0) {
        return { ...produto, quantidade: produto.quantidade - 1 };
      }

      return produto;
    }));
  }

  function limparCarrinho() {
    setProdutos(produtos.map((produto) => ({ ...produto, quantidade: 0 })));
  }

  function finalizarPedido() {
    const usuarioLogado = localStorage.getItem("usuario-logado");
    const responsavel = usuarioLogado === "admin" ? "Administrador" : "Cliente";

    window.alert(`Pedido finalizado por: ${responsavel}! Total: ${formatarPreco(totalPedido)}`);
    limparCarrinho();
    navigate("/home");
  }

  function navegar(aba) {
    const rotasPorPagina = {
      home: "/home",
      carrinho: "/carrinho",
      pedido: "/pedido",
      login: "/login",
      cadastro: "/cadastro",
    };

    navigate(rotasPorPagina[aba]);
  }

  let conteudo;

  if (pagina === "carrinho") {
    conteudo = (
      <Carrinho
        itens={itensPedido}
        totalItens={quantidadeCarrinho}
        totalPedido={totalPedido}
        formatarPreco={formatarPreco}
        aoVoltar={() => navigate("/home")}
        aoLimpar={limparCarrinho}
        aoFinalizar={finalizarPedido}
      />
    );
  } else if (pagina === "pedido") {
    conteudo = <Pedido />;
  } else if (pagina === "login") {
    conteudo = <Login />;
  } else if (pagina === "cadastro") {
    conteudo = <Cadastro />;
  } else {
    conteudo = (
      <Home>
        <div className="pagina">

      <section className="produtos">
        <h2>Cardápio</h2>
        <div className="lista-produtos">
          {produtos.map((produto) => (
            <CardProd
              key={produto.nome}
              nome={produto.nome}
              preco={produto.preco}
              quantidade={produto.quantidade}
              imagem={produto.imagem}
              adicionarItem={() => adicionarItem(produto.nome)}
              removerItem={() => removerItem(produto.nome)}
            />
          ))}
        </div>
      </section>

      <section className="resumo-pedido">
        <h2>Resumo do Pedido</h2>

        {itensPedido.length === 0 ? (
          <p>Nenhum item adicionado.</p>
        ) : (
          <>
            {itensPedido.map((produto) => (
              <div className="item-pedido" key={produto.nome}>
                <span>{produto.quantidade}x {produto.nome}</span>
                <strong>{formatarPreco(produto.preco * produto.quantidade)}</strong>
              </div>
            ))}

            <div className="total-pedido">
              <span>Total</span>
              <strong>{formatarPreco(totalPedido)}</strong>
            </div>
          </>
        )}
      </section>

      <Funcionario nome="Thiago" cargo="Chefe" />
      <Funcionario nome="Maria" cargo="atendente" />
      <Funcionario nome="João" cargo="cozinheiro" />
      <Funcionario nome="Lúcia" cargo="caixa" />

      <Contador/>
    </div>
      </Home>
    );
  }

  return (
    <>
      {exibirHeader && (
        <Header
          titulo="Lanchonete Dogão"
          subtitulo="A melhor de CWB"
          quantidade={quantidadeCarrinho}
          paginaAtual={pagina}
          aoNavegar={navegar}
        />
      )}
      {conteudo}
    </>
  );
}
export default App
