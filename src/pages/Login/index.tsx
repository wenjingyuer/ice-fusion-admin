import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import LoginBlock from './components/LoginBlock';
import { useSelector } from 'react-redux';
import useWinSize from '@/hooks/useWinSize'
import { useModelSelector } from '@/models/user';

const { Cell } = ResponsiveGrid;

const Login = () => {
  const stores = useSelector((store) => store);
  const Modelstores = useModelSelector((store) => store);
  const size = useWinSize();

  console.log(size);
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
