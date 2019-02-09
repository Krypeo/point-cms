import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';
import { Input } from 'antd';
import { Row, Col, DatePicker, Button, Tag } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState } from 'draft-js';

import style from './new.style';
import store from './new.store';

@inject('settings') @inject('loc') @observer
class New extends Component {
  state = {
    newArticle: {},
    selectedCategories: [],
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

  handleChangeCategories(tag, checked) {
    const { selectedCategories } = this.state;
    const nextSelectedCategory = checked
      ? [...selectedCategories, tag]
      : selectedCategories.filter(t => t !== tag);
    this.setState({ selectedCategories: nextSelectedCategory });
  }

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
  };
  componentWillUnmount() {
    this.mounted = false;
    this.props.loc.unsubscribe(this);
  };

  render() {
    const { loc, classes } = this.props;
    const { editorState, selectedCategories } = this.state;
    const locString = loc.strings.Articles.New_Articles;
    const locStringGlobal = loc.strings.Global;
    const CategoriesList = store.categories.map(item => item.Category);

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
          <Row style={{ marginTop: '8px' }}>
            <Col>
              <h4 style={{ marginRight: '8px', display: 'inline' }}>{`${locString.label.Categories}:`}</h4>
              {CategoriesList.map(tag => (
                <Tag.CheckableTag
                  style={{ fontSize: '14px' }}
                  key={tag}
                  checked={selectedCategories.indexOf(tag) > -1}
                  onChange={checked => this.handleChangeCategories(tag, checked)}
                >
                  {tag}
                </Tag.CheckableTag>
              ))}
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