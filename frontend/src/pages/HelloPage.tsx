import { useState } from 'react';
import { Button } from '@chakra-ui/react';
export default function HelloPage() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button colorScheme='gray' bg = 'gray.500' onClick={() => setCount(count + 1)}>点击我</Button>
      <p>点击次数: {count}</p>
      <h1>你好世界</h1>
      <p>欢迎来到 Hello 页面！</p>
    </div>
  );
};


