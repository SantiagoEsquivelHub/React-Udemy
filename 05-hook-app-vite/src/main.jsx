import React from 'react';
import ReactDOM from 'react-dom/client';
import { CounterApp } from './01-useState/CounterApp';
import { CounterWithCustomHook } from './01-useState/CounterWithCustomHook';
import { FormWithCustomHook } from './02-useEffect/FormWithCustomHook';
import { SimpleForm } from './02-useEffect/SimpleForm';
import { MultipleCustomHooks } from './03-examples/MultipleCustomHooks';
import { FocusScreen } from './04-useRef/FocusScreen';
import { Layout } from './05-useLayoutEffect/Layout';
import { CallbackHook } from './06-memos/CallbackHook';
import { MemoHook } from './06-memos/MemoHook';
import { Memorize } from './06-memos/Memorize';
import { Padre } from './07-tarea-memo/Padre';
import { HooksApp } from './HooksApp';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <Padre />
  //</React.StrictMode>
)
