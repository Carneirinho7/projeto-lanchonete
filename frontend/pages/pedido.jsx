function Pedido() {
  return (
    <main className="pagina-comanda">
      <section className="pedido-cozinha" aria-labelledby="titulo-pedido">
        <div className="aviso-cozinha">Pedido em produção • Visão da cozinha</div>
        <div className="conteudo-pedido">
          <header className="cabecalho-pedido">
            <div><p>Pedido</p><h1 id="titulo-pedido">#001</h1></div>
            <div className="mesa"><span>Mesa</span><strong>03</strong></div>
          </header>
          <p className="horario">Horário: <strong>12:15</strong></p>
          <div className="itens-pedido">
            <p><strong>2x</strong> X-Burguer</p>
            <p><strong>1x</strong> Batata</p>
            <p><strong>2x</strong> Coca-Cola</p>
          </div>
          <div className="status-atual"><span>Status</span><strong>Preparando</strong></div>
          <ol className="status-pedido" aria-label="Andamento do pedido">
            <li className="concluido">Recebido</li><li className="ativo">Preparando</li><li>Pronto</li><li>Entregue</li>
          </ol>
        </div>
      </section>
    </main>
  );
}

export default Pedido;
