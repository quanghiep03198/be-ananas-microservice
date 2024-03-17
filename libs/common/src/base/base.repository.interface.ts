import mongoose, { FilterQuery, ProjectionType, QueryOptions } from 'mongoose'

export declare interface IBaseRepository<T> {
	provide: string
	all: () => Promise<T[]>
	createOne: (payload: T) => Promise<T>
	findOneById: (id: string | mongoose.Types.ObjectId) => Promise<T>
	find: (
		filter: FilterQuery<T>,
		projection?: ProjectionType<T>,
		opitons?: QueryOptions<T>
	) => Promise<Array<T | Partial<T>>>
	updateOneById: (id: string | mongoose.Types.ObjectId, update: Partial<T>) => Promise<T>
	deleteOneById: (id: string | mongoose.Types.ObjectId) => Promise<T>
}
