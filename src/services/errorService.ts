import type { Brand } from '../models/Brand';
import type { ErrorCode } from '../models/ErrorCode';

import brandsData from '../data/brands.json';
import panasonicErrors from '../data/errors/panasonic.json';
import daikinErrors from '../data/errors/daikin.json';
import mideaErrors from '../data/errors/midea.json';
import mitsubishiErrors from '../data/errors/mitsubishi.json';
import lgErrors from '../data/errors/lg.json';
import casperErrors from '../data/errors/casper.json';
import greeErrors from '../data/errors/gree.json';
import reetechErrors from '../data/errors/reetech.json';
import saiverErrors from '../data/errors/saiver.json';
import toshibaErrors from '../data/errors/toshiba.json';
import aquaErrors from '../data/errors/aqua.json';
import samsungErrors from '../data/errors/samsung.json';

class ErrorService {
  private allErrors: ErrorCode[] = [];
  private brands: Brand[] = [];

  constructor() {
    this.init();
  }

  private init() {
    this.brands = brandsData as Brand[];
    this.allErrors = [
      ...(panasonicErrors as ErrorCode[]),
      ...(daikinErrors as ErrorCode[]),
      ...(mideaErrors as ErrorCode[]),
      ...(mitsubishiErrors as ErrorCode[]),
      ...(lgErrors as ErrorCode[]),
      ...(casperErrors as ErrorCode[]),
      ...(greeErrors as ErrorCode[]),
      ...(reetechErrors as ErrorCode[]),
      ...(saiverErrors as ErrorCode[]),
      ...(toshibaErrors as ErrorCode[]),
      ...(aquaErrors as ErrorCode[]),
      ...(samsungErrors as ErrorCode[]),
    ];
  }

  /**
   * Lấy danh sách tất cả thương hiệu
   */
  public getBrands(): Brand[] {
    return this.brands;
  }

  /**
   * Lấy thông tin 1 thương hiệu theo ID
   */
  public getBrandById(brandId: string): Brand | undefined {
    return this.brands.find((b) => b.id.toLowerCase() === brandId.toLowerCase());
  }

  /**
   * Lấy tất cả mã lỗi trong cơ sở dữ liệu offline
   */
  public getAllErrors(): ErrorCode[] {
    return this.allErrors;
  }

  /**
   * Lấy danh sách mã lỗi theo Brand ID
   */
  public getErrorsByBrand(brandId: string): ErrorCode[] {
    return this.allErrors.filter((e) => e.brandId.toLowerCase() === brandId.toLowerCase());
  }

  /**
   * Lấy chi tiết một mã lỗi theo ID hoặc (BrandId + Code)
   */
  public getErrorDetail(brandId: string, code: string): ErrorCode | undefined {
    return this.allErrors.find(
      (e) =>
        e.brandId.toLowerCase() === brandId.toLowerCase() &&
        e.code.toLowerCase() === code.toLowerCase()
    );
  }
}

export const errorService = new ErrorService();
