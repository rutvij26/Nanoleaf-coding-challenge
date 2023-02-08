import * as service from '../services/marketingService';
import { Marketing } from '../interfaces/marketing.interface'

export const getById = async (id: number): Promise<Marketing> => {
    return await service.getById(id);
}

