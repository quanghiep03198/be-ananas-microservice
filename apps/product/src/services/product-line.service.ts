import { ServiceResult } from '@app/common'
import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ProductLineDTO } from '../dto/product-line.dto'
import { ProductLineRepository } from '../repositories/product-line.repository'
import { I18nService } from '@app/i18n'

@Injectable()
export class ProductLineService {
	constructor(
		@Inject(ProductLineRepository.provide)
		private readonly productLineRepository: ProductLineRepository,
		private readonly i18nService: I18nService
	) {}
	async getProductLines() {
		const productLines = await this.productLineRepository.findAll()
		return new ServiceResult(productLines)
	}
	async createProductLine(payload: ProductLineDTO) {
		const newProductLine = await this.productLineRepository.createOne(payload)
		if (!newProductLine)
			return new ServiceResult(null, {
				message: this.i18nService.t('error_messages.product_line.creating'),
				errorCode: HttpStatus.BAD_REQUEST
			})

		return new ServiceResult(newProductLine)
	}

	async updateProductLine(id: string, payload: Partial<ProductLineDTO>) {
		const updatedProductLine = await (
			await this.productLineRepository.updateOneById(id, payload)
		).save()

		if (!updatedProductLine)
			return new ServiceResult(null, {
				message: this.i18nService.t('error_messages.product_line.updating'),
				errorCode: HttpStatus.BAD_REQUEST
			})

		return new ServiceResult(updatedProductLine)
	}

	async deleteProductLine(id: string) {
		const deletedProductLine = await this.productLineRepository.deleteOneById(id)
		if (!deletedProductLine)
			return new ServiceResult(null, {
				message: this.i18nService.t('error_messages.product_line.deleting'),
				errorCode: HttpStatus.BAD_REQUEST
			})

		return new ServiceResult(deletedProductLine)
	}
}
