import * as React from 'react';
import { Button, Card, Modal } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html';

interface IProps {
  editorState?: any;
}
interface IState {
  showRichText: boolean;
  editorContent: string;
  editorState: string;
}

export default class Rich extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
  }

  public state: IState = {
    showRichText: false,
    editorContent: '',
    editorState: EditorState.createEmpty()
  };

  public render() {
    const { editorState } = this.state;
    return (
      <div>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleClearContent}>
            清空内容
          </Button>
          <Button type="primary" onClick={this.handleGetText}>
            获取HTML文本
          </Button>
        </Card>

        <Card title="富文本编辑器">
          {/* 编辑器富文本功能 */}
          <Editor
            editorState={editorState} // 把内容赋值上去
            // toolbarClassName="toolbarClassName"
            // wrapperClassName="wrapperClassName"
            // editorClassName="editorClassName"
            onContentStateChange={this.onEditorChange}
            // 当编辑器内容发生变化的时候，触发函数
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>

        {/* 用来显示html内容 */}
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            });
          }}
          footer={null}
        >
          {/* 读取内容，并且使用插件转换成带html标签显示 */}
          {draftjs(this.state.editorContent)}
        </Modal>
      </div>
    );
  }
  // 组件显示之后，组件第一次渲染完成触发
  public componentDidMount(): void {}

  // 保存每次编辑的状态
  public onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  }
  // 保存了编辑器里面内容数据
  public onEditorChange = editorContent => {
    // console.log(editorContent);
    // 把编辑器内的值存起来
    this.setState({
      editorContent
    });
  }

  // 清空编辑器内容
  public handleClearContent = () => {
    this.setState({
      editorState: ''
    });
  }

  // 获取HTML文本内容
  public handleGetText = () => {
    this.setState({
      showRichText: true
    });
  }
}
