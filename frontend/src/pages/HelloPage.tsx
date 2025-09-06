import { useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { HelloService } from '../client';
import type { HelloApiV1HelloGetResponse } from '../client';

export default function HelloPage() {
  const [response, setResponse] = useState<HelloApiV1HelloGetResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setLoading(true);
      setErr(null);
      const result = await HelloService.apiV1HelloGet();
      // 如果你的生成器返回的是 { data: ... } 结构，请改成：setResponse(result.data)
      setResponse(result);
    } catch (error: any) {
      console.error('API 调用失败:', error);
      setErr(error?.message ?? '请求失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        colorScheme="gray"
        bg="gray.500"
        onClick={handleClick}
        loading={loading}
        disabled={loading}
      >
        点击我
      </Button>

      {err && <Text color="red.500" mt={3}>错误：{err}</Text>}
      {response && <Text mt={3}>响应数据: {response.message}</Text>}
      <h1>你好世界</h1>
      <p>欢迎来到 Hello 页面！</p>
    </div>
  );
}
