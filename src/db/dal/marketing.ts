import { Op } from 'sequelize'
import Marketing from '../models/marketing'
import { GetAllMarketingFilters } from './types'
import { MarketingInput, MarketingOutput } from '../models/marketing'

export const create = async (payload: MarketingInput): Promise<MarketingOutput> => {
    const marketing = await Marketing.create(payload)
    return marketing
}

export const update = async (id: number, payload: Partial<MarketingInput>): Promise<MarketingOutput> => {
    const marketing = await Marketing.findByPk(id)
    if (!marketing) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedMarketing = await (marketing as Marketing).update(payload)
    return updatedMarketing
}

export const getById = async (id: number): Promise<MarketingOutput> => {
    const marketing = await Marketing.findByPk(id)
    if (!marketing) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return marketing
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedMarketingCount = await Marketing.destroy({
        where: { id }
    })
    return !!deletedMarketingCount
}

export const getAll = async (filters?: GetAllMarketingFilters): Promise<MarketingOutput[]> => {
    return Marketing.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}