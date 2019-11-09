import { Result } from "./result.enum";
import questions from "../utils/questions";
import { SpeechLocal } from "../utils/SpeechLocal";

export class Question {

    public itemToGuess: string;
    public unitSystem: string; // height, price, number ...
    public unit: string; // degrees, euro, meters ...
    private numberToGuess: number;

    public constructor() {
        const randomQuestion = this.generate();
        this.itemToGuess = randomQuestion.itemToGuess;
        this.unitSystem = randomQuestion.unitSystem;
        this.unit = randomQuestion.unit;
        this.numberToGuess = randomQuestion.numberToGuess;
    }

    private generate(): any {
        const max: number = questions(SpeechLocal.getLanguage()).length;
        const randomNumber: number = Math.floor(Math.random() * max);
        return questions(SpeechLocal.getLanguage())[randomNumber];
    }

    public guess(n: number): Result {
        const res = n - this.numberToGuess
        if (res < 0)
            Result.MORE;
        else if (res > 0)
            return Result.LESS;
        return Result.EQUAL;
    }

    public getSpeechOutput(): string {
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

    public getHash(): string {
        return this.itemToGuess + this.unitSystem + this.unit + this.numberToGuess;
    }

    public copy(question: Question): void {
        this.itemToGuess = question.itemToGuess;
        this.unitSystem = question.unitSystem;
        this.unit = question.unit;
        this.numberToGuess = question.numberToGuess;
    }

}