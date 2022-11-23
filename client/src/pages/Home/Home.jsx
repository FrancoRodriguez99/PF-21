import Articles from "../../components/Articles/Articles";
import Filtro from "../../components/Filtro/Filtro";
import "./Home.css";

export default function Home() {
  return (
    <div id="Home_Main_Container">
      <Filtro />
      <Articles />
    </div>
  );
}
