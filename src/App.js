import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import ProviderApi from './context/ProviderApi';

function App() {
  return (
    <ProviderApi>
      <Form />
      <Table />
    </ProviderApi>
  );
}

export default App;
