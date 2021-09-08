import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import WorkTable from './components/WorkTable';
import { useModelSelector } from '@/models/user';

const { Cell } = ResponsiveGrid;

const Workplace = () => {
  const Modelstores = useModelSelector((store) => store);
  console.log(Modelstores);

  return (
    <ResponsiveGrid gap={0}>
      <Cell colSpan={12}>
        <PageHeader breadcrumbs={[{ name: 'Dashboard' }, { name: '工作台页面' }]} />
      </Cell>

      <Cell colSpan={12}>
        <WorkTable />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Workplace;
