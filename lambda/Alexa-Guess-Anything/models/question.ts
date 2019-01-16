
export class Question {

    public itemToGuess: string;
    private numberToGuess: number;

    public constructor() {
        this.itemToGuess = "Tour Effeil";
        this.numberToGuess = 0;
    }

    public try(n: number): number {
        return this.numberToGuess - n;
    }

}