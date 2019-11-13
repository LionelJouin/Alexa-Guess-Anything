
export class SpeechLocal {

    private static instance: SpeechLocal;
    private speechLocal: any;

    private constructor(speechLocal: any) {
        this.speechLocal = speechLocal;
    }

    public static getInstance(speechLocal: any = undefined): SpeechLocal {
        if (!SpeechLocal.instance) {
            SpeechLocal.instance = new SpeechLocal(speechLocal);
        }
        return SpeechLocal.instance;
    }

    public static getSpeechOutput(LocalId: string, ...args: string[]): string {
        return SpeechLocal.getInstance().getSpeechOutput(LocalId, ...args);
    }

    public static getLanguage(): string {
        return "fr-FR";
    }

    public getSpeechOutput(LocalId: string, ...args: string[]): string {
        return this.speechLocal.t(LocalId, ...args);
    }

}