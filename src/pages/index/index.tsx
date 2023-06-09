import { View, Text, BaseEventOrig, FormProps } from "@tarojs/components";
import { FC, useEffect } from "react";
import { Button, Cell, Field, Form, Input, Toast } from "@taroify/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { decrement, increment } from "@/features/counterSlice";
import { prequest } from "@/utils/request";
import Layouts from "@/components/layouts";

interface Iprops {}

const Index: FC<Iprops> = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    Toast.open(JSON.stringify(event.detail.value));
  };
  const init = () => {
    prequest({
      method: "post",
      path: "/posts",
      data: {
        title: "foo",
        body: "bar",
        userId: 1
      }
    }).then(res => {
      console.log({ res });
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Layouts title="首页">测试</Layouts>
    // <View>
    //   <Text>首页</Text>
    //   <Button color="primary" block>
    //     主要按钮
    //   </Button>
    //   <Button onClick={() => dispatch(increment())} color="primary">
    //     Increment
    //   </Button>
    //   <View>{count}</View>
    //   <Button onClick={() => dispatch(decrement())} color="info">
    //     Decrement
    //   </Button>
    //   <Form onSubmit={onSubmit}>
    //     <Toast id="toast" />
    //     <Cell.Group inset>
    //       <Form.Item
    //         name="username"
    //         rules={[{ required: true, message: "请填写用户名" }]}
    //       >
    //         <Form.Label>用户名</Form.Label>
    //         <Form.Control>
    //           <Input placeholder="用户名" />
    //         </Form.Control>
    //       </Form.Item>
    //       <Form.Item
    //         name="password"
    //         rules={[{ required: true, message: "请填写密码" }]}
    //       >
    //         <Form.Label>密码</Form.Label>
    //         <Form.Control>
    //           <Input password placeholder="密码" />
    //         </Form.Control>
    //       </Form.Item>
    //       <Field
    //         name="text"
    //         label={{ align: "left", children: "文本" }}
    //         rules={[{ required: true, message: "请填写文本" }]}
    //       >
    //         <Input placeholder="请输入文本" />
    //       </Field>
    //     </Cell.Group>
    //     <View style={{ margin: "16px" }}>
    //       <Button shape="round" block color="primary" formType="submit">
    //         提交
    //       </Button>
    //     </View>
    //   </Form>
    // </View>
  );
};

export default Index;
