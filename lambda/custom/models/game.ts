import { Question } from "./question";
import { Player } from "./player";

export class Game {

    private players: Player[];
    private numberOfRound: number;
    private currentPlayerIndex: number;
    private currentQuestion!: Question;
    private previousQuestions: string[];

    public constructor(numberOfPlayer: number = 1, numberOfRound: number = 2) {
        this.numberOfRound = numberOfRound;
        this.previousQuestions = new Array();

        this.players = new Array(numberOfPlayer);
        for (var i = 0; i < numberOfPlayer; i++)
            this.players[i] = new Player(i);

        this.currentPlayerIndex = 0;

        this.setNewQuestion();
    }

    private setNewQuestion(n: number = 0): void {
        const newQustion = new Question();
        if (this.previousQuestions.indexOf(newQustion.getHash()) > -1 && n < 10) { // reset question if in previous ones
            this.setNewQuestion(n++);
            return;
        }
        this.currentQuestion = newQustion;
        this.previousQuestions.push(this.currentQuestion.getHash());
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

        this.numberOfRound--;
        this.getCurrentPlayer().addPoint();
        this.setNewQuestion();
        return 0;
    }

    private isFinished(): boolean {
        return this.numberOfRound <= 0;
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
                + this.getPointSpeechText(this.getCurrentPlayer().getPointCount(), requestAttributes)
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
                    + this.getPointSpeechText(player.getPointCount(), requestAttributes)
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
        this.numberOfRound = game.numberOfRound;
        this.currentPlayerIndex = game.currentPlayerIndex;
        this.currentQuestion.copy(game.currentQuestion);
        for (var i = 0; i < game.players.length; i++) {
            this.players[i].copy(game.players[i]);
        }
        this.previousQuestions = game.previousQuestions;
    }

}