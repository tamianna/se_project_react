import "./ItemCard.css";

function ItemCard({ item }) {
    return (
    <div>
        <h2 className="card__title">{item.name}</h2>
        <img className="card__image" src={item.link} alt={item.name}/>
    </div>
    );
}

export default ItemCard;