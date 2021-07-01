import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';

export default class QuestionList extends React.Component {
    constructor(props){
        super(props);   
    }
    render() {
        {console.log(this.props.questions, "anis")}
        var tempProps = JSON.parse(JSON.stringify(this.props));
            Object.preventExtensions(tempProps);
            console.log(tempProps, "second");
        // const { questionsList } = this.props.questions;
        return (
            <div>
                Question List:
                {/* { questionsList.map(question =>(
                    <Question question={question}
                    key={question.question_id} />)
                )} */}
            </div>
        )
    }
}
