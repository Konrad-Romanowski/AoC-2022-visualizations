export default interface CRT {
    X: number;
    cycle: number;
    display: Array<{id: string, isOn: boolean}>;
}