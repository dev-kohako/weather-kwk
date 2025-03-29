import dynamic from "next/dynamic";

const GlobeComponent = dynamic(() => import("./GlobeComponent"), {
  ssr: false,
});

export default GlobeComponent;
