import "./Hotels.css";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBox from "./SearchBox";
import HotelCard from "./HotelCard";

export default function Hotels() {
  const hotels = [
    {
      id: 1,
      name: "Blue Origin Hotel",
      location: "Phú Quốc",
      price: "1.500.000 VNĐ",
      img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Dreamland",
      location: "Phú Quốc",
      price: "4.500.000 VNĐ",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Starkfield",
      location: "Phú Quốc",
      price: "3.500.000 VNĐ",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Vinhomes",
      location: "Bình Quới",
      price: "2.500.000 VNĐ",
      img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "BookStay",
      location: "Phú Quốc",
      price: "7.500.000 VNĐ",
      img: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="homePage">

      <main className="homeContainer hotelsPage">

        <SearchBox onSearch={handleSearch} />

        <div className="hotelsHead">
          <h2>Tất cả khách sạn</h2>
          <span>{hotels.length} kết quả</span>
        </div>

        <div className="hotelsGrid">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </main>

    </div>
  );
}
