import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import "./app.scss";

interface Iprops {
  children: any;
}
const App: FC<Iprops> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default App;
