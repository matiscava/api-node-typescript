import { BaseRouter } from "../../shared/router/router";
import { CategoryController } from "./controllers/category.controller";
import { CategoryMiddleware } from "./middlewares/category.middleware";

export class CategoryRouter extends BaseRouter<CategoryController, CategoryMiddleware> {
  constructor() {
    super(CategoryController, CategoryMiddleware);
  }

  routes(): void {
    this.router.get('/category', (req,res) => this.controller.getCategories(req,res));
    this.router.get('/category/:id', (req,res) => this.controller.getCategoryById(req,res));
    this.router.post(
      '/category', 
      (req, res, next) => this.middleware.categoryValidator(req,res,next),  
      (req,res) => this.controller.createCategory(req,res)
    );
    this.router.put('/category/:id', (req,res) => this.controller.updateCategory(req,res));
    this.router.delete('/category/:id', (req,res) => this.controller.deleteCategory(req,res));
  }
}