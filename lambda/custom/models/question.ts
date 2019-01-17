
export class Question {

    public itemToGuess: string;
    private numberToGuess: number;

    public constructor() {
        this.itemToGuess = "Tour Eiffel";
        this.numberToGuess = 100;
    }

    public guess(n: number): number {
        return n - this.numberToGuess;
    }

    public copy(question: Question): void {
        this.itemToGuess = question.itemToGuess;
        this.numberToGuess = question.numberToGuess;
    }

}