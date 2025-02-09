import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { getTokenFromLocalStorage } from './helpers/localstorage.helper';

function App() {
  return <RouterProvider router={router}/>
}

export default App