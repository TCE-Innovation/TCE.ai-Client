import { Loader } from "../../../../common";

const EditLoader = () => {
  return (
    <div style={{ pointerEvents: "none" }}>
      <Loader size={8} />
      <pre>{"    "}</pre>
    </div>
  );
};

export default EditLoader;
