import React, { Component } from 'react';
import { Upload, Icon, Modal, message, notification } from 'antd';
import moment from 'moment';
import debounce from 'lodash/debounce';

// 图片预览组件，文档https://github.com/infeng/react-viewer
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import styles from './MultiUpload.less'; // 样式
import Api from '@/services/api';
import qiniuUpload from '@/components/Qiniu/qiniu';
import saveMerchantImg from './saveMerchantImg';

// 获取token请求API接口定义上传七牛空间区域
// const { saveMerchantsImages, qiniuToken } = Api;

// 存储区域文档https://developer.qiniu.com/kodo/manual/1671/region-endpoint
// 根据存储区域修改上传域名
const QINIU_SERVER = '//upload.qiniup.com'; // 区域 z0华东
// 七牛请求报错code文档
// https://developer.qiniu.com/fusion/kb/1352/the-http-request-return-a-status-code

/* 组件使用有演示文件，进入demo文件夹查看

<MultiUpload
  // imageUploadServerHost='https://www.mocky.io/v2/5cc8019d300000980a055e76' // 图片上传服务地址
  // imageShowServiceHost='https://www.mocky.io/' // 图片查看地址前缀
  totalNum={5} // 最大上传数量（默认10）
  btnLimitNum={10} // 上传按钮限制（超出图片数量隐藏按钮）
  // 回显图片的路径 半路径 ;分隔
  value='avatar/2018-10-10/38.jpg;avatar/2018-10-10/1080_1920.jpg'
  maxSize={1024} // 图片大小限制1MB
  minWidth={100} // 图片宽度限制
  maxWidth={100}
  minHeight={100} // 图片高度限制
  maxHeight={100}
  title='身份证反' // 上传按钮文字(选填)
  roleUser='admin' // 当前用户角色
  roleAuthor={{ admin: true, base: false }} // 允许操作删除图片的权限角色(false关闭)
  onChange={this.onChange} // 图片上传成功时的回调 参数为图片的半路径;分隔的一个字符串
  // 默认显示的图片（数组-里面是对象格式）
  imagesUrl={[
    {
      uid: 123, // 需要是唯一值（必填）
      imageUrl: '', // 完整url链接（必填）
      url: '', // 完整url链接（必填）
      status: 'done', // 固定标识
    }
  ]}

  // 自定义提交的额外字段（保存后端接口用）
  submitData={{ id: 12 }}
  type="执照及许可证" // 上传图片大类 如：执照及许可证
  typeDesc="营业执照" // 用于渲染左侧标题
/>
*/
class MultiUpload extends Component {
  // 默认props参数
  static defaultProps = {
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", // 上传地址（测试）
    totalNum: 10, // 上传数量限制
    // btnLimitNum: 0, // 上传按钮限制（超出图片数量隐藏按钮）, 不传入等同不限制
    value: '',
    onChange: () => { },
    supportSort: false,
    maxSize: 2048,
    imageShowServiceHost: '',
    imageUploadServerHost: '',
    // getSign: () => { },
    saveImgType: '', // 保存影像请求类型
    roleUser: '',
    roleAuthor: { admin: true },
  };

  constructor(props) {
    super(props);
    this.state = {
      roleAuthor: {}, // 指定角色才可使用
      previewImage: '', // 弹层显示图片的url链接
      loading: false, // 上传按钮动画， true为加载中
      token: '',
      fileList: [
        // 测试图片数据
        // {
        //   uid: '-1',
        //   name: 'xxx.png', // 图片预览根据名称判断的，不可重复一样的名称
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
      ],
      // initFlag: true, // 初始化异步props处理
    };

    this.debounceMsg = debounce(this.openNotification, 300); // 防抖处理提示
    this.debSaveImg = debounce(this.saveImg, 1000);
  }

  componentWillMount () {
    const { roleAuthor, imagesUrl } = this.props;
    this.getQiniuToken(); // 异步获取token 存值

    this.setState({
      roleAuthor,
      fileList: imagesUrl, // 显示图片数据
    });
  }

  // componentWillReceiveProps (nextProps) {
  //   if (this.state.initFlag) {
  //     const { roleAuthor, imagesUrl } = nextProps;
  //     // console.log('更新上传参数', imagesUrl);
  //     this.setState({
  //       roleAuthor,
  //       fileList: imagesUrl, // 显示图片数据
  //     });
  //   }
  // }

  // 获取批量图片路径 用;分隔
  getImages = deleteFileName => {
    const { onChange } = this.props;
    const { fileList } = this.state;
    let result = [];
    fileList.map(item => {
      if (item.name) {
        result.push(item.name); // 把上传成功的每张图片名称加入数组xxx.png
      }
      return null;
    });

    // 当有图片移除时
    if (deleteFileName) {
      result = this.ArrayRemoveByValue(result, deleteFileName);
    }
    onChange(result.join(';')); // 把数组中的名称切成;分号
  };

  // 单独获取token
  getQiniuToken = async () => {
    const res = await Api.qiniuToken();
    if (res && res.succeed) {
      this.setState({
        token: res.data.token,
      });
    } else if (res) {
      this.debounceMsg(`错误${res.errorCode}`, `token获取失败: ${res.errorMessage}`);
    }
  };

  // antd上传组件data字段处理
  getUploadTokenData = file => {
    // console.log('处理上传组件data::', file);
    // console.log('key::', `${moment().format('YYYYMMDDHHmmss')}_${file.lastModified}`);
    return {
      'x:funcId': 1, // 必带参数
      token: this.state.token, // token
      key: `${moment().format('YYYYMMDDHHmmss')}_${file.lastModified}`, // 文件名唯一性
      // key: 1, // 调试参数
    };
  };

  // 图片切换--返回索引及分页变量
  getPreNextInfo = file => {
    const { fileList } = this.state;
    let currentIndex = 0;
    let needPre = true;
    let needNext = true;

    fileList.some((item, index) => {
      if (item.uid === file.uid || item.url === file.url) {
        currentIndex = index; // 获取当前点击图片的索引值
      }
      return item.url === file.url;
    });

    if (currentIndex === 0) {
      needPre = false;
    }
    if (currentIndex === fileList.length - 1) {
      needNext = false;
    }

    return {
      currentIndex,
      needPre,
      needNext,
    };
  };

  // 移除图片的回调
  handleRemove = file => {
    const { roleUser } = this.props;
    const roleAuthor = this.state.roleAuthor;
    // 指定权限才可以移除
    if (roleAuthor[roleUser]) {
      let deleteFileName = '';
      if (file && file.response) {
        deleteFileName = file.response.data;
      } else if (file && file.name) {
        deleteFileName = file.name;
      }
      this.getImages(deleteFileName);
      return true;
    }

    this.debounceMsg(`没有权限，无法移除`);
    return false;
  };

  // 处理移除图片事件
  ArrayRemoveByValue = (arr, val) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === val) {
        arr.splice(i, 1); // 找到指定位置移除一张
        break;
      }
    }
    return arr;
  };

  /**
   *  将正在上传的批量图片 与已经上传的图片进行数据合并
   *  1: 遍历state中的fileList 将status为done优先push结果集数组
   *  2: 遍历上传列表中的fileList 如果结果集数组中不存在 就push进结果集数组
   */
  mergeFileList = upFileList => {
    const { fileList } = this.state;
    const result = [];

    const isInResult = file => {
      let flag = false;
      result.map(item => {
        if (item.uid === file.uid) {
          flag = true;
        }
        return null;
      });
      return flag;
    };
    // 已上传文件先添加
    fileList.map(item => {
      if (!isInResult(item)) {
        if (item.status === 'done') {
          result.push(item);
        }
      }
      return null;
    });
    // 正在上传的添加到后面
    upFileList.map(item => {
      if (!isInResult(item)) {
        result.push(item);
      }
      return null;
    });

    return result;
  };

  // 上传前处理事件
  beforeUpload = (file, fileList) => {
    // const newFile = file;
    const suffixMap = new RegExp(/^image\/jpeg|gif|jpg|png$/, 'i'); // 限制图片格式
    const {
      maxSize,
      getSign,
      extraParam,
      totalNum,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
    } = this.props;
    const defaultMaxSize = 2048; // 默认最大文件体积

    // file.name = String(moment().format('YYYYMMDDHHmmss') + file.name); // 文件名唯一性
    // console.log('上传前', file);

    // this.setState({
    //   initFlag: false, // 使用过上传按钮，禁用初始化异步props
    // });

    return new Promise((resolve, reject) => {
      if (fileList.length > totalNum) {
        this.debounceMsg('错误', `最多上传${totalNum}张图片`);
        reject();
        return false;
      }

      if (!suffixMap.test(file.type)) {
        this.debounceMsg('错误', '只能上传图片文件，可以是jpg/png/gif/bmp/webp格式!');
        reject();
        return false;
      }

      if (file.size / 1024 > (maxSize || defaultMaxSize)) {
        this.debounceMsg('错误', `图片大小不能超过${maxSize || defaultMaxSize}kb!`);
        reject();
        return false;
      }
      // 创建一个二进制对象流
      const imgBlobUrl = URL.createObjectURL(file);
      const img = document.createElement('img');

      // 异步图片加载
      img.onload = async () => {
        const { width, height } = img;
        const showError = () => {
          this.debounceMsg('错误', `您上传的图片尺寸(${width} * ${height}) 与要求不符 请重新上传`);
          reject();
        };

        // 判断图片是否超出限制
        if (
          (minWidth && width < minWidth) ||
          (maxWidth && width > maxWidth) ||
          (minHeight && height < minHeight) ||
          (maxHeight && height > maxHeight)
        ) {
          showError();
          return false;
        }

        return resolve();
      };

      img.src = imgBlobUrl;
      return true;
    });
  };

  // 上传动作的回调
  handleChange = info => {
    const { type } = this.props;
    const { file, fileList } = info;
    this.setState({
      // fileList: this.mergeFileList(fileList), // 合并图片
      fileList, // 合并图片
    });

    if (file.status === 'uploading') {
      this.setState({ loading: true });
    }

    // console.log('fifle上传中');
    if (file.status === 'error') {
      this.setState({ loading: false });
      this.openNotification(`上传失败，请稍后尝试....`, `文件名称：${file.name}`);
    }

    // 图片上传完成
    if (file.status === 'done') {
      let flag = true; // 上传后判断
      const responseData = file.response;
      const upFile = []; // 上传保存的影像资料
      console.log('七牛服务端返回数据', responseData);
      fileList.map((item, index) => {
        if (item.name === file.name) {
          // 赋值图片名称及url链接
          fileList[index].name = responseData.data.key;
          fileList[index].url = responseData.data.remoteUrl;
          fileList[index].hash = responseData.data.hash;
          upFile.push(fileList[index]);
        }
        if (item.status !== 'done') {
          flag = false;
        }
        return null;
      });
      console.log('upFile', upFile);

      // 根据不同业务处理保存数据方法
      this.saveImg(upFile); // 保存影像图片（传入新增的一条图片数据）

      this.setState(
        {
          loading: false, // 关闭上传按钮 加载动画
          // fileList: this.mergeFileList(fileList), // 合并图片
        },
        () => {
          if (flag) this.getImages(); // 回调，批量处理图片路径
        }
      );
    }
  };

  // 保存新增影像图片资料到指定服务器
  saveImg = upFile => {
    // 根据不同传入类型，使用不同保存影像接口
    if (this.props.saveImgType === 'gg') {
      // 其它上传
    } else {
      // 保存商户、渠道、中介影像资料（封装方法）
      saveMerchantImg(upFile, this.props); // 保存影像图片（传入新增的一条图片数据）
    }
  };

  // 提示信息(默认提示错误信息警告)
  messageTitle = (title, messgeType = 'error') => {
    message[messgeType](title); // 调用antd组件提示
  };

  // 全局提示信息窗口，默认显示提示类型error
  openNotification = (title, des, iconType = 'error') => {
    notification[iconType]({
      message: title || null,
      description: des,
    });
  };

  // 点击预览图标时的回调
  handlePreview = file => {
    const { currentIndex, needPre, needNext } = this.getPreNextInfo(file);
    this.setState({
      preview: true,
      previewImage: file.url || file.thumbUrl,
      currentIndex, // 当前图片索引值
      needPre,
      needNext,
    });
    // console.log('查看', currentIndex);
  };

  // 关闭预览判断
  handlePreviewClose = () => {
    this.setState({
      preview: false,
    });
    setTimeout(() => {
      this.resetCurrent();
    }, 30);
  };

  // 获取上传按钮组件
  uploadButton = () => {
    const { loading, fileList } = this.state;
    const { btnLimitNum } = this.props;
    let btnHtml = (
      <div className={styles.uploadImg_btn}>
        <Icon style={{ fontSize: 28 }} type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">
          {loading ? '上传中...' : this.props.title || '选择上传文件'}
        </div>
      </div>
    );
    // 处理判断是否超出数量限制
    if (fileList.length >= btnLimitNum) {
      btnHtml = null;
    }

    return btnHtml;
  };

  // 处理图片URL链接格式(暂存处理方法)
  handleImgUrl = (imgUrl = '') => {
    const data = imgUrl.match(/(http|https):\/\/([\w.]+\/?)\S*(.jpg|.jpge|.gif|png)/);
    return data && data[0];
  };

  // 转换图片数据-符合提交服务器格式
  handleFileList = (fileList = []) => {
    const files = []; // 上传字段data.files[]内的数据格式
    fileList.forEach(item => {
      // if (item.newFlag) {}
      files.push(item.url); // 只传入图片URL
      // files.push(item.name); // 只传入图片名称（新版本提交结构）
    });
    return files;
  };

  // 以下弹层图片
  // 处理转换弹层显示的图片数组
  handleViewerImgs = () => {
    const { fileList } = this.state;
    return fileList.map((item, index) => ({
      src: item.url,
      alt: item.uid || index, // 容错字段
    }));
  };

  // 隐藏显示图片（弹层）
  closeViewer = () => {
    this.setState({ preview: false });
  };

  render () {
    const { previewImage, fileList, currentIndex, needPre, needNext, preview } = this.state;
    const { totalNum, imageUploadServerHost } = this.props;

    // 配置参数
    const uploadProps = {
      // action: imageUploadServerHost,
      action: QINIU_SERVER,
      data: file => this.getUploadTokenData(file),
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload, // 上传前钩子处理函数
      onRemove: this.handleRemove,
      fileList,
      listType: 'picture-card',
      onPreview: this.handlePreview, // 图片点击回调
      multiple: totalNum > 1, // 是否支持多选功能
      className: styles.uploadWrap,
      accept: 'image/*', // 选择文件，只显示图片类型
    };

    // 弹层参数
    const modalConfig = {
      visible: false, // preview
      // title: `图片预览${currentIndex + 1}/${fileList && fileList.length}`,
      title: `图片预览`,
      footer: null,
      onCancel: this.handlePreviewClose,
    };

    return (
      <div className="clearfix">
        <Upload key="uploader" {...uploadProps}>
          {/* 超过指定图片数量，隐藏上传按钮 */}
          {this.uploadButton()}
        </Upload>

        <Viewer
          visible={this.state.preview}
          onClose={this.closeViewer} // 右上角关闭事件
          onMaskClick={this.closeViewer} // 蒙层点击事件
          zoomSpeed={0.5} // 每次放大比例（数值越大一次性放大越多）
          // 加载失败显示图片
          // defaultImg={{
          //   src: 'http://www.juimg.com/tuku/yulantu/140402/330548-1404021G31013.jpg'
          // }}
          images={this.handleViewerImgs()} // 显示图片--数组
          activeIndex={currentIndex || 0} // 默认显示图片的索引值
          // scalable={false} // 隐藏上下、左右翻转功能
          zoomable={false} // 隐藏缩放按钮
          attribute={false} // 隐藏图片属性信息
        />
      </div>
    );
  }
}

export default MultiUpload;
