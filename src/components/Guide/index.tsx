import * as React from 'react';
import { Button, Box, Tab } from '@alifd/next';
import {
  Form,
} from '@formily/next';
import styles from './index.module.scss';

const Guide = () => {
  return (
    <div className={styles.container}>
      {/* <h2 className={styles.title}>Welcome to icejs!</h2>
      <Box direction="row" spacing={20} justify="center">
        <Button type="normal">Normal</Button>
        <Button type="primary">Prirmary</Button>
        <Button type="secondary">Secondary</Button>
      </Box>
      <p className={styles.description}>This is a awesome project, enjoy it!</p> */}
      <Form>
        <Tab activeKey="2">
          <Tab.Item title="Home" key="1">
            Home content
          </Tab.Item>
          <Tab.Item title="Documentation" key="2">
            Doc content
          </Tab.Item>
          <Tab.Item title="Help" key="3">
            Help Content
          </Tab.Item>
        </Tab>

        <Tab activeKey="bb">
          <Tab.Item title="Home" key="aa">
            aa
          </Tab.Item>
          <Tab.Item title="Documentation" key="bb">
            bb
          </Tab.Item>
          <Tab.Item title="Help" key="cc">
            cc
          </Tab.Item>
        </Tab>
      </Form>
    </div>
  );
};

export default Guide;
