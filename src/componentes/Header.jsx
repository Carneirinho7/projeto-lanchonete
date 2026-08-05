import'./Header.css'

function Header ({titulo, subtitulo, quantidade}) {
    return (
        <div className='titulo'>
        <h1>{titulo}</h1>
        <h2>{subtitulo}</h2>
        <p>Carrinho ({quantidade})</p>
        </div>
    );
}

export default Header;
