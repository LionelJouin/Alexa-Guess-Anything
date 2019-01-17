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

    private guess(n: number): number {
        const result = this.currentQuestion.guess(n);

        if (result != 0) {
            this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayer;
            return result;
        }

        this.numberOfRounds--;
        this.points[this.currentPlayer]++;
        this.setNewQuestion();
        return 0;
    }

    public guessToSpeechText(n: number, requestAttributes: any): string {
        if (n === NaN || n === undefined || n === null)
            return "Erreur";
            
        var speechText: string = "";
        const guessResult: number = this.guess(n);

        if (guessResult < 0)
            speechText += requestAttributes.t("MORE");
        else if (guessResult > 0)
            speechText += requestAttributes.t("LESS");
        else {
            speechText += requestAttributes.t("GOOD");
            if (this.numberOfRounds == 0)
                speechText += ", " + this.questionToSpeechText(requestAttributes);
            else
                speechText += ", Fin, points: " + this.points[this.currentPlayer];
        }

        return speechText;
    }

    public questionToSpeechText(requestAttributes: any): string {
        return "Quel est la taille de " + this.getCurrentQuestion().itemToGuess + " ?";
    }

    public copy(game: Game) {
        this.points = game.points;
        this.numberOfRounds = game.numberOfRounds;
        this.numberOfPlayer = game.numberOfPlayer;
        this.currentPlayer = game.currentPlayer;
        this.currentQuestion.copy(game.currentQuestion);
    }

}