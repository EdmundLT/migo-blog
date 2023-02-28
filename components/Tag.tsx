import ClientSideRoute from "./ClientSideRoute";

const Tag = ({ category, slug }: any) => {
  return (
    <div className="text-accent hover:bg-accent hover:rounded-lg hover:text-white px-2">
      <ClientSideRoute route={`/category/${slug}`}>
        <p className="">{category}</p>
      </ClientSideRoute>
    </div>
  );
};

export default Tag;
