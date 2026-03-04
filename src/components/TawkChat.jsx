import { useEffect } from "react";
import { supabase } from "../services/supabase";

function TawkChat() {
  useEffect(() => {
    const loadTawk = async () => {

      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      window.Tawk_API.onLoad = function () {
        if (user) {
          window.Tawk_API.setAttributes({
            name: user.user_metadata?.name || "Guest",
            email: user.email,
            page: window.location.pathname
          }, function () {});
        }
      };

      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];

      s1.async = true;
      s1.src = "https://embed.tawk.to/68dab88f87268e194fdc55c5/1j6b61sju";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");

      s0.parentNode.insertBefore(s1, s0);
    };

    loadTawk();
  }, []);

  return null;
}

export default TawkChat;