import Navbar from "./components/Navbar";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <>
     <Navbar/>
      <div className="my-2">
        <HomeScreen />
      </div>
    </>
  );
}

export default App;
