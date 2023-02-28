import Image from "next/image";
import Link from "next/link";
import urlFor from "../lib/urlFor";

export const RichTextComponent = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className=" relative w-full h-96 m-10 mx-auto">
          <Image
            className="object-contain"
            src={urlFor(value).url()}
            alt="Blog Post Image"
            fill
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 py-3 list-disc space-y-5">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-lg list-decimal">{children}</ol>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-black text-lg py-2 font-light">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-black text-4xl py-3 font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-black text-xl py-3 font-bold md:text-2xl">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-black text-lg py-3 font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-black text-xl py-3 font-bold">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="text-black border-l-[#4582e3] border-l-4 pl-5 py-3 my-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({children, value}:any) => {
        const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;

        return (
            <Link
            href={value.href}
            rel={rel}
            className="underline hover:text-blue-800 text-gray-500">
              {children}
            </Link>
        )
    }
  }
};
