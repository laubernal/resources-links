export abstract class Filter {
    protected abstract data: Map<string, any>;

    public abstract apply(): Map<string, any>
}