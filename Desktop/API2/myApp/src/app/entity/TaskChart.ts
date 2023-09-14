export class TaskChart {
    id?: number;
    start_date?: string;
    text!: string;
    progress!: string;
    duration!: number;
    parent?: number;
}