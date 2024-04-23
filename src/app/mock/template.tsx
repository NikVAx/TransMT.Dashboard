import { useParams } from "react-router-dom";

export const PageUseParamsTemplate = () => {
  const { id } = useParams();

  return <div>page - {id}</div>;
};

export const PageWidthTemplate = () => {
  return (
    <div style={{ width: "100%", height: "100%", background: "#1f2937" }} />
  );
};
