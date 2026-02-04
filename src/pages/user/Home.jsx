import "./Home.css";

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
      {/* Navbar */}
      <header className="homeNavbar">
        <div className="homeContainer navWrap">
          <div className="brand">BookStay</div>

          <nav className="navLinks">
            <a className="active" href="#">
              Trang chủ
            </a>
            <a href="#">Khách sạn</a>
            <a href="#">Phòng</a>
            <a href="#">Giới thiệu</a>
          </nav>

          <div className="navActions">
            <button className="btn btnGhost">Login</button>
            <button className="btn btnPrimary">Sign up</button>
          </div>
        </div>
      </header>

      <main className="homeContainer">
        {/* Hero */}
        <section className="hero">
          <div className="heroLeft">
            <h1>
              Nơi Nghỉ Dưỡng Cao Cấp <br />
              Cho Kỳ Nghỉ Sắp Tới
            </h1>
            <p>
              Một trải nghiệm nghỉ dưỡng tuyệt vời dành cho bạn và gia đình trong
              mơ. Cùng khám phá những khách sạn đẳng cấp.
            </p>

            <div className="heroStats">
              <div className="stat">
                <div className="statIcon">🏨</div>
                <div>
                  <div className="statNumber">2500</div>
                  <div className="statText">người dùng</div>
                </div>
              </div>

              <div className="stat">
                <div className="statIcon">⭐</div>
                <div>
                  <div className="statNumber">200</div>
                  <div className="statText">đánh giá</div>
                </div>
              </div>

              <div className="stat">
                <div className="statIcon">🌍</div>
                <div>
                  <div className="statNumber">30</div>
                  <div className="statText">khu nghỉ dưỡng</div>
                </div>
              </div>
            </div>
          </div>

          <div className="heroRight">
            <div className="heroImage">
              <img
                src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop"
              />
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="search">
          <form className="searchBox" onSubmit={handleSearch}>
            <div className="field">
              <span className="icon">📅</span>
              <input placeholder="Kiểm tra phòng trống" />
            </div>

            <div className="field">
              <span className="icon">👤</span>
              <select defaultValue="2">
                <option value="1">1 người</option>
                <option value="2">2 người</option>
                <option value="3">3 người</option>
                <option value="4">4 người</option>
              </select>
            </div>

            <div className="field">
              <span className="icon">📍</span>
              <input placeholder="Địa điểm" />
            </div>

            <button className="btn btnPrimary searchBtn" type="submit">
              Tìm kiếm
            </button>
          </form>
        </section>

        {/* Top choices */}
        <section className="section">
          <div className="sectionHead">
            <h2>Lựa chọn hàng đầu</h2>
          </div>

          <div className="gridTop">
            {topChoices.map((item) => (
              <article
                key={item.id}
                className={`card ${item.wide ? "cardWide" : ""}`}
              >
                <div className="cardImg">
                  <span className="priceTag">{item.price}</span>
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="cardBody">
                  <h3>{item.name}</h3>
                  <p>{item.location}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Popular */}
        <section className="section">
          <div className="sectionHead rowBetween">
            <h2>Lựa chọn phổ biến</h2>
            <a className="pill" href="#">
              Lựa chọn phổ biến
            </a>
          </div>

          <div className="gridPopular">
            {popular.map((item) => (
              <div className="miniCard" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="miniBody">
                  <h4>{item.name}</h4>
                  <p>{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="homeContainer footerWrap">
          <div>
            <div className="brandFooter">BookStay.</div>
            <p className="muted">Chúng tôi giúp kỳ nghỉ của bạn trở nên trọn vẹn.</p>
          </div>

          <div className="footerCta">
            <div className="muted">Trở thành đối tác lưu trú</div>
            <button className="btn btnPrimary">Đăng ký ngay</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
