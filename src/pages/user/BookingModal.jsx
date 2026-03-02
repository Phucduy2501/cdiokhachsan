import { useState } from "react";
import { supabase } from "../../services/supabase";
import "./BookingModal.css";

export default function BookingModal({ room, onClose }) {
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);

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
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />

              <label>Check out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />

              <div className="formActions">
                <button
                  className="btnPrimary"
                  onClick={() => {
                    if (!checkIn || !checkOut) {
                      alert("Vui lòng chọn ngày check in / check out");
                      return;
                    }
                    if (checkOut <= checkIn) {
                      alert("Ngày check out phải sau check in");
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
              <p><b>Giá:</b> {room.price}</p>

              <div className="formActions">
                <button
                  className="btnPrimary"
                  disabled={loading}
                  onClick={async () => {
                    setLoading(true);

                    const {
                      data: { user },
                      error: userError,
                    } = await supabase.auth.getUser();

                    if (userError || !user) {
                      alert("Bạn cần đăng nhập để đặt phòng");
                      setLoading(false);
                      return;
                    }

                    const { data: conflicts, error: conflictError } =
                      await supabase
                        .from("bookings")
                        .select("id")
                        .eq("room_id", room.id)
                        .lt("check_in", checkOut)
                        .gt("check_out", checkIn);

                    if (conflictError && conflictError.code) {
                      console.error("Conflict error:", conflictError);
                      alert("Lỗi kiểm tra phòng trống");
                      return;
                    }

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
                        status: "confirmed",
                      });

                    if (error) {
                      console.error(error);
                      alert("Đặt phòng thất bại");
                      setLoading(false);
                      return;
                    }

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
              <p>Đặt phòng thành công!</p>

              <div className="formActions">
                <button className="btnPrimary" onClick={onClose}>
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