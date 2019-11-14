import { Question } from "../models/question";

export abstract class QuestionService {

    private language: string;

    constructor(language: string = "en-US") {
        this.language = language;
    } 

    protected getLanguage(): string {
        return this.language;
    }

    public generateQuestion(seed: number | undefined  = undefined): Question {
        return this.getQuestion(undefined);
    }

    public abstract getQuestion(seed: number | undefined): Question;

};