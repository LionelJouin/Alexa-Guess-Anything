import { Question } from "../models/question";
import { QuestionService } from "./question.service";

export class OnlineQuestionService extends QuestionService {

    public getQuestion(seed: number | undefined = undefined): Question {
        return new Question("", 0);
    }

};