export default function HotelCard({ hotel }) {
  return (
    <article className={`card ${hotel.wide ? "cardWide" : ""}`}>
      <div className="cardImg">
        {hotel.price && (
          <span className="priceTag">{hotel.price}</span>
        )}
        <img src={hotel.img} alt={hotel.name} />
      </div>

      <div className="cardBody">
        <h3>{hotel.name}</h3>
        <p>{hotel.location}</p>
      </div>
    </article>
  );
}
