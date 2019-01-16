import { Question } from "./question";

export class Game {

    private points: number[];
    private numberOfRounds: number;
    private numberOfPlayer: number;
    private currentPlayer: number;
    private currentQuestion!: Question;

    public constructor() {
        this.numberOfRounds = 2
        this.currentPlayer = 0;
        this.numberOfPlayer = 1;
        this.points = new Array(this.numberOfPlayer);

        for (var i = 0; i < this.numberOfPlayer; i++)
            this.points[i] = 0;

        this.setNewQuestion();
    }

    private setNewQuestion(): void {
        this.currentQuestion = new Question();
    }

    private getCurrentQuestion(): Question {
        return this.currentQuestion;
    }

    private tryToGuess(n: number): number {
        const result = this.currentQuestion.try(n);

        if (result != 0) {
            this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayer;
            return result;
        }

        this.numberOfRounds--;
        this.points[this.currentPlayer]++;
        this.setNewQuestion();
        return 0;
    }

    public tryToSpeechText(n: number, requestAttributes: any): string {
        var text: string = "";
        const r: number = this.tryToGuess(n);

        if (r < 0)
            text += requestAttributes.t("MORE");
        else if (r > 0)
            text += requestAttributes.t("LESS");
        else {
            text += requestAttributes.t("GOOD");
            if (this.numberOfRounds == 0)
                text += ", " + this.questionToSpeechText(requestAttributes);
            else
                text += "Fin, points: " + this.points[this.currentPlayer];
        }

        return text;
    }

    public questionToSpeechText(requestAttributes: any): string {
        return "Quel est la taille de " + this.getCurrentQuestion().itemToGuess + " ?";
    }

}