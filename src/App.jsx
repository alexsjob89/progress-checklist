import './App.css';
import ProgressComponent from './ProgressComponent';

function App() {
const initialItems = ['Industry', 'Website URL', 'Company size', 'Description', 'Logo', 'Location', 'Custom button']

  return (
    <div className="App">
 <ProgressComponent initialItems={initialItems}/>
    </div>
  );
}

export default App;
