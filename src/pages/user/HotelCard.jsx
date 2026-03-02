import { useNavigate } from "react-router-dom";
import "./HotelCard.css";

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();

  return (
    <div
      className="hotelCard"
      onClick={() => navigate(`/hotels/${hotel.id}`)}
    >
      <div className="hotelImageWrap">
        <img
          src={hotel.image_url}
          alt={hotel.name}
          loading="lazy"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/400x250?text=No+Image")
          }
        />

        <span className="hotelPrice">
          {hotel.price.toLocaleString()} VNĐ
        </span>
      </div>

      <div className="hotelInfo">
        <h3>{hotel.name}</h3>
        <p>{hotel.location}</p>
      </div>
    </div>
  );
}