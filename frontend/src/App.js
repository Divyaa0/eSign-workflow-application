import './App.css';
import Opensign from "@opensign/react";


const MyOpensignComponent = () => {
  return (
    <Opensign
    onLoad={() => console.log("success")}
    onLoadError={(error) => console.log(error)}
    templateId= "mlYybp3x4X"
  />
  );
};
console.log("🚀 ~ MyOpensignComponent ~ MyOpensignComponent:", MyOpensignComponent)


function App() {
  return (
    <div className="App">
        <MyOpensignComponent />

    </div>
  );
}

export default App;
