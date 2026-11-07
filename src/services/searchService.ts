import Fuse, { type IFuseOptions } from 'fuse.js';
import type { ErrorCode } from '../models/ErrorCode';
import { errorService } from './errorService';

class SearchService {
  private fuse: Fuse<ErrorCode> | null = null;

  constructor() {
    this.initIndex();
  }

  private initIndex() {
    const errorList = errorService.getAllErrors();
    const options: IFuseOptions<ErrorCode> = {
      includeScore: true,
      includeMatches: true,
      threshold: 0.35, // Độ mềm dẻo cho fuzzy search
      distance: 100,
      minMatchCharLength: 2,
      keys: [
        { name: 'code', weight: 0.5 },
        { name: 'brandName', weight: 0.15 },
        { name: 'title', weight: 0.2 },
        { name: 'tags', weight: 0.1 },
        { name: 'causes', weight: 0.05 },
        { name: 'description', weight: 0.05 },
      ],
    };

    this.fuse = new Fuse(errorList, options);
  }

  /**
   * Tìm kiếm mã lỗi thông minh bằng Fuzzy Search
   * @param query Từ khóa nhập từ thanh SearchBar (mã lỗi như 'H11' hoặc triệu chứng như 'mất tín hiệu')
   * @param brandFilter Lọc theo hãng cụ thể nếu có
   */
  public search(query: string, brandFilter?: string): ErrorCode[] {
    const trimmed = query.trim();
    const allErrors = errorService.getAllErrors();

    if (!trimmed) {
      if (brandFilter && brandFilter !== 'all') {
        return allErrors.filter((e) => e.brandId.toLowerCase() === brandFilter.toLowerCase());
      }
      return allErrors;
    }

    if (!this.fuse) {
      this.initIndex();
    }

    // Thực hiện fuzzy search
    const results = this.fuse ? this.fuse.search(trimmed) : [];
    let matchedItems = results.map((res) => res.item);

    // Fallback: Tìm kiếm contains không dấu nếu Fuse miss
    if (matchedItems.length === 0) {
      const lowerQuery = trimmed.toLowerCase();
      matchedItems = allErrors.filter((item) => {
        return (
          item.code.toLowerCase().includes(lowerQuery) ||
          item.title.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery) ||
          item.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
          item.causes.some((c) => c.toLowerCase().includes(lowerQuery))
        );
      });
    }

    if (brandFilter && brandFilter !== 'all') {
      matchedItems = matchedItems.filter(
        (e) => e.brandId.toLowerCase() === brandFilter.toLowerCase()
      );
    }

    return matchedItems;
  }
}

export const searchService = new SearchService();
