import Link from "next/link";
import ClientSideRoute from "./ClientSideRoute";

const Tag = ({ category, slug }: any) => {
  return (
    <div>
      <ClientSideRoute route={`/category/${slug}`}>
        <p>{category}</p>
      </ClientSideRoute>
    </div>
  );
};

export default Tag;
