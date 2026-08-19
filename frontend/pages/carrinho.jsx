function Carrinho({ itens, totalItens, totalPedido, formatarPreco, aoVoltar, aoLimpar, aoFinalizar }) {
  return (
    <main className="pagina-comanda">
      <section className="carrinho" aria-labelledby="titulo-carrinho">
        <header className="cabecalho">
          <p>Pedido atual</p>
          <h1 id="titulo-carrinho">Carrinho de Compras</h1>
        </header>

        <div className="tabela-carrinho">
          <div className="linha cabecalho-tabela">
            <span>Foto</span>
            <span>Produto</span>
            <span>Categoria</span>
            <span>Qtde</span>
            <span>Preço</span>
          </div>
          {itens.length === 0 ? (
            <p className="carrinho-vazio">Seu carrinho está vazio.</p>
          ) : (
            itens.map((produto) => (
              <div className="linha" key={produto.nome}>
                <img src={produto.imagem} alt={produto.nome} />
                <strong>{produto.nome}</strong>
                <span>{produto.nome.startsWith("X-") ? "Lanches" : "Bebidas"}</span>
                <span>{produto.quantidade}</span>
                <strong>{formatarPreco(produto.preco * produto.quantidade)}</strong>
              </div>
            ))
          )}
        </div>

        <div className="resumo">
          <p>Total de itens: <strong>{totalItens}</strong></p>
          <p>Valor Total: <strong>{formatarPreco(totalPedido)}</strong></p>
        </div>

        <div className="acoes">
          <button className="voltar" type="button" onClick={aoVoltar}>Voltar ao cardápio</button>
          <button className="limpar" type="button" onClick={aoLimpar} disabled={itens.length === 0}>Limpar Carrinho</button>
          <button className="finalizar" type="button" onClick={aoFinalizar} disabled={itens.length === 0}>Finalizar Pedido</button>
        </div>
      </section>
    </main>
  );
}

export default Carrinho;
