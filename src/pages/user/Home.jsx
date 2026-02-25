import "./Home.css";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBox from "./SearchBox";
import HotelCard from "./HotelCard";
import MiniHotelCard from "./MiniHotelCard";

export default function Home() {
  const topChoices = [
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
      wide: true,
    },
    {
      id: 5,
      name: "BookStay",
      location: "Phú Quốc",
      price: "7.500.000 VNĐ",
      img: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=1200&auto=format&fit=crop",
    },
  ];


  const popular = [
    {
      id: 1,
      name: "Shangri-la",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Top View",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Green Villa",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Wooden Pit",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Boutique",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Modern",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "Silver Rain",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 8,
      name: "Coshville",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
    },
  ];


  const handleSearch = (e) => {
    e.preventDefault();
    alert("Tìm kiếm thành công (demo)!");
  };

  return (
    <div className="homePage">

      <main className="homeContainer">

        <SearchBox onSearch={handleSearch} />

        <section className="section">
          <div className="sectionHead">
            <h2>Lựa chọn hàng đầu</h2>
          </div>
          <div className="gridTop">
            {topChoices.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="sectionHead rowBetween">
            <h2>Lựa chọn phổ biến</h2>
            <span className="pill">Xem thêm</span>
          </div>
          <div className="gridPopular">
            {popular.map(hotel => (
              <MiniHotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}
