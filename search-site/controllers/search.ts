import {DocController, DocAction, Get, Context, ActionMiddleware, Controller} from "kwyjibo";
import * as K from "kwyjibo";
import App from "../app";
import * as ElasticSearch from "elasticsearch";

@Controller("/search")
@DocController("Search Controller.")
export default class Search {

    @Get("/")
    @DocAction(`Sample index`)
    async index(context: Context): Promise<void> {

        context.response.render(
            "index",
            { searchActionUrl: K.getActionRoute(Search, "search") });
    }

    @Get("/search")
    async search(context: Context, @K.FromQuery("q") query: string, @K.FromQuery("entity") entity: string): Promise<void> {

        let client = new ElasticSearch.Client({
            host: "elk:9200",
            //host: "localhost:9200",
            log: "trace"
        });

        let elasticQuery = {
            index: "",
            body: {
                query: {
                    match: {
                        _all: query
                    }
                }
            }
        };

        console.log(JSON.stringify(elasticQuery));
        if (entity === "site") {
        	elasticQuery.index = "site-content";
        } else if (entity === "db") {
        	elasticQuery.index = "music";
        } else {
        	throw new K.InternalServerError("Invalid entity type");
        }

        let result = await client.search(elasticQuery);

        let hits: any[] = result.hits.hits;

        let finalResult: any;

        if (entity === "site") {
					finalResult = hits.map((val, i, arr) => {
	            return {
	                url: val._source.url,
	                content: val._source.content,
	            };
	        });
        } else if (entity === "db") {
        	finalResult = hits.map((val, i, arr) => {
            return {
                url: val._source.album,
                content: val._source.artist,
                description: val._source["track name"]
            };
        	});
        } else {
        	throw new K.InternalServerError("Invalid entity type");
        }

        let model = {
            searchActionUrl: K.getActionRoute(Search, "search"),
            results: finalResult,
            entity: entity,
            q: query
         };

        context.response.render("results", model);
    }
}