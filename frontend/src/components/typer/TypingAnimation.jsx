import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat With Your Personal AI",
        1000,
        "Powered By OpenAI 🤖",
        2000,
        "Get your questions answered NOW",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "20px",
        fontWeight: 300,
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
