import Image from "next/image";

export default function Header() {
  return (
    <div className="w-screen h-[10vh] bg-orange-200 flex flex-row items-center px-10">
      <Image
        src="/oxxo-logo.svg"
        alt="oxxo logo"
        width={100}
        height={0}
        style={{ height: "auto" }}
        draggable={false}
        priority
      />
    </div>
  );
}
