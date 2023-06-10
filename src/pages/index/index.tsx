// import { View, Text, BaseEventOrig, FormProps } from "@tarojs/components";
import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
// import { decrement, increment } from "@/features/counterSlice";
import { prequest, upload } from "@/utils/request";
import Layouts from "@/components/layouts";
import { Cell, Uploader } from "@taroify/core";
import Taro from "@tarojs/taro";

interface Iprops {}

const Index: FC<Iprops> = () => {
  const [files, setFiles] = useState<any>([]);
  const count = useSelector((state: RootState) => state.counter.value);

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
  const onUpload = () => {
    Taro.chooseImage({
      count: 1
      // sizeType: ["original", "compressed"],
      // sourceType: ["album", "camera"]
    }).then(({ tempFiles }) => {
      console.log({ tempFiles });
      // let formData = new FormData();
      // formData.append(
      //   "file",
      //   tempFiles?.[0].originalFileObj as any,
      //   tempFiles[0].originalFileObj?.name
      // );

      upload({
        path: "/posts",
        filePath: tempFiles[0].path,
        name: "imageFile"
      }).then(res => {
        console.log(res, " datadatadata");
      });
      // setFiles({
      //   url: tempFiles[0].path,
      //   type: tempFiles[0].type,
      //   name: tempFiles[0].originalFileObj?.name
      // });
    });
    // Taro.chooseImage({
    //   success(res) {
    //     const tempFilePaths = res.tempFilePaths;
    //     console.log({ tempFilePaths });
    //     Taro.uploadFile({
    //       url: "https://jsonplaceholder.typicode.com/post", //仅为示例，非真实的接口地址
    //       filePath: tempFilePaths[0],
    //       name: "file",
    //       formData: {
    //         user: "test"
    //       },
    //       success(res) {
    //         console.log(res, " datadatadata");
    //         const data = res.data;
    //         //do something
    //       }
    //     });
    //   }
    // });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Layouts title="首页">
      测试
      <Cell>
        <Uploader value={files} onUpload={onUpload} onChange={setFiles} />
      </Cell>
    </Layouts>
  );
};

export default Index;
