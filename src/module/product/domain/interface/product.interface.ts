import {
  ReqPostProductoDto,
  ResGetProductDto,
  ResPostProductDto
} from "../../applications/product-response.dto";

  export interface IProduct {
    getProduct: () =>  Promise<ResGetProductDto>;
    reqPostProduct: (reqPostProductoDto: ReqPostProductoDto) => Promise<ResPostProductDto>;
  }