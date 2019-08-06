import React, { Component } from 'react';
import MultiUpload from '@/components/MultiUpload/MultiUpload';

// react-uplod-img
class ChannelImageData extends Component {
  // 上传成功后回调
  onChange = () => { };

  render () {
    return (
      <div>
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
      </div>
    );
  }
}

export default ChannelImageData;
