import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import { Table, Modal, Form, Input, Button, Row, Col } from 'antd';

import { singleTableHeader } from '../../../lib/help/GlobalVariables';
import { columns } from './questionnaires-overview.columns';
import style from './questionnaires-overview.style';
import store from './questionnaires-overview.store';


@inject('settings') @inject('loc') @observer
class QuestionnairesOverview extends Component {
  state = {
    insertModal: false,
    numberOfAnswers: [1],
    Answers: {}
  }
  handleTableChange = () => {
    store.refresh();
  };

  handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      Answers: { [id]: { value }, ...this.state.Answers }
    })
  }

  handleInsert = () => {
    const modal = this.state.insertModal;
    if (modal) {
      this.setState({ insertModal: false });
    } else {
      this.setState({ insertModal: true });
    };
  };

  handleAddAnswer = () => {
    const { numberOfAnswers } = this.state;
    const newNumber = numberOfAnswers.length + 1;
    this.setState({ numberOfAnswers: [...numberOfAnswers, newNumber] });
  };
  handleRemoveAnswer = (id) => {
    const { numberOfAnswers } = this.state;
    let result = numberOfAnswers.find(item => (item !== undefined) ? item === id : null);
    let index = numberOfAnswers.indexOf(result);
    if (index !== -1) {
      numberOfAnswers.splice(index, 1);
      this.setState({ numberOfAnswers: numberOfAnswers });
    };
  }

  handleSendQuestionnaire = () => {
    const { Question, numberOfAnswers } = this.state;
    const answers = numberOfAnswers.forEach(item => {
      const response = `${this.state.Answer}${item}`;
      console.log(Question);
      return response;
    })
    console.log(answers);
  }

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
    const { numberOfAnswers } = this.state;
    const locString = loc.strings.Questionnaires.Overview;
    const generateAnswers = numberOfAnswers.map(item => {
      return (
        <Row key={item}>
          <Col span={22}>
            <Form.Item label={`${locString.label.Answer} ${item}:`} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <Input id={`Answer${item}`} onChange={(e) => this.handleInputChange(e)} type="textarea" />
            </Form.Item>
          </Col>
          <Col span={2}>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => this.handleRemoveAnswer(item)} shape="circle" icon="minus" />
            </div>
          </Col>
        </Row>
      )
    });
    console.log(this.state.Answers);

    return (
      <div>
        <Table
          dataSource={store.fullData}
          columns={columns(this, loc.strings.Questionnaires.Overview, classes)}
          pagination={{ pageSize: 20 }}
          loading={store.loading}
          size={this.props.settings.tableSize}
          onChange={this.handleTableChange}
          scroll={{ y: singleTableHeader }}
          key={row => row.key}
          bordered
        />
        <Modal
          title={locString.sentences.Add_New_Questionnaire}
          visible={this.state.insertModal}
          onOk={() => this.handleSendQuestionnaire()}
          onCancel={this.handleInsert}
          width={700}
        >
          <Form layout="vertical">
            <Row>
              <Col span={22}>
                <Form.Item label={`${locString.label.Question}:`} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  <Input id="Question" onChange={(e) => this.handleInputChange(e)} type="textarea" />
                </Form.Item>
              </Col>
            </Row>
            {generateAnswers}
            <Button onClick={() => this.handleAddAnswer()} shape="circle" icon="plus" />
          </Form>
        </Modal>
      </div>
    )
  }
}

export default injectSheet(style)(QuestionnairesOverview);