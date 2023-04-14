  import './App.css';
  import Decryption from './components/Decryption';
  import Encryption from './components/Encryption';

  function App() {
    return (
      <div className="App font bodybg text-white vh-100">
        <div className="text-center fs-1 lh-1 grayTxt fw-bold pt-5 pb-4">
          <p>
            Encryption<span className="text-light">/</span>Decryption
          </p>
          <p className="BlueTxt">System</p>
        </div>

        <div className="row m-0">
          <div className="col-6">
            <Encryption />
          </div>
          <div className="line"></div>
          <div className="col-6">
            <Decryption />
          </div>
        </div>
      </div>
    );
  }

  export default App;
