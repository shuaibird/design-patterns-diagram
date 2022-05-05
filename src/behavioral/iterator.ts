interface IIterator<T> {
    next(): T;
    hasNext(): boolean;
}

interface IIterable<T> {
    iterator(): IIterator<T>;
}

class ConcreteIterator<T> implements IIterator<T> {
    next(): T {}
    hasNext(): boolean {}
}

class ConcreteIterable<T> implements IIterable<T> {
    public iterator(): IIterator<T> {
        return new ConcreteIterator();
    }
}
