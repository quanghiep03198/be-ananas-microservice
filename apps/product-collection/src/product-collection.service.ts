import Respositories from '@app/common/constants/repositories.constant'
import { ServiceResult } from '@app/common'
import { HttpStatus, Inject, Injectable } from '@nestjs/common'

import { ProductCollectionDTO } from './dto/product-collection.dto'
import { ProductCollectionRepository } from './product-collection.repository'
import { LocalizationService } from '@app/common'

@Injectable()
export class ProductCollectionService {
	constructor(
		@Inject(Respositories.PRODUCT_COLLECTION)
		private readonly productCollectionRepository: ProductCollectionRepository,
		private readonly localizationService: LocalizationService
	) {}

	async getProductCollections() {
		const productCollections = await this.productCollectionRepository.findAll()
		return new ServiceResult(productCollections, null)
	}

	async createProductCollection(payload) {
		const newProductCollection = await this.productCollectionRepository.createOne(payload)

		if (!Boolean(newProductCollection))
			return new ServiceResult(null, {
				message: this.localizationService.t('error_messages.product_collection.creating'),
				errorCode: HttpStatus.BAD_REQUEST
			})

		return new ServiceResult(newProductCollection, null)
	}

	async updateProductCollection(id: string, payload: Partial<ProductCollectionDTO>) {
		const updatedProductCollection = await this.productCollectionRepository.updateOneById(
			id,
			payload
		)
		if (!Boolean(updatedProductCollection))
			return new ServiceResult(null, {
				message: this.localizationService.t('error_messages.product_collection.updating'),
				errorCode: HttpStatus.BAD_REQUEST
			})

		return new ServiceResult(updatedProductCollection, null)
	}

	async deleteProductCollection(id: string) {
		const deletedProductCollection = await this.productCollectionRepository.deleteOneById(id)
		if (!Boolean(deletedProductCollection))
			return new ServiceResult(deletedProductCollection, null)
		return new ServiceResult(deletedProductCollection)
	}
}
