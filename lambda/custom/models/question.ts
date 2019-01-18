
export class Question {

    public itemToGuess: string;
    public unitSystem: string; // height, price, number ...
    public unit: string; // degrees, euro, meters ...
    private numberToGuess: number;

    public constructor() {
        this.itemToGuess = "de la Tour Eiffel";
        this.unitSystem = "la taille";
        this.unit = "mètre";
        this.numberToGuess = 100;
    }

    public guess(n: number): number {
        return n - this.numberToGuess;
    }

    public toSpeechText(requestAttributes: any): string {
        return requestAttributes.t("WHAT_IS") + this.unitSystem + ", " + this.unit + ", " + this.itemToGuess + "?";
    }

    public copy(question: Question): void {
        this.itemToGuess = question.itemToGuess;
        this.numberToGuess = question.numberToGuess;
    }

}