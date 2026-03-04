import { useState, useMemo, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { sendBookingToChat } from "../../services/chatService";
import "./BookingModal.css";

export default function BookingModal({ room, onClose }) {

  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (checkIn) {
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      const formatted = nextDay.toISOString().split("T")[0];
      setCheckOut(formatted);
    }
  }, [checkIn]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff = (end - start) / (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 0;

  }, [checkIn, checkOut]);

  const totalPrice = nights * room.price;

  return (
    <div className="modalOverlay">

      <div className="modalContent bookingLayout">

        <div className="bookingImage">
          <img src={room.image_url} alt={room.name} />
        </div>

        <div className="bookingForm">

          <div className="steps">
            <span className={step >= 1 ? "active" : ""}>1</span>
            <span className={step >= 2 ? "active" : ""}>2</span>
            <span className={step >= 3 ? "active" : ""}>3</span>
          </div>

          {step === 1 && (
            <>
              <h3>Booking Information</h3>
              <h4>{room.name}</h4>

              <label>Check in</label>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />

              <label>Check out</label>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />

              {nights > 0 && (
                <p className="pricePreview">
                  {nights} đêm × {room.price.toLocaleString()} VNĐ ={" "}
                  <b>{totalPrice.toLocaleString()} VNĐ</b>
                </p>
              )}

              <div className="formActions">

                <button
                  className="btnPrimary"
                  onClick={() => {

                    if (!checkIn || !checkOut) {
                      alert("Vui lòng chọn ngày");
                      return;
                    }

                    if (checkIn < today) {
                      alert("Không thể đặt ngày trong quá khứ");
                      return;
                    }

                    if (nights <= 0) {
                      alert("Check out phải sau check in ít nhất 1 ngày");
                      return;
                    }

                    setStep(2);

                  }}
                >
                  Book Now
                </button>

                <button className="btnCancel" onClick={onClose}>
                  Cancel
                </button>

              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Payment</h3>
              <h4>{room.name}</h4>

              <p>Check in: {checkIn}</p>
              <p>Check out: {checkOut}</p>
              <p>Số đêm: {nights}</p>

              <p>
                Tổng tiền: <b>{totalPrice.toLocaleString()} VNĐ</b>
              </p>

              <div className="formActions">

                <button
                  className="btnPrimary"
                  disabled={loading}
                  onClick={async () => {

                    setLoading(true);

                    const {
                      data: { user },
                    } = await supabase.auth.getUser();

                    if (!user) {

                      alert("Bạn cần đăng nhập để đặt phòng");

                      setLoading(false);

                      return;

                    }

                    const { data: conflicts } = await supabase
                      .from("bookings")
                      .select("id")
                      .eq("room_id", room.id)
                      .lt("check_in", checkOut)
                      .gt("check_out", checkIn);

                    if (conflicts && conflicts.length > 0) {

                      alert("Phòng đã được đặt trong khoảng thời gian này");

                      setLoading(false);

                      return;

                    }

                    const { error } = await supabase
                      .from("bookings")
                      .insert({
                        user_id: user.id,
                        room_id: room.id,
                        check_in: checkIn,
                        check_out: checkOut,
                        total_price: totalPrice,
                        status: "confirmed",
                      });

                    if (error) {

                      console.error(error);

                      alert("Đặt phòng thất bại");

                      setLoading(false);

                      return;

                    }

                    setTimeout(() => {

                      sendBookingToChat({
                        room: room.name,
                        checkin: checkIn,
                        checkout: checkOut,
                        total: totalPrice.toLocaleString() + " VNĐ"
                      });

                    }, 500);

                    setLoading(false);

                    setStep(3);

                  }}
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>

                <button
                  className="btnCancel"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Back
                </button>

              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>🎉 Payment Completed</h3>

              <p>
                Bạn đã đặt <b>{room.name}</b> trong {nights} đêm.
              </p>

              <p>
                Tổng thanh toán: <b>{totalPrice.toLocaleString()} VNĐ</b>
              </p>

              <div className="formActions">

                <button
                  className="btnPrimary"
                  onClick={onClose}
                >
                  Hoàn tất
                </button>

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}