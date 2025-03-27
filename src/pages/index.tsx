import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const dataOff = [
    {
      id: 1,
      name: "1",
    },
    {
      id: 2,
      name: "2",
    },
    {
      id: 3,
      name: "3",
    },
    {
      id: 4,
      name: "4",
    },
    {
      id: 5,
      name: "5",
    },
    {
      id: 6,
      name: "6",
    },
    {
      id: 7,
      name: "7",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center bg-zinc-300 dark:bg-zinc-900">
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center h-screen w-full max-w-7xl space-y-10 px-4 lg:px-0">
        <div className="w-full columns-2">
          <div className="bg-zinc-950 sm:w-[30rem] h-[30rem] self-start"></div>
          <div className="bg-zinc-950 h-[30rem] p-4"></div>
        </div>

        <div className="w-full flex justify-between items-center">
          {dataOff.map((item) => (
            <div
              className="bg-zinc-950 w-28 h-28 flex justify-center items-center"
              key={item.id}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
