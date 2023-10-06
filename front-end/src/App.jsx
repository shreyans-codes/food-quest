import "./App.css";
import Popular from "./components/Popular";
import BackendList from "./components/BackendList";
import AppBarComponent from "./components/AppBarComponent";
import SearchInputBar from "./components/SearchInputBar";

function App() {
  return (
    <>
      <AppBarComponent />
      <SearchInputBar />
      <Popular />
      <BackendList />
    </>
  );
}

export default App;
