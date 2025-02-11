import Wrapper from "./style";

const Badge = ({ label = "", accent }) => {
  return (
    <Wrapper>
      <div className={`chatbot-badge ${accent}`}>{label}</div>
    </Wrapper>
  );
};

export default Badge;
