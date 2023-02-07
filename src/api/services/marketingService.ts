import * as marketingDal from '../../db/dal/marketing'
import { GetAllMarketingFilters } from '../../db/dal/types'
import { MarketingInput, MarketingOutput } from '../../db/models/marketing'

export const create = (payload: MarketingInput): Promise<MarketingOutput> => {
    return marketingDal.create(payload)
}
export const update = (id: number, payload: Partial<MarketingInput>): Promise<MarketingOutput> => {
    return marketingDal.update(id, payload)
}
export const getById = (id: number): Promise<MarketingOutput> => {
    return marketingDal.getById(id)
}
export const deleteById = (id: number): Promise<boolean> => {
    return marketingDal.deleteById(id)
}
export const getAll = (filters: GetAllMarketingFilters): Promise<MarketingOutput[]> => {
    return marketingDal.getAll(filters)
}