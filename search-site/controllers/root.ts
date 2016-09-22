import { DocController, DocAction, Get, Context, ActionMiddleware, Controller } from "kwyjibo";
import * as K from "kwyjibo";
import App from "../app";
import * as ElasticSearch from "elasticsearch";
import Search from "./search";

@Controller("/")
@DocController("Root Controller.")
class Root {

  @Get("/")
  @DocAction(`Redirects to search`)
  async index(context: Context): Promise<void> {
    context.response.redirect(K.getActionRoute(Search, "search"));
  }

}