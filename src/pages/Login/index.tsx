import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import LoginBlock from './components/LoginBlock';
import { useModelSelector } from '@/models/user';

const { Cell } = ResponsiveGrid;

const Login = () => {
  const Modelstores = useModelSelector((store) => store);
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
