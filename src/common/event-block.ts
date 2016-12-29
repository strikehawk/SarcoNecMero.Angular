module adnw.common {
    export type EventCallback<T> = (oldValue: T, newValue: T) => void;

    export class EventBlock {
        private _map: Map<string, Set<EventCallback<any>>>;

        constructor() {
            this._map = new Map<string, Set<EventCallback<any>>>();
        }

        public on(event: string, callback: EventCallback<any>): void {
            if (!event) {
                throw new Error("Event cannot be empty.");
            }

            if (!callback) {
                throw new Error("Callback cannot be null.");
            }

            let set: Set<EventCallback<any>>;

            if (!this._map.has(event)) {
                set = new Set<EventCallback<any>>();
                this._map.set(event, set);
            } else {
                set = this._map.get(event);
            }

            set.add(callback);
        }

        public un(event: string, callback: EventCallback<any>): void {
            if (!event) {
                throw new Error("Event cannot be empty.");
            }

            if (!callback) {
                throw new Error("Callback cannot be null.");
            }

            if (this._map.has(event)) {
                let set: Set<EventCallback<any>> = this._map.get(event);
                set.delete(callback);
            }
        }

        public dispatch<T>(event: string, oldValue?: T, newValue?: T): void {
            if (!event) {
                throw new Error("Event cannot be empty.");
            }

            if (!this._map.has(event)) {
                return;
            }

            let set: Set<EventCallback<any>> = this._map.get(event);
            set.forEach((cb: EventCallback<T>) => {
                cb(oldValue, newValue);
            });
        }
    }
}