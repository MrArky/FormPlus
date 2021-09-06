import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FormPlus from './components/FormPlus';
import { IControlsAttrs } from './components/FormPlus/data';
import { Button } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';

function App() {
  const [value, setValue] = useState<{
    controlsAttrs?: IControlsAttrs[],
    html?: string;
  }>({
    controlsAttrs: [],
    html: ""
  });
  return <FormPlus value={value} onChange={v=>setValue(v)} extra={<>
    <Button onClick={async () => {
        console.log(value);
    }} ><FileSearchOutlined />保存</Button>
</>} />
}

export default App;
