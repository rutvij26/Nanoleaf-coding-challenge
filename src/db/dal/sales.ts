import { Op } from 'sequelize'
import Sales from '../models/sales'
import { GetAllSalesFilters } from './types'
import { SalesInput, SalesOutput } from '../models/sales'

export const create = async (payload: SalesInput): Promise<SalesOutput> => {
    const sales = await Sales.create(payload)
    return sales
}

export const update = async (id: number, payload: Partial<SalesInput>): Promise<SalesOutput> => {
    const sales = await Sales.findByPk(id)
    if (!sales) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedSales = await (sales as Sales).update(payload)
    return updatedSales
}

export const getById = async (id: number): Promise<SalesOutput> => {
    const sales = await Sales.findByPk(id)
    if (!sales) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return sales
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedSalesCount = await Sales.destroy({
        where: { id }
    })
    return !!deletedSalesCount
}

export const getAll = async (filters?: GetAllSalesFilters): Promise<SalesOutput[]> => {
    return Sales.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}