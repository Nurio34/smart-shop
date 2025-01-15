import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-2xl font-bold flex items-center gap-2"
      style={{ fontVariant: "small-caps" }}
    >
      <figure className=" relative w-16 aspect-square">
        <Image
          src="/app/logo.webp"
          alt="Logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </figure>
    </Link>
  );
}
