import'./Header.css'

function Header ({titulo, subtitulo, quantidade, aoAbrirCarrinho}) {
    return (
        <div className='titulo'>
        <h1>{titulo}</h1>
        <h2>{subtitulo}</h2>
        <button className="botao-carrinho" type="button" onClick={aoAbrirCarrinho}>
          Carrinho ({quantidade})
        </button>
        </div>
    );
}

export default Header;
