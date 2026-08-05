function CardProd({nome, preco, quantidade, imagem, adicionarItem, removerItem}){
   const total = preco * quantidade;
   const precoFormatado = preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
   });
   const totalFormatado = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
   });

   return(
     <div className="card-prod">
       <img src={imagem} alt={nome} className="imagem-produto" />
       <h3>{nome}</h3>
       <p>Preço: {precoFormatado}</p>
       <p>Quantidade: {quantidade}</p>
       <p>Total: {totalFormatado}</p>
       <div className="acoes-produto">
         <button onClick={adicionarItem}>Adicionar ao Carrinho</button>
         <button onClick={removerItem} disabled={quantidade === 0}>Remover</button>
       </div>
     </div>
   )
}

export default CardProd
