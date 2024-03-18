import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ConfigServer } from "./config/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserRouter } from "./features/user/user.router";
import { CategoryRouter } from "./features/category/category.router";
import { LoginStrategy } from "./auth/strategies/login.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { PurchasesProductsRouter } from "./features/puchase/purchases-products.router";
import { PurchaseRouter } from "./features/puchase/purchase.router";
import { ProductRouter } from "./features/product/product.router";
import { CustomerRouter } from "./features/customer/customer.router";
import { AuthRouter } from "./auth/auth.router";

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    this.passportUse();
    this.dbConnect();

    this.app.use(morgan('dev'));
    this.app.use(cors({
      origin: true,
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
      credentials: true,
    }));

    this.app.use('/api', this.routers());
    this.listen();
  }

  routers():Array<express.Router>{
    return [
      new UserRouter().router,
      new PurchaseRouter().router,
      new ProductRouter().router,
      new CustomerRouter().router,
      new CategoryRouter().router,
      new PurchasesProductsRouter().router,
      new AuthRouter().router,
    ];
  }

  passportUse(){
    return [ 
      new LoginStrategy().use, 
      // new JwtStrategy().use 
    ];
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect.then(() => {
      console.log("Connect Success");
    }).catch((e) => {
      console.error(e);      
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port = > ${this.port} :: ENV = ${ this.getEnvironment("ENV") }`);
    });
  }

};

new ServerBootstrap();