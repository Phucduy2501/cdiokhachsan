import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import BookingModal from "./BookingModal";
import "./HotelDetail.css";

export default function HotelDetail() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setHotel(data);
    };

    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("hotel_id", id)
        .order("price");

      if (!error) setRooms(data);
    };

    fetchHotel();
    fetchRooms();
  }, [id]);

  if (!hotel) {
    return <p style={{ padding: 40 }}>Đang tải dữ liệu khách sạn...</p>;
  }

  return (
    <div className="hotelDetailPage">
      <div className="hotelHero">
        <img src={hotel.image_url} alt={hotel.name} />

        <div className="hotelHeroInfo">
          <h1>{hotel.name}</h1>
          <p className="location">📍 {hotel.location}</p>

          <div className="hotelMeta">
            <span>⭐ 4.8</span>
            <span>
              Giá từ{" "}
              <b>{hotel.price?.toLocaleString() || "—"} VNĐ</b> / đêm
            </span>
          </div>

          {/* {rooms.length > 0 && (
            <button
              className="bookNowBtn"
              onClick={() => setSelectedRoom(rooms[0])}
            >
              Đặt ngay
            </button>
          )} */}
        </div>
      </div>

      <div className="hotelDescription">
        <h2>Giới thiệu</h2>
        <p>
          {hotel.name} tọa lạc tại {hotel.location}, mang đến không gian nghỉ
          dưỡng hiện đại, tiện nghi và dịch vụ cao cấp. Phù hợp cho gia đình,
          cặp đôi và chuyến công tác.
        </p>

        <div className="hotelServices">
          <span>🏊 Hồ bơi</span>
          <span>📶 Wifi miễn phí</span>
          <span>🍽 Nhà hàng</span>
          <span>🚗 Bãi đỗ xe</span>
        </div>
      </div>

      <h2 className="sectionTitle">Danh sách phòng</h2>

      {rooms.length === 0 && (
        <div className="emptyRooms">
          😥 Hiện chưa có phòng khả dụng cho khách sạn này
        </div>
      )}

      <div className="roomsList">
        {rooms.map((room) => (
          <div key={room.id} className="roomItem">
            <img src={room.image_url} alt={room.name} />

            <div className="roomInfo">
              <h3>{room.name}</h3>
              <p>👥 {room.capacity} người</p>
              <p>🛏 Loại phòng: {room.type}</p>
            </div>

            <div className="roomPrice">
              <span>{room.price.toLocaleString()} VNĐ / đêm</span>
              <button onClick={() => setSelectedRoom(room)}>
                Đặt phòng
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}