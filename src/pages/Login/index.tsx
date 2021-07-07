import React, { useEffect } from 'react';
import { ResponsiveGrid } from '@alifd/next';
import LoginBlock from './components/LoginBlock';
import { useSelector } from 'react-redux';

import { useModelSelector } from '@/models/user';


const { Cell } = ResponsiveGrid;

const Login = () => {
  const stores = useSelector((store) => store);
  const Modelstores = useModelSelector((store) => store);
  console.log(stores);
  console.log(Modelstores);
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <LoginBlock />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Login;
