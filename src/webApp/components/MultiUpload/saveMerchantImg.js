import Api from '@/services/api';

// 转换图片数据-符合提交服务器格式
const handleFileList = (fileList = []) => {
  const files = []; // 上传字段data.files[]内的数据格式
  fileList.forEach(item => {
    // if (item.newFlag) {}
    files.push(item.url); // 只传入图片URL
    // files.push(item.name); // 只传入图片名称（新版本提交结构）
    // console.log(item);
  });
  return files;
};

// 保存商户影像接口处理（当前文件, 传入的props参数）
const saveMerchantImg = (upFile, props) => {
  const {
    type, // 上传图片大类 如：执照及许可证
    typeDesc, // 当前上传子类  如：营业执照
    submitData, // 里面带有 type来源（渠道、商户、中介）、 id当前页面id
  } = props;

  // console.log('1测试上传整合', handleFileList(upFile));

  // 提交影像图片保存
  Api.saveMerchantsImages({
    // 来源 merchant-商户门店 channel-商户渠道 mediumChannel-中介渠道
    type: submitData.type || '',
    id: submitData.id || '', // 对应来源的主键id
    data: [
      {
        type, // type上传图片大类 如：执照及许可证
        files: handleFileList(upFile), // 上传图片
      },
    ],
  }).then(res => {
    console.log('影像保存后', res);
  });
};

export default saveMerchantImg;
