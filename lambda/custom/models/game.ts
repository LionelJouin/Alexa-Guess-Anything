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

    private isFinished(): boolean {
        return this.numberOfRounds > 0;
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
            if (this.isFinished()) {
                speechText += " "
                    + requestAttributes.t("IT_S_FINISHED")
                    + " "
                    + this.resultToSpeechText(requestAttributes);
            }
            else {
                speechText += " " + requestAttributes.t("NEXT_QUESTION");
                if (this.getPlayerCount() > 1)
                    speechText += this.currentPlayerToSpeechText(requestAttributes) + ",";
                speechText += " " + this.questionToSpeechText(requestAttributes);
            }
        }

        return speechText;
    }

    private resultToSpeechText(requestAttributes: any): string {
        var speechText: string = "";
        if (this.getPlayerCount() <= 1) {
            speechText += requestAttributes.t("YOU_MADE")
                + " "
                + this.getCurrentPlayer().getPointCount()
                + " "
                + this.getPointSpeechText(this.getCurrentPlayer().getPointCount(), requestAttributes);
            + ".";
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
            this.players.sort((x, y) => x.getPointCount() - y.getPointCount());
            for (var i = 0; i < this.getPlayerCount(); i++) {
                const player = this.players[i];
                speechText += requestAttributes.t("PLAYER")
                    + " "
                    + playerNumbers[player.getId()]
                    + " "
                    + requestAttributes.t("IS")
                    + " "
                    + playerPositions[i]
                    + " "
                    + requestAttributes.t("WITH")
                    + " "
                    + player.getPointCount()
                    + " "
                    + this.getPointSpeechText(player.getPointCount(), requestAttributes);
                + ".";
            }
        }
        return speechText;
    }

    private getPointSpeechText(point: number, requestAttributes: any): string {
        if (point <= 1)
            return requestAttributes.t("POINT");
        else
            return requestAttributes.t("POINTS");
    }

    private currentPlayerToSpeechText(requestAttributes: any) {
        var speechText = "";
        var playerNumbers: string[] = [
            requestAttributes.t("ONE"),
            requestAttributes.t("TWO"),
            requestAttributes.t("THREE"),
            requestAttributes.t("FOUR"),
        ];
        speechText += requestAttributes.t("PLAYER")
            + " "
            + playerNumbers[this.getCurrentPlayer().getId()];
        return speechText;
    }

    public questionToSpeechText(requestAttributes: any): string {
        return this.getCurrentQuestion().toSpeechText(requestAttributes);
    }

    public copy(game: Game): void {
        this.numberOfRounds = game.numberOfRounds;
        this.currentPlayerIndex = game.currentPlayerIndex;
        this.currentQuestion.copy(game.currentQuestion);
        for (var i = 0; i < game.players.length; i++) {
            this.players[i].copy(game.players[i]);
        }
    }

}