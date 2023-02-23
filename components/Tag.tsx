import ClientSideRoute from "./ClientSideRoute";

const Tag = ({ category, slug }: any) => {
  return (
    <div>
      <ClientSideRoute route={`/category/${slug}`}>
        <p className="">{category}</p>
      </ClientSideRoute>
    </div>
  );
};

export default Tag;
