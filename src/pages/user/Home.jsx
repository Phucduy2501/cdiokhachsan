import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

import "./Home.css";
import SearchBox from "./SearchBox";
import HotelCard from "./HotelCard";
import MiniHotelCard from "./MiniHotelCard";

export default function Home() {
  const [topChoices, setTopChoices] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopHotels = async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .order("price")
        .limit(5);

      if (!error) setTopChoices(data);
    };

    fetchTopHotels();
  }, []);

  const handleSearch = async ({ location, guests }) => {
    try {
      setLoading(true);
      setIsSearching(true);

      const { data, error } = await supabase
        .from("rooms")
        .select(`
          *,
          hotels (*)
        `)
        .not("hotel_id", "is", null)   
        .gte("capacity", guests);

      if (error) {
        console.error(error);
        setSearchResults([]);
      } else {
        const hotels = data
          .map(room => room.hotels)
          .filter(Boolean); 

        const uniqueHotels = hotels.filter(
          (hotel, index, self) =>
            index === self.findIndex(h => h.id === hotel.id)
        );

        setSearchResults(uniqueHotels);
      }
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    } finally {
      setLoading(false);   
    }
  };

  const resetSearch = () => {
    setIsSearching(false);
    setSearchResults([]);
  };

  const hotelsToShow = isSearching ? searchResults : topChoices;

  const popular = [
    {
      id: 1,
      name: "Shangri-la",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200",
    },
    {
      id: 2,
      name: "Top View",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=1200",
    },
    {
      id: 3,
      name: "Green Villa",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1200",
    },
    {
      id: 4,
      name: "Wooden Pit",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    },
    {
      id: 5,
      name: "Boutique",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    },
    {
      id: 6,
      name: "Modern",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
    },
    {
      id: 7,
      name: "Silver Rain",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=80&w=1200",
    },
    {
      id: 8,
      name: "Coshville",
      location: "Phú Quốc",
      img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200",
    },
  ];

  return (
    <div className="homePage">
      <main className="homeContainer">

        <SearchBox onSearch={handleSearch} />

        <section className="section">
          <div className="sectionHead rowBetween">
            <h2>
              {isSearching ? "Kết quả tìm kiếm" : "Lựa chọn hàng đầu"}
            </h2>

            {isSearching && (
              <span
                className="pill"
                style={{ cursor: "pointer" }}
                onClick={resetSearch}
              >
                Quay lại
              </span>
            )}
          </div>

          {loading && <p>Đang tải dữ liệu...</p>}

          {!loading && hotelsToShow.length === 0 && (
            <p>Không tìm thấy khách sạn phù hợp</p>
          )}

          <div className="gridTop">
            {hotelsToShow.map((hotel) => (
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
            {popular.map((hotel) => (
              <MiniHotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}