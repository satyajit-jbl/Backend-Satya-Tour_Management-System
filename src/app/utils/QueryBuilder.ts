import { Query } from "mongoose";
import { excludeField } from "../constants";

export class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public readonly query: Record<string, string>

    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    //now when we call it the variable will assign to modelQuery and query
    //now we create methods for filtering, searching... 
    //we get object(variable is called property, fnction is called method) from class
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter(): this {
        const filter = { ...this.query }

        for (const field of excludeField) {  //for-of (Array), for-in(Object)
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete filter[field]
        }

        this.modelQuery = this.modelQuery.find(filter)

        return this;
    }
    search(searchableField: string[]): this {
        const searchTerm = this.query.searchTerm || " "

        const searchQuery = {
            $or: searchableField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
        }
        this.modelQuery = this.modelQuery.find(searchQuery)

        return this
    }
}