import * as salesDal from '../../db/dal/sales'
import { GetAllSalesFilters } from '../../db/dal/types'
import { SalesInput, SalesOutput } from '../../db/models/sales'

export const create = (payload: SalesInput): Promise<SalesOutput> => {
    return salesDal.create(payload)
}
export const update = (id: number, payload: Partial<SalesInput>): Promise<SalesOutput> => {
    return salesDal.update(id, payload)
}
export const getById = (id: number): Promise<SalesOutput> => {
    return salesDal.getById(id)
}
export const deleteById = (id: number): Promise<boolean> => {
    return salesDal.deleteById(id)
}
export const getAll = (filters: GetAllSalesFilters): Promise<SalesOutput[]> => {
    return salesDal.getAll(filters)
}