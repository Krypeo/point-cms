import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';
import { Input } from 'antd';
import { Row, Col, DatePicker, Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState } from 'draft-js';

import style from './new.style';
import store from './new.store';

@inject('settings') @inject('loc') @observer
class New extends Component {
  state = {
    newArticle: {
      Categories: []
    },
    editorState: EditorState.createEmpty(),
    articleEditorToApi: ''
  }

  handleChange = (e) => {
    const newArticle = this.state.newArticle;
    newArticle[e.target.id] = e.target.value;
    this.setState({ newArticle: newArticle });
  };

  handleChangeDate = (date, formatedDate, id) => {
    const newArticle = this.state.newArticle;
    newArticle[id] = formatedDate;
    this.setState({ newArticle: newArticle });
  };

  handleChangeArticle = (editorState) => {
    this.setState({
      editorState,
      articleEditorToApi: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };

  componentDidMount() {
    this.mounted = true;
    this.props.loc.subscribe(this);
    store.refresh();
  }
  componentWillUnmount() {
    this.mounted = false;
    this.props.loc.unsubscribe(this);
  }

  render() {
    const { loc, classes } = this.props;
    const { editorState } = this.state;
    const locString = loc.strings.Articles.New_Articles;
    const locStringGlobal = loc.strings.Global;

    return (
      <Row>
        <Col span={18}>
          <Input size="large" id='Header' placeholder={locString.label.Header} value={this.state.newArticle.Header} onChange={this.handleChange} />
          <Row gutter={8}>
            <Col style={{ margin: '7px 0' }} span={8}>
              <Input id='Author' placeholder={locString.label.Author} value={this.state.newArticle.Author} onChange={this.handleChange} />
            </Col>
            <Col style={{ margin: '7px 0' }} span={8}>
            </Col>
            <Col style={{ margin: '7px 0', textAlign: 'right' }} span={8}>
              <DatePicker style={{ marginLeft: '7px' }} placeholder={locString.label.Created} onChange={(date, formatedDate) => this.handleChangeDate(date, formatedDate, 'Created')} />
              <DatePicker style={{ marginLeft: '7px' }} placeholder={locString.label.Publish} onChange={(date, formatedDate) => this.handleChangeDate(date, formatedDate, 'Publish')} />
            </Col>
          </Row>
          <div style={{ border: '1px solid #e8e8e8', height: '418px' }}>
            <Editor
              id="Article"
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName={classes.editor}
              onEditorStateChange={(editorState) => this.handleChangeArticle(editorState)}
            />
          </div>
          <Row>
            <Col>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: 'right', margin: '7px 0' }}>
              <Button style={{ marginLeft: '7px' }} size="large">{locStringGlobal.Clear}</Button>
              <Button style={{ marginLeft: '7px' }} type="primary" size="large">{locStringGlobal.Send}</Button>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          Any
        </Col>
      </Row>
    )
  }
}

export default injectSheet(style)(New);