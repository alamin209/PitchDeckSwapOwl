export class IMetadata {
  public readonly page: number;
  public readonly totalCount: number;
  public readonly totalPage?: number;
  public readonly limit: number;
}

export class MetadataDTO extends IMetadata {
  constructor(
    public readonly page: number,
    public readonly totalCount: number,
    public readonly limit: number,
  ) {
    super();
  }
}

export class PayloadDTO {
  constructor(public readonly list: any[], public readonly details: any) {}
}

export class PayloadResponseDTO {
  public statusCode: number;
  public message?: string;
  public metadata?: IMetadata;
  public data?: any;

  constructor(
    private response: {
      statusCode: number;
      message?: string;
      metadata?: IMetadata;
      data?: any;
    },
  ) {
    const metadata = response.metadata || {
      page: 1,
      totalPage: 1,
      totalCount: 1,
      limit: 1,
    };
    const totalPage = Math.ceil(metadata.totalCount / metadata.limit);

    this.statusCode = response.statusCode;
    this.message = response.message || '';
    if (response.metadata) {
      this.metadata = {
        ...metadata,
        totalPage: totalPage,
      };
    }
    this.data = response.data || {};
  }
}
