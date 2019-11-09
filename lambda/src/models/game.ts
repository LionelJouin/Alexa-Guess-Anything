import { Question } from "./question";
import { Player } from "./player";
import { Result } from "./result.enum";
import { ErrorTypes } from "../errors/ErrorTypes";
import { stringFormat } from "../utils/stringFormat"

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
        for (var i = 0; i < numberOfPlayer; i++) {
            this.players[i] = new Player(i);
        }

        this.currentPlayerIndex = 0;

        this.setNewQuestion();
    }

    public questionToSpeechText(requestAttributes: any): string {
        return this.currentQuestion.toSpeechText(requestAttributes);
    }

    public guessToSpeechText(n: number, requestAttributes: any): string {
        if (isNaN(n) || n === undefined || n === null) {
            let error = new Error('Guess number is null');
            error.name = ErrorTypes.WRONG_STATE;
            throw error;
        }

        var speechOutput: string = "";
        const guessResult: number = this.guess(n);

        switch (guessResult) {
            case Result.MORE:
                speechOutput = stringFormat("{0}, {1}", requestAttributes.t("MORE"), this.nextPlayerToSpeechOutput())
                break;
            case Result.LESS:
                speechOutput = stringFormat("{0}, {1}", requestAttributes.t("LESS"), this.nextPlayerToSpeechOutput())
                break;
            default:
                speechOutput = requestAttributes.t("GOOD");
                if (this.isFinished()) {
                    speechOutput = stringFormat("{0} {1} {2}", speechOutput, requestAttributes.t("IT_S_FINISHED"), this.resultToSpeechText(requestAttributes));
                } else {
                    speechOutput = stringFormat("{0} {1} {2}", speechOutput, requestAttributes.t("NEXT_QUESTION"), this.questionToSpeechText(requestAttributes));
                }
        }

        return speechOutput;
    }

    public isFinished(): boolean {
        return this.numberOfRound <= 0;
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

    // #region Core

    private setNewQuestion(n: number = 0): void {
        const newQustion = new Question();
        if (this.previousQuestions.indexOf(newQustion.getHash()) > -1 && n < 10) { // reset question if in previous ones
            this.setNewQuestion(n++);
            return;
        }
        this.currentQuestion = newQustion;
        this.previousQuestions.push(this.currentQuestion.getHash());
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
        const result: Result = this.currentQuestion.guess(n);

        if (result != Result.EQUAL) {
            this.getCurrentPlayer().addMistake();
            this.nextPlayer();
        } else {
            this.numberOfRound--;
            this.getCurrentPlayer().addPoint();
            this.setNewQuestion();
        }

        return result;
    }

    // #endregion 

    // #region SpeechOutput  

    private resultToSpeechText(requestAttributes: any): string {
        var speechOutput: string = "";

        if (this.getPlayerCount() <= 1) {
            speechOutput = requestAttributes.t("YOU_SCORED_X_POINTS", this.getCurrentPlayer().getPointCount());
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
                speechOutput =  stringFormat("{0}. {1}", speechOutput, requestAttributes.t("RESULT", playerNumbers[i], playerPositions[i]))
            }
        }

        return speechOutput;
    }

    private nextPlayerToSpeechOutput(): string {
        if (this.getPlayerCount() <= 0)
            return "";
        return this.currentPlayerToSpeechText();
    }

    private currentPlayerToSpeechText(requestAttributes: any): string {
        var speechText = "";
        var playerNumbers: string[] = [
            requestAttributes.t("ONE"),
            requestAttributes.t("TWO"),
            requestAttributes.t("THREE"),
            requestAttributes.t("FOUR"),
        ];
        speechText = stringFormat(requestAttributes.t("PLAYER"), " ", playerNumbers[this.getCurrentPlayer().getId()])
        return speechText;
    }

    // #endregion  

}