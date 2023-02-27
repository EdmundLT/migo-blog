"use client";

import Tag from "./Tag";

interface category {
  title: string;
  slug: string;
}

export default function Banner() {
  const categories: category[] = [
    {
      title: "移民",
      slug: "Immigrant",
    },
    {
      title: "生活",
      slug: "Life",
    },
    {
      title: "做嘢",
      slug: "Working",
    },
    {
      title: "讀書",
      slug: "Study",
    },
  ];

  return (
    <div
      className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold px-10 py-5
   mb-10 text-black"
    >
      <div>
        <h1 className="text-5xl font-light">Otto Notes</h1>
        <h2 className="mt-5 md:mt-0 pt-2" >
          加拿大生活大小事
        </h2>
      </div>
      <div className="flex space-x-4">
        {categories.map((cat: category) => {
          return (
            <div key={cat.slug}>
              <Tag category={cat.title} slug={cat.slug} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
