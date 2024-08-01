import { useState, useEffect } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
const ScrollBtn = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    window.scrollY > 100 ? setVisible(true) : setVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      id="scrollBtn"
      aria-label="scroll to top"
      className={`fixed z-50 bg-orange-200 rounded-full outline outline-offset-2 outline-orange-400 outline-1 bottom-10 right-10 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <KeyboardArrowUpRoundedIcon fontSize="large" sx={{ color: "orange" }} />
    </button>
  );
};

export default ScrollBtn;
