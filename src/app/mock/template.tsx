import { useParams } from "react-router-dom";

export const PageUseParamsTemplate = () => {
  const { id, tag } = useParams();

  return <div>page {tag !== undefined ? `- ${tag}` : null} - {id}</div>;
};
