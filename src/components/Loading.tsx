import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center h-screen">
      <div className="mx-auto text-center">
        <Image
          className="w-24 h-24"
          src={"/favicon.svg"}
          alt={"favicon"}
          width={96}
          height={96}
        />
      </div>
    </div>
  );
};

export default Loading;
