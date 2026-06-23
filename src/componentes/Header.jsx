import'./Header.css'


<Header className="css"></Header>


function Header({titulo,subtitulo}){
    return(
 <> 
        <div className="titulo">

        <h1>{titulo}</h1>
        <h2>{subtitulo}</h2>

        </div>
 </>
    )
   



}

export default Header