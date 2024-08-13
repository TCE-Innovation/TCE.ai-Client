import { Loader } from "../../../../common";

const EditLoader = () => {
  return (
    <div style={{ pointerEvents: "none" }}>
      <>&zwnj;</>
      <Loader size={2} />
    </div>
  );
};

export default EditLoader;
