import { Result } from "./result.enum";
import { hash } from "../utils/hash";

export class Question {

    public question: string;
    private numberToGuess: number;

    public constructor(question: string, numberToGuess: number) {
        this.question = question
        this.numberToGuess = numberToGuess;
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
        return this.question;
    }

    public getHash(): string {
        return hash(this.question + String(this.numberToGuess));
    }

    public copy(question: Question): void {
        this.question = question.question;
        this.numberToGuess = question.numberToGuess;
    }

}