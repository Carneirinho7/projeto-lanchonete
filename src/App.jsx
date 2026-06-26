import { useState } from "react";
import Header from "./componentes/Header";
import Login from "./componentes/Login";
import CardProd from "./componentes/CardProd";
import Funcionario from "./componentes/Funcionario";
import "./App.css";
import Contador from "./componentes/contador";


function App(){
  const [produtos, setProdutos] = useState([
    { nome: "X-Bozze", preco: 19, quantidade: 0 },
    { nome: "X-Pimentel", preco: 17, quantidade: 0 },
    { nome: "X-Fermino", preco: 15, quantidade: 0 },
    { nome: "Refrigerante", preco: 6, quantidade: 0 },
    { nome: "Suco", preco: 5, quantidade: 0 },
    { nome: "Água", preco: 3.5, quantidade: 0 },
  ]);

  const itensPedido = produtos.filter((produto) => produto.quantidade > 0);
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

  return(
    <div className="pagina">
      <Header titulo = "Lanchonete Dogão"
      subtitulo = "A melhor de CWB" />
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

      <Funcionario nome="Thiago o Chefe da Chapa" />

      <Contador/>
    </div>

  

  )
}
export default App
