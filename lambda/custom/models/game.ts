import { Question } from "./question";
import { Player } from "./player";

export class Game {

    private players: Player[];
    private numberOfRounds: number;
    private currentPlayerIndex: number;
    private currentQuestion!: Question;

    public constructor() {
        this.numberOfRounds = 2
        var numberOfPlayer: number = 1;

        this.players = new Array(numberOfPlayer);
        for (var i = 0; i < numberOfPlayer; i++)
            this.players[i] = new Player(i);

        this.currentPlayerIndex = 0;

        this.setNewQuestion();
    }

    private setNewQuestion(): void {
        this.currentQuestion = new Question();
    }

    private getCurrentQuestion(): Question {
        return this.currentQuestion;
    }

    private getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    private nextPlayer(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.getPlayerCount();
    }

    private getPlayerCount(): number {
        return this.players.length;
    }

    private guess(n: number): number {
        const result = this.currentQuestion.guess(n);

        if (result != 0) {
            this.getCurrentPlayer().addMistake();
            this.nextPlayer();
            return result;
        }

        this.numberOfRounds--;
        this.getCurrentPlayer().addPoint();
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
            if (this.numberOfRounds > 0)
                speechText += " " + requestAttributes.t("NEXT_QUESTION") + " " + this.questionToSpeechText(requestAttributes);
            else
                speechText += " " + requestAttributes.t("IT_S_FINISHED") + this.resultToSpeechText(requestAttributes);
        }

        return speechText;
    }

    private resultToSpeechText(requestAttributes: any): string {
        var speechText: string = "";
        if (this.getPlayerCount() > 1) {
            speechText += requestAttributes.t("YOU_MADE") + this.getCurrentPlayer().getPointCount() + " ";
            if (this.getCurrentPlayer().getPointCount() <= 1)
                speechText += requestAttributes.t("POINT");
            else
                speechText += requestAttributes.t("POINTS");
            speechText += ".";
        } else {
            var playerNumbers: string[] = [
                requestAttributes.t("ONE"),
                requestAttributes.t("TWO"),
                requestAttributes.t("THREE"),
                requestAttributes.t("FOUR"),
            ];
            var playerPositions: string[] = [
                requestAttributes.t("FIRST"),
                requestAttributes.t("SECOND"),
                requestAttributes.t("THIRD"),
                requestAttributes.t("FOURTH"),
            ];
        }
        return speechText;
    }

    public questionToSpeechText(requestAttributes: any): string {
        return this.getCurrentQuestion().toSpeechText(requestAttributes);
    }

    public copy(game: Game): void {
        this.numberOfRounds = game.numberOfRounds;
        this.currentPlayerIndex = game.currentPlayerIndex;
        this.currentQuestion.copy(game.currentQuestion);
        for (var i = 0; i < this.currentPlayerIndex; i++) {
            this.players[i].copy(game.players[i]);
        }
    }

}