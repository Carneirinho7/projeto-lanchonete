import { useState } from "react";
import Header from "./componentes/Header";
import Login from "./componentes/Login";
import CardProd from "./componentes/CardProd";
import Funcionario from "./componentes/Funcionario";
import "./App.css";
import Contador from "./componentes/contador";
import Home from "../pages/home";
import Carrinho from "../pages/carrinho";


function App(){
  const [pagina, setPagina] = useState("home");
  const [produtos, setProdutos] = useState([
    { nome: "X-Bozze", preco: 19, quantidade: 0, imagem: "/imagens/xbozze.jpg" },
    { nome: "X-Pimentel", preco: 17, quantidade: 0, imagem: "/imagens/xpimentel.jpg" },
    { nome: "X-Fermino", preco: 15, quantidade: 0, imagem: "/imagens/xfermino.jpg" },
    { nome: "Refrigerante", preco: 6, quantidade: 0, imagem: "/imagens/refrigerante.jpg" },
    { nome: "Suco", preco: 5, quantidade: 0, imagem: "/imagens/suco.jpg" },
    { nome: "Água", preco: 3.5, quantidade: 0, imagem: "/imagens/agua.jpg" },
  ]);

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
    window.alert(`Pedido finalizado! Total: ${formatarPreco(totalPedido)}`);
    limparCarrinho();
    setPagina("home");
  }

  if (pagina === "carrinho") {
    return (
      <Carrinho
        itens={itensPedido}
        totalItens={quantidadeCarrinho}
        totalPedido={totalPedido}
        formatarPreco={formatarPreco}
        aoVoltar={() => setPagina("home")}
        aoLimpar={limparCarrinho}
        aoFinalizar={finalizarPedido}
      />
    );
  }

  return(
    <Home>
    <div className="pagina">
      <Header
        titulo="Lanchonete Dogão"
        subtitulo="A melhor de CWB"
        quantidade={quantidadeCarrinho}
        aoAbrirCarrinho={() => setPagina("carrinho")}
      />
      <Login  />

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

      <Funcionario nome="Thiago o Chefe da Chapa" cargo="o chefe da chapa" />
      <Funcionario nome="Maria" cargo="atendente" />
      <Funcionario nome="João" cargo="cozinheiro" />
      <Funcionario nome="Lúcia" cargo="caixa" />

      <Contador/>
    </div>
    </Home>

  

  )
}
export default App
