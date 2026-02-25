export default function MiniHotelCard({ hotel }) {
  return (
    <div className="miniCard">
      <img src={hotel.img} alt={hotel.name} />
      <div className="miniBody">
        <h4>{hotel.name}</h4>
        <p>{hotel.location}</p>
      </div>
    </div>
  );
}
