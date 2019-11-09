import { Question } from "./question";
import { Player } from "./player";
import { Result } from "./result.enum";
import { ErrorTypes } from "../errors/ErrorTypes";
import { stringFormat } from "../utils/stringFormat";
import { SpeechLocal } from "../utils/SpeechLocal";

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

    public questionSpeechOutput(): string {
        return this.currentQuestion.getSpeechOutput();
    }

    public guessSpeechOutput(n: number): string {
        if (isNaN(n) || n === undefined || n === null) {
            let error = new Error('Guess number is null');
            error.name = ErrorTypes.WRONG_STATE;
            throw error;
        }

        var speechOutput: string = "";
        const guessResult: number = this.guess(n);

        switch (guessResult) {
            case Result.MORE:
                speechOutput = stringFormat("{0}, {1}", SpeechLocal.getSpeechOutput("MORE"), this.nextPlayerSpeechOutput())
                break;
            case Result.LESS:
                speechOutput = stringFormat("{0}, {1}", SpeechLocal.getSpeechOutput("LESS"), this.nextPlayerSpeechOutput())
                break;
            default:
                speechOutput = SpeechLocal.getSpeechOutput("GOOD");
                if (this.isFinished()) {
                    speechOutput = stringFormat("{0} {1} {2}", speechOutput, SpeechLocal.getSpeechOutput("IT_S_FINISHED"), this.resultSpeechOutput());
                } else {
                    speechOutput = stringFormat("{0} {1} {2}", speechOutput, SpeechLocal.getSpeechOutput("NEXT_QUESTION"), this.questionSpeechOutput());
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

    private resultSpeechOutput(): string {
        var speechOutput: string = "";

        if (this.getPlayerCount() <= 1) {
            speechOutput = SpeechLocal.getSpeechOutput("YOU_SCORED_X_POINTS", String(this.getCurrentPlayer().getPointCount()));
        } else {
            var playerNumbers: string[] = [
                SpeechLocal.getSpeechOutput("ONE"),
                SpeechLocal.getSpeechOutput("TWO"),
                SpeechLocal.getSpeechOutput("THREE"),
                SpeechLocal.getSpeechOutput("FOUR"),
            ];
            var playerPositions: string[] = [
                SpeechLocal.getSpeechOutput("FIRST"),
                SpeechLocal.getSpeechOutput("SECOND"),
                SpeechLocal.getSpeechOutput("THIRD"),
                SpeechLocal.getSpeechOutput("FOURTH"),
            ];
            this.players.sort((x, y) => x.getPointCount() - y.getPointCount());
            for (var i = 0; i < this.getPlayerCount(); i++) {
                speechOutput =  stringFormat("{0}. {1}", speechOutput, SpeechLocal.getSpeechOutput("RESULT", playerNumbers[i], playerPositions[i]))
            }
        }

        return speechOutput;
    }

    private nextPlayerSpeechOutput(): string {
        if (this.getPlayerCount() <= 0)
            return "";
        return this.currentPlayerSpeechOutput();
    }

    private currentPlayerSpeechOutput(): string {
        var speechText = "";
        var playerNumbers: string[] = [
            SpeechLocal.getSpeechOutput("ONE"),
            SpeechLocal.getSpeechOutput("TWO"),
            SpeechLocal.getSpeechOutput("THREE"),
            SpeechLocal.getSpeechOutput("FOUR"),
        ];
        speechText = stringFormat(SpeechLocal.getSpeechOutput("PLAYER"), " ", playerNumbers[this.getCurrentPlayer().getId()])
        return speechText;
    }

    // #endregion  

}