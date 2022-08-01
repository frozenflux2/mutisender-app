import dynamic from "next/dynamic";

// exports
export const MainView = dynamic(() => import("./Main"));
