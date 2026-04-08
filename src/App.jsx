import { useState } from 'react';
import Wall from './components/wall/Wall'

function App() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div>
      <Wall />
    </div>
  );
}

export default App;
