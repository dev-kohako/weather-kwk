import Header from "@/components/header";
import Footer from "@/components/footer";
import GlobeComponent from "../components/earth-3d/GlobeWrapper";

export default function Home() {

  const dataOff = [
    { id: 1, name: "1", minTemp: 17, temp: 24, maxTemp: 29 },
    { id: 2, name: "2", minTemp: 17, temp: 24, maxTemp: 29 },
    { id: 3, name: "3", minTemp: 17, temp: 24, maxTemp: 29 },
    { id: 4, name: "4", minTemp: 17, temp: 24, maxTemp: 29 },
    { id: 5, name: "5", minTemp: 17, temp: 24, maxTemp: 29 },
    { id: 6, name: "6", minTemp: 17, temp: 24, maxTemp: 29 },
    { id: 7, name: "7", minTemp: 17, temp: 24, maxTemp: 29 },
  ];

  return (
    <div className="flex flex-col justify-center items-center bg-zinc-300 dark:bg-zinc-900 overflow-hidden">
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center h-screen w-full max-w-7xl space-y-10 lg:px-0">
        <div className="flex flex-col h-[390px] w-[390px] justify-center items-center">
          <div className="flex w-full h-full justify-center items-center">
            <GlobeComponent />
          </div>
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
