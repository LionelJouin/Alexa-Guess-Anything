
export class Player {

    private id: number;
    private pointCount: number;
    private mistakeCount: number;

    public constructor(id: number) {
        this.id = id;
        this.pointCount = 0;
        this.mistakeCount = 0;
    }

    public addPoint(): void {
        this.pointCount++;
    }

    public addMistake(): void {
        this.mistakeCount++;
    }

    public getId(): number {
        return this.id;
    }

    public getPointCount(): number {
        return this.pointCount;
    }

    public getMistakeCount(): number {
        return this.mistakeCount;
    }

    public copy(player: Player): void {
        this.id = player.id;
        this.pointCount = player.pointCount;
        this.mistakeCount = player.mistakeCount;
    }

}