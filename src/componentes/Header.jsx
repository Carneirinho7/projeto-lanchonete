import'./Header.css'

function Header ({ titulo, subtitulo, quantidade, paginaAtual, aoNavegar }) {
    const abas = [
      { id: "home", nome: "Cardápio" },
      { id: "carrinho", nome: `Carrinho (${quantidade})` },
      { id: "pedido", nome: "Cozinha" },
      { id: "cadastro", nome: "Cadastro" },
    ];

    return (
        <div className='titulo'>
        <h1>{titulo}</h1>
        <h2>{subtitulo}</h2>
        <nav className="abas" aria-label="Navegação principal">
          {abas.map((aba) => (
            <button
              className={`aba${paginaAtual === aba.id ? " ativa" : ""}`}
              type="button"
              key={aba.id}
              onClick={() => aoNavegar(aba.id)}
            >
              {aba.nome}
            </button>
          ))}
        </nav>
        </div>
    );
}

export default Header;
