import { Question } from "../models/question";
import { QuestionService } from "./question.service";
import questions from "../utils/questions";
import { SpeechLocal } from "../utils/speechLocal";

export class JsonQuestionService extends QuestionService {

    private itemToGuess: string = "";
    private unitSystem: string = ""; // height, price, number ...
    private unit: string = ""; // degrees, euro, meters ...
    private numberToGuess: number = 0;
    private seed: number | undefined;

    public getQuestion(seed: number | undefined = undefined): Question {
        this.seed = seed;
        if (this.seed !== undefined)
            this.seed = Math.abs(this.seed);
        this.generate();
        let question = this.getSpeechOutput();
        return new Question(question, this.numberToGuess);
    }

    private generate(): void {
        const max: number = questions(this.getLanguage()).length;
        let randomNumber: number = Math.floor(Math.random() * max);
        if (this.seed !== undefined)
            randomNumber = this.seed % max;

        let question = questions(SpeechLocal.getLanguage())[randomNumber];
        this.itemToGuess = question.itemToGuess;
        this.unitSystem = question.unitSystem;
        this.unit = question.unit;
        this.numberToGuess = question.numberToGuess;
    }

    private getSpeechOutput(): string {
        var unitSystem: string = "";
        if (this.unitSystem !== undefined && this.unitSystem !== "")
            unitSystem = " " + this.unitSystem;

        var unit: string = "";
        if (this.unit !== undefined && this.unit !== "")
            unit = ", en " + this.unit + ",";

        var itemToGuess: string = "";
        if (this.itemToGuess !== undefined)
            itemToGuess = " " + this.itemToGuess;

        return SpeechLocal.getSpeechOutput("WHAT_IS") + unitSystem + unit + itemToGuess + "?";
    }

};